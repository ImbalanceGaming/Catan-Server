export class Tile {

    private _x              : number;
    private _y              : number;
    private _type           : string;
    private _number         : string;
    private _conversion     : string;
    private _angle          : number;
    private _anchorX        : number;
    private _anchorY        : number;
    private _topOfRow       : boolean;
    private _bottomOfRow    : boolean;
    private _column         : number;

    constructor() {

        this._x = 0;
        this._y = 0;
        this._type = "sea";
        this._number = null;
        this._conversion = null;
        this._angle = 0;
        this._anchorX = 0;
        this._anchorY = 0;
        this._topOfRow = false;
        this._bottomOfRow = false;
        this._column = 0;

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

    public get number():string {
        return this._number;
    }

    public set number(value:string) {
        this._number = value;
    }

    public get conversion():string {
        return this._conversion;
    }

    public set conversion(value:string) {
        this._conversion = value;
    }

    public get angle():number {
        return this._angle;
    }

    public set angle(value:number) {
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

    public get topOfRow():boolean {
        return this._topOfRow;
    }

    public set topOfRow(value:boolean) {
        this._topOfRow = value;
    }

    public get bottomOfRow():boolean {
        return this._bottomOfRow;
    }

    public set bottomOfRow(value:boolean) {
        this._bottomOfRow = value;
    }

    public get column():number {
        return this._column;
    }

    public set column(value:number) {
        this._column = value;
    }

}



