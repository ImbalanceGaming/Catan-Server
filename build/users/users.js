///<reference path='../../definitions/DefinitelyTyped/socket.io/socket.io.d.ts'/>
var user = require('./user');
var Users = (function () {
    function Users() {
        this._users = [];
    }
    Object.defineProperty(Users.prototype, "users", {
        get: function () {
            return this._users;
        },
        set: function (value) {
            this._users = value;
        },
        enumerable: true,
        configurable: true
    });
    Users.prototype.addUser = function (socket) {
        var userObject = null;
        this._users.forEach(function (user) {
            if (socket.conn.remoteAddress == user.IP) {
                user.socket = socket;
                if (user.room != null) {
                    user.joinRoom(user.room);
                }
                console.log('User ' + user.username + ' rejoined');
                userObject = user;
            }
        });
        if (!userObject) {
            userObject = new user.User();
            userObject.socket = socket;
            userObject.IP = socket.conn.remoteAddress;
            userObject.username = 'user' + (this._users.length + 1);
            this._users.push(userObject);
            console.log('User ' + userObject.username + ' joined');
        }
        return userObject;
    };
    Users.prototype.removeUser = function (socket) {
        var newUserArray = [];
        this._users.forEach(function (user) {
            if (socket.conn.remoteAddress != user.IP) {
                if (user.room != null) {
                    user.leaveRoom(user.room);
                }
                newUserArray.push(user);
            }
        });
        this._users = newUserArray;
    };
    return Users;
})();
exports.Users = Users;
