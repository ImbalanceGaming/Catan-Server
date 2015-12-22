var piece = require('./piece');
var Pieces = (function () {
    function Pieces() {
        this._roads = [];
        this._settlements = [];
        this._cities = [];
    }
    Object.defineProperty(Pieces.prototype, "roads", {
        get: function () {
            return this._roads;
        },
        set: function (value) {
            this._roads = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pieces.prototype, "settlements", {
        get: function () {
            return this._settlements;
        },
        set: function (value) {
            this._settlements = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pieces.prototype, "cities", {
        get: function () {
            return this._cities;
        },
        set: function (value) {
            this._cities = value;
        },
        enumerable: true,
        configurable: true
    });
    Pieces.prototype.addPiece = function (type, placed) {
        if (placed === void 0) { placed = false; }
        var pieceObject;
        switch (type) {
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
    };
    Pieces.prototype.getPieces = function () {
        var pieces = {
            roads: [],
            settlements: [],
            cities: []
        };
        this._roads.forEach(function (piece) {
            pieces.roads.push(piece.getPiece());
        });
        this._settlements.forEach(function (piece) {
            pieces.settlements.push(piece.getPiece());
        });
        this._cities.forEach(function (piece) {
            pieces.cities.push(piece.getPiece());
        });
        return pieces;
    };
    Pieces.prototype.placePiece = function (type) {
        switch (type) {
            case 'road':
                this._roads.some(function (piece, index) {
                    if (piece.state == 'bought') {
                        piece.state = 'placed';
                        this._roads[index] = piece;
                        return true;
                    }
                }, this);
                break;
            case 'settlement':
                this._settlements.some(function (piece, index) {
                    if (piece.state == 'bought') {
                        piece.state = 'placed';
                        this._settlements[index] = piece;
                        return true;
                    }
                }, this);
                break;
            case 'city':
                this._cities.some(function (piece, index) {
                    if (piece.state == 'bought') {
                        piece.state = 'placed';
                        this._cities[index] = piece;
                        this._settlements.splice(0, 1);
                        return true;
                    }
                }, this);
                break;
        }
    };
    Pieces.prototype.hasPieceToPlace = function (type) {
        var pieceAvailable = false;
        switch (type) {
            case 'road':
                this._roads.forEach(function (piece) {
                    if (piece.state == 'bought') {
                        pieceAvailable = true;
                    }
                });
                break;
            case 'settlement':
                this._settlements.forEach(function (piece) {
                    if (piece.state == 'bought') {
                        pieceAvailable = true;
                    }
                });
                break;
            case 'city':
                this._cities.forEach(function (piece) {
                    if (piece.state == 'bought') {
                        pieceAvailable = true;
                    }
                });
                break;
        }
        return pieceAvailable;
    };
    return Pieces;
})();
exports.Pieces = Pieces;
