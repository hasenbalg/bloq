///<reference path="Game.ts" />

class StartScreen implements IScreen {
    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D;
    protected _debug: boolean;
    protected _width: number;
    protected _height: number;

    protected _text = 'TAP TO START!';

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._context = <CanvasRenderingContext2D>this._canvas.getContext('2d');
        this._width = this._canvas.width;
        this._height = this._canvas.height;
        this._debug = false;


        let player = Player.getInstance();
        player.restore();

        let self = this;
        this._canvas.addEventListener('touchstart', function (e) {
            this.removeEventListener('touchstart', function () { });

            swapScreen(new Game(cloneCanvas(this)));
            //self = undefined;
        });
    }

    update() {

    }

    render() {
        this._context.fillStyle = 'blue';
        this._context.textAlign = 'center';
        this._context.fillText(this._text, this._width / 2, this._height / 2);
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