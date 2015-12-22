/// <reference path="../definitions/server.d.ts" />

import express          = require('express');
import http             = require('http');
import socketIO         = require('socket.io');
import users            = require('./users/users');
import user             = require('./users/user');
import game             = require('./game');
import player           = require('./players/player');

// create our server
var app = express();
var httpServer = http.createServer(app);
var io = socketIO.listen(httpServer);

var games = [];
var gameCount = 0;
var usersArray = new users.Users();

io.sockets.on('connection', function (socket) {

    var userObject:user.User;
    var gameObject:game.Game;
    userObject = usersArray.addUser(socket);
    var playerObject = new player.Player(userObject.username);

    console.log('Current games: ', games.length);

    socket.on('newGame', function (fn) {

        if (userObject.room == null) {
            gameObject = new game.Game();

            gameObject.gameName = 'game' + (games.length + 1);
            playerObject = gameObject.setPlayerColor(playerObject);
            playerObject.name = userObject.username;
            playerObject.playerTurn = true;
            playerObject.number = 1;
            gameObject.players.push(playerObject);
            gameObject.state = 'new';

            games.push(gameObject);

            userObject.joinRoom(gameObject.gameName);

            gameCount++;
            console.log('Current games: ', games.length);
            fn({
                serverData: gameObject.getGameData(),
                playerNo: playerObject.number
            });
        } else {
            fn('Already in active game');
        }

    });

    socket.on('joinGame', function (fn) {

        if (games.length > 0) {
            if (userObject.room != null) {
                games.forEach(function (game) {
                    if (game.gameName == userObject.room) {
                        gameObject = game;
                        userObject.joinRoom(gameObject.gameName);
                        game.players.forEach(function (player) {
                            if (userObject.username == player.name) {
                                playerObject = player;
                            }
                        })
                    }
                });
            } else {
                games.some(function (game:game.Game) {
                    if (game.players.length < 4 && game.state == 'new') {
                        gameObject = game;
                        playerObject = gameObject.setPlayerColor(playerObject);
                        playerObject.name = userObject.username;
                        playerObject.playerTurn = false;
                        playerObject.number = gameObject.players.length + 1;
                        game.players.push(playerObject);
                        userObject.joinRoom(gameObject.gameName);
                        return true;
                    }
                });

                io.to(gameObject.gameName).emit('newPlayer', playerObject.getPlayer());
            }

            fn({
                serverData: gameObject.getGameData(),
                playerNo: playerObject.number
            });
        } else {
            fn('No Games');
        }

    });

    socket.on('startGame', function () {

        gameObject.state = 'turnOrderPhase';
        io.to(gameObject.gameName).emit('startGame', gameObject.state);

    });

    socket.on('rollDice', function () {

        gameObject.dice.one = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        gameObject.dice.two = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

        var totalRolled = gameObject.dice.one + gameObject.dice.two;

        if (gameObject.state == 'turnOrderPhase') {
            if (playerObject.number < gameObject.players.length) {
                if (totalRolled > gameObject.highestDiceRoll.number) {
                    gameObject.highestDiceRoll.number = totalRolled;
                    gameObject.highestDiceRoll.player = playerObject.number;
                }

                playerObject.playerTurn = false;
                playerObject.diceRolled = true;
                gameObject.players[playerObject.number].playerTurn = true;
            } else if (playerObject.number == gameObject.players.length) {
                var startingPlayer;
                if (gameObject.players.length == 1) {
                    startingPlayer = gameObject.highestDiceRoll.player = 1;
                } else {
                    if (totalRolled > gameObject.highestDiceRoll.number) {
                        startingPlayer = playerObject.number;
                    } else {
                        startingPlayer = gameObject.highestDiceRoll.player;
                    }
                }

                for (var i = 0; i < gameObject.players.length; i++) {
                    if (startingPlayer > gameObject.players.length) {
                        startingPlayer = 1;
                    }

                    gameObject.turnOrder[i] = startingPlayer;
                    startingPlayer++;
                }

                gameObject.players.forEach(function (player) {
                    if (gameObject.turnOrder[0] == player.number) {
                        player.playerTurn = true;
                        player.diceRolled = false;
                        gameObject.updatePlayer(player);
                    } else {
                        player.playerTurn = false;
                        player.diceRolled = false;
                        gameObject.updatePlayer(player);
                    }
                });

                gameObject.state = 'placementPhase';
            }
        } else {
            gameObject.distributeResources(totalRolled);
            playerObject = gameObject.getSocketPlayer(playerObject.number);
            playerObject.diceRolled = true;
            gameObject.updatePlayer(playerObject);
        }

        io.to(gameObject.gameName).emit('diceRolled', [gameObject.getSimpleGameData(), gameObject.getPlayers()]);

    });

    socket.on('placeObject', function (data, fn) {

        var gridIndex = parseInt(data[0]);
        var playerNumber = data[1];
        var objectType = data[2];

        if (gameObject.map.grid.isPlacementValid(gridIndex, playerNumber, objectType)) {
            if (gameObject.state == 'placementPhase') {
                playerObject.pieces.addPiece(objectType, true);
                playerObject.updateScore(objectType);
            } else {
                playerObject.pieces.placePiece(objectType);
                playerObject.updateScore(objectType);
            }

            if (playerObject.points == gameObject.winningScore) {
                gameObject.state = 'endPhase';
            }

            gameObject.updatePlayer(playerObject);
            gameObject.map.grid.updateGrid(gridIndex, playerNumber, objectType);
            io.to(gameObject.gameName).emit('objectPlaced', [gameObject.map.grid.getGridData(), gameObject.getPlayers(), gameObject.getSimpleGameData()]);

            if (playerObject.points == gameObject.winningScore) {
                gameComplete();
            }

            fn(true);
        } else {
            fn(false);
        }

    });

    socket.on('hasPieceToPlace', function (data, fn) {

        if (playerObject.pieces.hasPieceToPlace(data)) {
            fn(true);
        } else {
            fn(false);
        }

    });

    socket.on('buyPiece', function (data) {

        playerObject.pieces.addPiece(data);

        switch (data) {
            case 'road':
                playerObject.resources.wood--;
                playerObject.resources.stone--;
                break;
            case 'settlement':
                playerObject.resources.wood--;
                playerObject.resources.stone--;
                playerObject.resources.wheat--;
                playerObject.resources.sheep--;
                break;
            case 'city':
                playerObject.resources.ore = playerObject.resources.ore - 3;
                playerObject.resources.stone = playerObject.resources.stone - 2;
                break;
        }

        gameObject.updatePlayer(playerObject);
        io.to(gameObject.gameName).emit('pieceBought', gameObject.getPlayers());

    });

    socket.on('hasResourcesToBuyPiece', function (data, fn) {

        if (playerObject.hasResourcesToBuyPiece(data)) {
            fn(true);
        } else {
            fn(false);
        }

    });

    socket.on('endTurn', function () {

        playerObject.playerTurn = false;

        if (gameObject.state == 'mainPhase') {
            playerObject.diceRolled = false;
            if (gameObject.currentPlayerTurn == gameObject.players.length - 1) {
                gameObject.turnNo++;
            }
        }

        gameObject.updatePlayer(playerObject);

        if (gameObject.state == 'placementPhase' && gameObject.currentPlayerTurn == gameObject.players.length - 1 && playerObject.pieces.roads.length == 2) {
            gameObject.state = 'mainPhase';
        }

        gameObject.currentPlayerTurn++;

        if (gameObject.currentPlayerTurn > gameObject.players.length - 1) {
            gameObject.currentPlayerTurn = 0;
        }

        var nextPlayer:player.Player = gameObject.getPlayer(gameObject.turnOrder[gameObject.currentPlayerTurn]);
        nextPlayer.playerTurn = true;
        gameObject.updatePlayer(nextPlayer);

        io.to(gameObject.gameName).emit('turnEnded', [gameObject.getSimpleGameData(), gameObject.getPlayers()]);

    });

    function gameComplete() {

        gameObject.players.forEach(function(playerObject: player.Player) {
            usersArray.users.forEach(function(userObject: user.User) {
                if (userObject.username == playerObject.name) {
                    userObject.leaveRoom(gameObject.gameName);
                }
            }, this);
        }, this);

        var gameToRemove = null;

        games.forEach(function(gameInArray: game.Game, index) {
            if (gameInArray.gameName == gameObject.gameName) {
                gameToRemove = index;
            }
        });

        games.splice(gameToRemove, 1);

        console.log(gameObject.gameName + ' has ended');
        console.log('Current games: ', games.length);

    }

});

app.set('origins', '*:*');

httpServer.listen(3000, function () {
    console.log('listening on *:3000');
});
