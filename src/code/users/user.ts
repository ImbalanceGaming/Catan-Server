///<reference path='../../definitions/DefinitelyTyped/socket.io/socket.io.d.ts'/>

export class User {

    private _socket:SocketIO.Socket;
    private _username:string;
    private _IP:string;
    private _room:string;

    constructor() {
        this._socket = null;
        this._username = null;
        this._IP = null;
    }

    get socket():SocketIO.Socket {
        return this._socket;
    }

    set socket(value:SocketIO.Socket) {
        this._socket = value;
    }

    get username():string {
        return this._username;
    }

    set username(value:string) {
        this._username = value;
    }

    get IP():string {
        return this._IP;
    }

    set IP(value:string) {
        this._IP = value;
    }

    get room():string {
        return this._room;
    }

    set room(value:string) {
        this._room = value;
    }

    joinRoom(roomName:string) {
        this._socket.join(roomName);
        this._room = roomName;
    }

    leaveRoom(roomName:string) {
        this._socket.leave(roomName);
        this._room = null;
    }

}


