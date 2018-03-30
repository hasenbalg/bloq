///<reference path="Game.ts" />

class StartScreen implements IScreen {
    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D;
    protected _debug: boolean;
    protected _width: number;
    protected _height: number;

    protected _text = 'TAP TO START!';

    protected _numFlagsInRow: number = 8;


    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._context = <CanvasRenderingContext2D>this._canvas.getContext('2d');
        this._width = this._canvas.width;
        this._height = this._canvas.height;

        this.resize();
        this._debug = false;

       




        let player = Player.getInstance();
        player.restore();

        let self = this;
        this._canvas.addEventListener('touchstart', function (e) {
            
                this.removeEventListener('touchstart', function () { });
                swapScreen(new Game(cloneCanvas(this)));
            
        });

       

    }

    update() {
        
    }

    render() {
        this._context.clearRect(0,0,this._canvas.width, this._canvas.height);
        this._context.font = '30pt Gilbert';
        this._context.fillStyle = '#222';
        this._context.textAlign = 'center';
        this._context.fillText(this._text, this._width / 2, this._height / 2);


        // this._context.fillText(Player.getInstance().name, this._width / 2, this._height-(this._height / 3));
    }

    resize():void{
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._canvas.width -= 4;
        this._canvas.height -= 4;
        this._width = this._canvas.width;
        this._height = this._canvas.height;
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
        this._debug = debug;
        // throw new TypeError('Implement me');
    }

    get debug(): boolean {
        return this._debug;
    }
}