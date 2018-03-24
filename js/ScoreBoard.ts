///<reference path="Player.ts" />

class ScoreBoard{
    protected _position:{x:number;y:number};
    protected _separator:string = '|';
    protected _font:string;
    protected _color:string;

    protected _context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D,position:{x:number;y:number}){
        this._context = context;
        this._position = position;
        this._font = '40pt Abril Fatface';
        this._color = Settings.SCOREBOARDCOLOR;
    }

    update(){

    }

    render(){
        this._context.font = this._font;
        this._context.save();
        this._context.fillStyle = this._color;
        this._context.textAlign = 'center';
        this._context.fillText(
            `${Player.getInstance().name}:${Player.getInstance().score}${this._separator}${Player.getInstance().highscore}`,
             this._position.x,
              this._position.y
            );
        this._context.restore();
    }

   


}