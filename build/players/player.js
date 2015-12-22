var pieces = require('./pieces');
var Player = (function () {
    function Player(name) {
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
    Object.defineProperty(Player.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "number", {
        get: function () {
            return this._number;
        },
        set: function (value) {
            this._number = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "points", {
        get: function () {
            return this._points;
        },
        set: function (value) {
            this._points = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "playerTurn", {
        get: function () {
            return this._playerTurn;
        },
        set: function (value) {
            this._playerTurn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "pieces", {
        get: function () {
            return this._pieces;
        },
        set: function (value) {
            this._pieces = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "resources", {
        get: function () {
            return this._resources;
        },
        set: function (value) {
            this._resources = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "diceRolled", {
        get: function () {
            return this._diceRolled;
        },
        set: function (value) {
            this._diceRolled = value;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.getPlayer = function () {
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
    };
    Player.prototype.updateScore = function (type) {
        switch (type) {
            case 'settlement':
                this._points++;
                break;
            case 'city':
                this._points++;
                break;
        }
    };
    Player.prototype.hasResourcesToBuyPiece = function (pieceType) {
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
    };
    return Player;
})();
exports.Player = Player;
