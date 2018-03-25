///<reference path="Game.ts" />
///<reference path="Boot.ts" />

class GameOverScreen implements IScreen {
    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D;
    protected _debug: boolean;
    protected _width: number;
    protected _height: number;
    protected _player:Player;

    protected _text = 'GAME OVER';

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._context = <CanvasRenderingContext2D>this._canvas.getContext('2d');
        this._width = this._canvas.width;
        this._height = this._canvas.height;
        this._debug = false;
        this._player = Player.getInstance();

        if(this._player.score == this._player.highscore){
            this._text = `Super gemacht,\n weiter so!
            Du hast eine neue\n Hoechstleistung vollbracht\n
            ${this._player.highscore}`;
        }else{
            this._text += `\nSchade\n
            ${this._player.score} | ${this._player.highscore}`;
        }
        

        let self = this;
        this._canvas.addEventListener('touchstart', function (e) {
            this.removeEventListener('touchstart', function () { });
            swapScreen(new Game(cloneCanvas(this)));
            //self = null;
        });
        this._player.save();
        this._player.score = 0
    }

    update() {

    }

    render() {
        let lineheight = 30;
        let lines = this._text.split('\n');
        this._context.fillStyle = 'blue';
        this._context.textAlign = 'center';
        for (let i = 0; i<lines.length; i++){
            this._context.fillText(lines[i].trim(), this._width / 2, this._height / 2 + (i*lineheight) );
            //this._context.fillText(this._text, this._width / 2, this._height / 2);
        }
    }

    resize() {

    }

    set canvas(canvas: HTMLCanvasElement) {
        throw new TypeError('Implement me');
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    set context(context: CanvasRenderingContext2D) {
        throw new TypeError('Implement me');
    }

    get context(): CanvasRenderingContext2D {
        return this._context;
    }

    set debug(debug: boolean) {
        throw new TypeError('Implement me');
    }

    get debug(): boolean {
        return this._debug;
    }
}