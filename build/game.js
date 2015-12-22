var map = require('./map/map');
var player = require('./players/player');
var Game = (function () {
    function Game() {
        this._players = [];
        this._map = new map.Map();
        this._turnNo = 0;
        this._dice = { one: 0, two: 0 };
        this._turnOrder = [];
        this._highestDiceRoll = { number: 0, player: 0 };
        this._currentPlayerTurn = 0;
        this._winningScore = 10;
        this._colors = {
            red: false,
            blue: false,
            yellow: false,
            green: false
        };
    }
    Object.defineProperty(Game.prototype, "gameName", {
        // <editor-fold desc="Getters and setters">
        get: function () {
            return this._gameName;
        },
        set: function (value) {
            this._gameName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "players", {
        get: function () {
            return this._players;
        },
        set: function (value) {
            this._players = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "map", {
        get: function () {
            return this._map;
        },
        set: function (value) {
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "turnNo", {
        get: function () {
            return this._turnNo;
        },
        set: function (value) {
            this._turnNo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "colors", {
        get: function () {
            return this._colors;
        },
        set: function (value) {
            this._colors = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "dice", {
        get: function () {
            return this._dice;
        },
        set: function (value) {
            this._dice = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "turnOrder", {
        get: function () {
            return this._turnOrder;
        },
        set: function (value) {
            this._turnOrder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "highestDiceRoll", {
        get: function () {
            return this._highestDiceRoll;
        },
        set: function (value) {
            this._highestDiceRoll = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "currentPlayerTurn", {
        get: function () {
            return this._currentPlayerTurn;
        },
        set: function (value) {
            this._currentPlayerTurn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "winningScore", {
        get: function () {
            return this._winningScore;
        },
        set: function (value) {
            this._winningScore = value;
        },
        enumerable: true,
        configurable: true
    });
    // </editor-fold>
    Game.prototype.getGameData = function () {
        return ({
            gameName: this._gameName,
            gameState: this._state,
            turnNo: this._turnNo,
            dice: this._dice,
            mapData: this._map.getMapInfo(),
            players: this.getPlayers()
        });
    };
    Game.prototype.getSimpleGameData = function () {
        return ({
            gameName: this._gameName,
            gameState: this._state,
            turnNo: this._turnNo,
            dice: this._dice,
        });
    };
    Game.prototype.getPlayer = function (playerNo) {
        var thePlayer = null;
        this._players.forEach(function (playerObject) {
            if (playerObject.number == playerNo) {
                thePlayer = playerObject;
            }
        }, this);
        return (thePlayer != null) ? thePlayer : new player.Player();
    };
    Game.prototype.getPlayers = function () {
        var playerData = [];
        this.players.forEach(function (player) {
            playerData.push({
                name: player.name,
                color: player.color,
                number: player.number,
                points: player.points,
                playerTurn: player.playerTurn,
                diceRolled: player.diceRolled,
                pieces: player.pieces.getPieces(),
                resources: player.resources
            });
        });
        return playerData;
    };
    Game.prototype.setPlayerColor = function (player) {
        if (!this._colors.red) {
            player.color = "red";
            this._colors.red = true;
        }
        else if (!this._colors.blue) {
            player.color = "blue";
            this._colors.blue = true;
        }
        else if (!this._colors.green) {
            player.color = "green";
            this._colors.green = true;
        }
        else if (!this._colors.yellow) {
            player.color = "yellow";
            this._colors.yellow = true;
        }
        return player;
    };
    Game.prototype.getSocketPlayer = function (playerNo) {
        var socketPlayer = null;
        this._players.forEach(function (playerObject) {
            if (playerNo == playerObject.number) {
                socketPlayer = playerObject;
            }
        }, this);
        return socketPlayer;
    };
    Game.prototype.updatePlayer = function (playerChanged) {
        this._players.forEach(function (playerObject, index) {
            if (playerChanged.number == playerObject.number) {
                this._players[index] = playerChanged;
            }
        }, this);
    };
    Game.prototype.distributeResources = function (diceRoll) {
        this._players.forEach(function (playerObject, index) {
            playerObject = this._map.grid.resourcesOnRoll(diceRoll, playerObject);
            this._players[index] = playerObject;
        }, this);
    };
    return Game;
})();
exports.Game = Game;
