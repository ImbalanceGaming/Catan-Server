import piece  = require('./piece');
import pieces  = require('./pieces');

export class Player {

    private _name:string;
    private _color:string;

    private _number:number;
    private _points:number;

    private _playerTurn:boolean;
    private _diceRolled:boolean;

    private _pieces:pieces.Pieces;
    private _resources:any;

    constructor(name?: string) {
        this._name = name;
        this._color = null;
        this._number = null;
        this._points = 0;
        this._playerTurn = false;
        this._diceRolled = false;
        this._pieces = new pieces.Pieces();
        //this._resources = {
        //    wood: 0,
        //    stone: 0,
        //    ore: 0,
        //    sheep: 0,
        //    wheat: 0
        //};
        this._resources = {
            wood: 20,
            stone: 20,
            ore: 20,
            sheep: 20,
            wheat: 20
        };
    }

    get name():string {
        return this._name;
    }

    set name(value:string) {
        this._name = value;
    }

    get color():string {
        return this._color;
    }

    set color(value:string) {
        this._color = value;
    }

    get number():number {
        return this._number;
    }

    set number(value:number) {
        this._number = value;
    }

    get points():number {
        return this._points;
    }

    set points(value:number) {
        this._points = value;
    }

    get playerTurn():boolean {
        return this._playerTurn;
    }

    set playerTurn(value:boolean) {
        this._playerTurn = value;
    }

    get pieces():pieces.Pieces {
        return this._pieces;
    }

    set pieces(value:pieces.Pieces) {
        this._pieces = value;
    }

    get resources():any {
        return this._resources;
    }

    set resources(value:any) {
        this._resources = value;
    }

    get diceRolled():boolean {
        return this._diceRolled;
    }

    set diceRolled(value:boolean) {
        this._diceRolled = value;
    }

    getPlayer() {

        var playerData = [];

        playerData.push({
            name: this.name,
            color: this.color,
            number: this.number,
            points: this.points,
            playerTurn: this.playerTurn,
            diceRolled: this.diceRolled,
            pieces: this.pieces.getPieces(),
            resources: this.resources
        });

        return playerData;

    }

    updateScore(type:string) {

        switch(type) {
            case 'settlement':
                this._points++;
                break;
            case 'city':
                this._points++;
                break;
        }

    }

    hasResourcesToBuyPiece(pieceType: string) {

        switch (pieceType) {
            case 'road':
                if (this.resources.wood > 0 && this.resources.stone > 0) {
                    return true;
                }
                break;
            case 'settlement':
                if (this.resources.wood > 0 && this.resources.stone > 0 && this.resources.wheat > 0 && this.resources.sheep > 0) {
                    return true;
                }
                break;
            case 'city':
                if (this.resources.ore > 2 && this.resources.stone > 1) {
                    return true;
                }
                break;
        }

        return false;

    }

}
