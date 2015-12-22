var Piece = (function () {
    function Piece(id, type, placed) {
        if (placed === void 0) { placed = false; }
        this._id = id;
        this._type = type;
        if (placed) {
            this._state = 'placed';
        }
        else {
            this._state = 'bought';
        }
    }
    Object.defineProperty(Piece.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
        },
        enumerable: true,
        configurable: true
    });
    Piece.prototype.getPiece = function () {
        return {
            id: this._id,
            type: this._type,
            state: this._state
        };
    };
    return Piece;
})();
exports.Piece = Piece;
