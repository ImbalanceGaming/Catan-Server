import map  = require('./map/map');
import player = require('./players/player');

export class Game {

    private _gameName           : string;
    private _state              : string;
    private _players            : Array<player.Player>;
    private _map                : map.Map;
    private _turnNo             : number;
    private _colors             : any;
    private _dice               : any;
    private _turnOrder          : Array<number>;
    private _highestDiceRoll    : any;
    private _currentPlayerTurn  : number;
    private _winningScore       : number;

    constructor() {
        this._players = [];
        this._map = new map.Map();
        this._turnNo = 0;
        this._dice = {one: 0, two: 0};
        this._turnOrder = [];
        this._highestDiceRoll = {number: 0, player: 0};
        this._currentPlayerTurn = 0;
        this._winningScore = 10;

        this._colors = {
            red:false,
            blue:false,
            yellow:false,
            green:false
        };
    }

    // <editor-fold desc="Getters and setters">

    get gameName():string {
        return this._gameName;
    }

    set gameName(value:string) {
        this._gameName = value;
    }

    get state():string {
        return this._state;
    }

    set state(value:string) {
        this._state = value;
    }

    get players():Array<player.Player> {
        return this._players;
    }

    set players(value:Array<player.Player>) {
        this._players = value;
    }

    get map():map.Map {
        return this._map;
    }

    set map(value:map.Map ) {
        this._map = value;
    }

    get turnNo():number {
        return this._turnNo;
    }

    set turnNo(value:number) {
        this._turnNo = value;
    }

    get colors():Array<any> {
        return this._colors;
    }

    set colors(value:Array<any>) {
        this._colors = value;
    }

    get dice():any {
        return this._dice;
    }

    set dice(value:any) {
        this._dice = value;
    }

    get turnOrder():Array<number> {
        return this._turnOrder;
    }

    set turnOrder(value:Array<number>) {
        this._turnOrder = value;
    }

    get highestDiceRoll():any {
        return this._highestDiceRoll;
    }

    set highestDiceRoll(value:any) {
        this._highestDiceRoll = value;
    }

    get currentPlayerTurn():number {
        return this._currentPlayerTurn;
    }

    set currentPlayerTurn(value:number) {
        this._currentPlayerTurn = value;
    }

    get winningScore():number {
        return this._winningScore;
    }

    set winningScore(value:number) {
        this._winningScore = value;
    }

// </editor-fold>

    getGameData() {

        return({
            gameName    : this._gameName,
            gameState   : this._state,
            turnNo      : this._turnNo,
            dice        : this._dice,
            mapData     : this._map.getMapInfo(),
            players     : this.getPlayers()
        });

    }

    getSimpleGameData() {

        return({
            gameName    : this._gameName,
            gameState   : this._state,
            turnNo      : this._turnNo,
            dice        : this._dice,
        });

    }

    getPlayer(playerNo: number) {

        var thePlayer = null;

        this._players.forEach(function(playerObject: player.Player) {
            if (playerObject.number == playerNo) {
                thePlayer = playerObject;
            }
        }, this);

        return (thePlayer != null)?thePlayer:new player.Player();

    }

    getPlayers() {

        var playerData = [];

        this.players.forEach(function(player:player.Player) {
            playerData.push({
                name:player.name,
                color:player.color,
                number:player.number,
                points:player.points,
                playerTurn:player.playerTurn,
                diceRolled:player.diceRolled,
                pieces:player.pieces.getPieces(),
                resources:player.resources
            });
        });

        return playerData;
    }

    setPlayerColor(player:player.Player) {

        if (!this._colors.red) {
            player.color = "red";
            this._colors.red = true;
        } else if (!this._colors.blue) {
            player.color = "blue";
            this._colors.blue = true;
        } else if (!this._colors.green) {
            player.color = "green";
            this._colors.green = true;
        } else if (!this._colors.yellow) {
            player.color = "yellow";
            this._colors.yellow = true;
        }

        return player;

    }

    getSocketPlayer(playerNo: number) {

        var socketPlayer = null;

        this._players.forEach(function(playerObject: player.Player) {
            if (playerNo == playerObject.number) {
                socketPlayer = playerObject;
            }
        }, this);

        return socketPlayer;

    }

    updatePlayer(playerChanged: player.Player) {

        this._players.forEach(function(playerObject: player.Player, index) {
            if (playerChanged.number == playerObject.number) {
                this._players[index] = playerChanged;
            }
        }, this);

    }

    distributeResources(diceRoll: number) {

        this._players.forEach(function(playerObject: player.Player, index) {
            playerObject = this._map.grid.resourcesOnRoll(diceRoll, playerObject);
            this._players[index] = playerObject;
        }, this);

    }

}
