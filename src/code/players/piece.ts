export class Piece {

    private _id:number;
    private _type:string;
    private _state: string;

    constructor(id:number, type:string, placed: boolean = false) {

        this._id = id;
        this._type = type;

        if (placed) {
            this._state = 'placed';
        } else {
            this._state = 'bought';
        }

    }

    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
    }

    get type():string {
        return this._type;
    }

    set type(value:string) {
        this._type = value;
    }

    get state():string {
        return this._state;
    }

    set state(value:string) {
        this._state = value;
    }

    getPiece() {

        return {
            id: this._id,
            type: this._type,
            state: this._state
        };

    }

}
