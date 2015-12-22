export class GridElement {

    private _x                  : number;
    private _y                  : number;
    private _type               : string;
    private _angle              : number;
    private _anchorX            : number;
    private _anchorY            : number;
    private _owningPlayer       : number;
    private _playerPieceType    : string;
    private _links              : Array<number>;
    private _resources          : Array<any>;

    constructor() {

        this._x = 0;
        this._y = 0;
        this._type = null;
        this._angle = 0;
        this._anchorX = 0;
        this._anchorY = 0;
        this._owningPlayer = null;
        this._playerPieceType = null;
        this._links = [];
        this._resources = [];

    }

    get x():number {
        return this._x;
    }

    set x(value:number) {
        this._x = value;
    }

    get y():number {
        return this._y;
    }

    set y(value:number) {
        this._y = value;
    }

    public get type():string {
        return this._type;
    }

    public set type(value:string) {
        this._type = value;
    }

    get angle():number {
        return this._angle;
    }

    set angle(value:number) {
        this._angle = value;
    }

    get anchorX():number {
        return this._anchorX;
    }

    set anchorX(value:number) {
        this._anchorX = value;
    }

    get anchorY():number {
        return this._anchorY;
    }

    set anchorY(value:number) {
        this._anchorY = value;
    }

    public get owningPlayer():number {
        return this._owningPlayer;
    }

    public set owningPlayer(value:number) {
        this._owningPlayer = value;
    }

    get playerPieceType():string {
        return this._playerPieceType;
    }

    set playerPieceType(value:string) {
        this._playerPieceType = value;
    }

    public get links():Array<number> {
        return this._links;
    }

    public set links(value:Array<number>) {
        this._links = value;
    }

    public get resources():Array<any> {
        return this._resources;
    }

    public set resources(value:Array<any>) {
        this._resources = value;
    }

    setResource(resource: string, number: string) {

        switch (resource) {
            case 'plain':
                this._resources.push({type: 'sheep', number: this.setNumber(number)});
                break;
            case 'stoneMountain':
                this._resources.push({type: 'stone', number: this.setNumber(number)});
                break;
            case 'oreMountain':
                this._resources.push({type: 'ore', number: this.setNumber(number)});
                break;
            case 'dessert':
                this._resources.push({type: 'none', number: null});
                break;
            default:
                this._resources.push({type: resource, number: this.setNumber(number)});
                break;
        }

    }

    private setNumber(number:string) {

        switch (number) {
            case 'one':
                return 1;
            case 'two':
                return 2;
            case 'three':
                return 3;
            case 'four':
                return 4;
            case 'five':
                return 5;
            case 'six':
                return 6;
            case 'seven':
                return 7;
            case 'eight':
                return 8;
            case 'nine':
                return 9;
            case 'ten':
                return 10;
            case 'eleven':
                return 11;
            case 'twelve':
                return 12;
        }

    }

}
