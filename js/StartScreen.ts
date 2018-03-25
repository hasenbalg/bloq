///<reference path="Game.ts" />
///<reference path="Flag.ts" />

class StartScreen implements IScreen {
    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D;
    protected _debug: boolean;
    protected _width: number;
    protected _height: number;

    protected _text = 'TAP TO START!';

    protected flags: Flag[];
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
            //self = undefined;
        });

        this.flags = new Array();
        let x = 0;
        let y = 0;
        for (let i = 0; i < Flag.files.length; i++) {
            let flagWidth = this._width / this._numFlagsInRow;
            let flagHeight = flagWidth / 2;


            this.flags.push(
                new Flag(
                    this.canvas,
                    { x: x * flagWidth, y: y * flagHeight },
                    flagWidth,
                    flagHeight,
                    `svg/${Flag.files[i]}`
                )
            );
            x++;
            if (x >= this._numFlagsInRow) {
                x = 0;
                y++;
                
            }
            //console.log(y, x);
        }

    }

    update() {
        for (const flag of this.flags) {
            flag.update();
        }
    }

    render() {

        for (const flag of this.flags) {
            flag.render();
        }
        this._context.fillStyle = 'blue';
        this._context.textAlign = 'center';
        this._context.fillText(this._text, this._width / 2, this._height / 2);
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
        throw new TypeError('Implement me');
    }

    get debug(): boolean {
        return this._debug;
    }
}