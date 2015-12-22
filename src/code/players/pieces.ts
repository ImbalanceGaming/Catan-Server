import piece  = require('./piece');

export class Pieces {

    private _roads: Array<piece.Piece>;
    private _settlements: Array<piece.Piece>;
    private _cities: Array<piece.Piece>;

    constructor() {
        this._roads = [];
        this._settlements = [];
        this._cities = [];
    }

    get roads():Array<piece.Piece> {
        return this._roads;
    }

    set roads(value:Array<piece.Piece>) {
        this._roads = value;
    }

    get settlements():Array<piece.Piece> {
        return this._settlements;
    }

    set settlements(value:Array<piece.Piece>) {
        this._settlements = value;
    }

    get cities():Array<piece.Piece> {
        return this._cities;
    }

    set cities(value:Array<piece.Piece>) {
        this._cities = value;
    }

    addPiece(type:string, placed: boolean = false) {

        var pieceObject: piece.Piece;

        switch(type) {
            case 'road':
                this._roads.push(pieceObject = new piece.Piece(this._roads.length + 1, type, placed));
                break;
            case 'settlement':
                this._settlements.push(pieceObject = new piece.Piece(this._settlements.length + 1, type, placed));
                break;
            case 'city':
                this._cities.push(pieceObject = new piece.Piece(this._cities.length + 1, type, placed));
                break;
        }

        return pieceObject.getPiece();

    }

    getPieces() {

        var pieces = {
            roads: [],
            settlements: [],
            cities: []
        };

        this._roads.forEach(function(piece:piece.Piece) {
           pieces.roads.push(piece.getPiece());
        });

        this._settlements.forEach(function(piece:piece.Piece) {
            pieces.settlements.push(piece.getPiece());
        });

        this._cities.forEach(function(piece:piece.Piece) {
            pieces.cities.push(piece.getPiece());
        });

        return pieces;

    }

    placePiece(type: string) {

        switch (type) {
            case 'road':
                this._roads.some(function(piece:piece.Piece, index) {
                    if (piece.state == 'bought') {
                        piece.state = 'placed';
                        this._roads[index] = piece;
                        return true;
                    }
                }, this);
                break;
            case 'settlement':
                this._settlements.some(function(piece:piece.Piece, index) {
                    if (piece.state == 'bought') {
                        piece.state = 'placed';
                        this._settlements[index] = piece;
                        return true;
                    }
                }, this);
                break;
            case 'city':
                this._cities.some(function(piece:piece.Piece, index) {
                    if (piece.state == 'bought') {
                        piece.state = 'placed';
                        this._cities[index] = piece;
                        this._settlements.splice(0, 1);
                        return true;
                    }
                }, this);

                break;
        }

    }

    hasPieceToPlace(type: string) {

        var pieceAvailable = false;

        switch (type) {
            case 'road':
                this._roads.forEach(function(piece:piece.Piece) {
                    if (piece.state == 'bought') {
                        pieceAvailable = true;
                    }
                });
                break;
            case 'settlement':
                this._settlements.forEach(function(piece:piece.Piece) {
                    if (piece.state == 'bought') {
                        pieceAvailable = true;
                    }
                });
                break;
            case 'city':
                this._cities.forEach(function(piece:piece.Piece) {
                    if (piece.state == 'bought') {
                        pieceAvailable = true;
                    }
                });
                break;
        }

        return pieceAvailable;

    }

}
