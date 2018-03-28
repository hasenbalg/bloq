///<reference path="Game.ts" />

class GameObject{
    protected _game:Game;
    protected _position:{x:number, y:number};
    protected _width:number;
    protected _height:number;

    constructor(game:Game){
        this._game = game;
        this._position = {x:0, y:0};
        this._width = 0;
        this._height = 0;
    }

    update(){

    }

    render(){

    }
}