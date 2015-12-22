var Tile = (function () {
    function Tile() {
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
    Object.defineProperty(Tile.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "number", {
        get: function () {
            return this._number;
        },
        set: function (value) {
            this._number = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "conversion", {
        get: function () {
            return this._conversion;
        },
        set: function (value) {
            this._conversion = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "angle", {
        get: function () {
            return this._angle;
        },
        set: function (value) {
            this._angle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "anchorX", {
        get: function () {
            return this._anchorX;
        },
        set: function (value) {
            this._anchorX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "anchorY", {
        get: function () {
            return this._anchorY;
        },
        set: function (value) {
            this._anchorY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "topOfRow", {
        get: function () {
            return this._topOfRow;
        },
        set: function (value) {
            this._topOfRow = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "bottomOfRow", {
        get: function () {
            return this._bottomOfRow;
        },
        set: function (value) {
            this._bottomOfRow = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "column", {
        get: function () {
            return this._column;
        },
        set: function (value) {
            this._column = value;
        },
        enumerable: true,
        configurable: true
    });
    return Tile;
})();
exports.Tile = Tile;
