var GridElement = (function () {
    function GridElement() {
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
    Object.defineProperty(GridElement.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridElement.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridElement.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridElement.prototype, "angle", {
        get: function () {
            return this._angle;
        },
        set: function (value) {
            this._angle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridElement.prototype, "anchorX", {
        get: function () {
            return this._anchorX;
        },
        set: function (value) {
            this._anchorX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridElement.prototype, "anchorY", {
        get: function () {
            return this._anchorY;
        },
        set: function (value) {
            this._anchorY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridElement.prototype, "owningPlayer", {
        get: function () {
            return this._owningPlayer;
        },
        set: function (value) {
            this._owningPlayer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridElement.prototype, "playerPieceType", {
        get: function () {
            return this._playerPieceType;
        },
        set: function (value) {
            this._playerPieceType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridElement.prototype, "links", {
        get: function () {
            return this._links;
        },
        set: function (value) {
            this._links = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridElement.prototype, "resources", {
        get: function () {
            return this._resources;
        },
        set: function (value) {
            this._resources = value;
        },
        enumerable: true,
        configurable: true
    });
    GridElement.prototype.setResource = function (resource, number) {
        switch (resource) {
            case 'plain':
                this._resources.push({ type: 'sheep', number: this.setNumber(number) });
                break;
            case 'stoneMountain':
                this._resources.push({ type: 'stone', number: this.setNumber(number) });
                break;
            case 'oreMountain':
                this._resources.push({ type: 'ore', number: this.setNumber(number) });
                break;
            case 'dessert':
                this._resources.push({ type: 'none', number: null });
                break;
            default:
                this._resources.push({ type: resource, number: this.setNumber(number) });
                break;
        }
    };
    GridElement.prototype.setNumber = function (number) {
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
    };
    return GridElement;
})();
exports.GridElement = GridElement;
