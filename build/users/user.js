///<reference path='../../definitions/DefinitelyTyped/socket.io/socket.io.d.ts'/>
var User = (function () {
    function User() {
        this._socket = null;
        this._username = null;
        this._IP = null;
    }
    Object.defineProperty(User.prototype, "socket", {
        get: function () {
            return this._socket;
        },
        set: function (value) {
            this._socket = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            this._username = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "IP", {
        get: function () {
            return this._IP;
        },
        set: function (value) {
            this._IP = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "room", {
        get: function () {
            return this._room;
        },
        set: function (value) {
            this._room = value;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.joinRoom = function (roomName) {
        this._socket.join(roomName);
        this._room = roomName;
    };
    User.prototype.leaveRoom = function (roomName) {
        this._socket.leave(roomName);
        this._room = null;
    };
    return User;
})();
exports.User = User;
