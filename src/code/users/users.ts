///<reference path='../../definitions/DefinitelyTyped/socket.io/socket.io.d.ts'/>

import user = require('./user');

export class Users {

    private _users:Array<user.User>;

    constructor() {
        this._users = [];
    }

    get users():Array<user.User> {
        return this._users;
    }

    set users(value:Array<user.User>) {
        this._users = value;
    }

    addUser(socket:SocketIO.Socket) {

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

    }

    removeUser(socket:SocketIO.Socket) {

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

    }

}





