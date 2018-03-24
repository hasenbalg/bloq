///<reference path="Settings.ts" />
///<reference path="Board.ts" />
///<reference path="Shop.ts" />
///<reference path="Shape.ts" />
///<reference path="ScoreBoard.ts" />


class Game {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;
    private _board:Board;
    private _shop:Shop;
    protected _scoreBoard:ScoreBoard;

    private _currentShape:Shape;

    private _debug:boolean;
    

    constructor(canvasId: string) {
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this._canvas.style.backgroundColor = Settings.BACKGROUNDCOLOR;
        this._context = <CanvasRenderingContext2D>this._canvas.getContext('2d');
        this._width = this._canvas.width;
        this._height = this._canvas.height;
        this._debug = false;
        this.resize();
        this._scoreBoard = new ScoreBoard(this._context, {x:this._width/2, y: 50});

        this._board = new Board(this);
        let self = this;
        this._canvas.addEventListener('touchstart', function(e){
            //pickup shape
            self._shop.touchStart({x:e.touches[0].clientX, y:e.touches[0].clientY});
            //add  touch listeners
            this.addEventListener('touchmove',function(e:TouchEvent){
                self._currentShape.position = {x:e.touches[0].clientX, y:e.touches[0].clientY};
                self._board.reserve(self.currentShape);
            });
            this.addEventListener('touchend',function(e){
                // console.log('touchend');
                //drop shape
                self._board.dropShape(self.currentShape);
                this.removeEventListener('touchmove',function(){});
                this.removeEventListener('touchend',function(){});
                this.removeEventListener('touchcancel',function(){});
            });
            this.addEventListener('touchcancel',function(e){
                console.log('touchcancel');
                this.removeEventListener('touchmove',function(){});
                this.removeEventListener('touchend',function(){});
                this.removeEventListener('touchcancel',function(){});
            });
        });

        this._shop = new Shop(this);
        this._currentShape = new Shape(this, Shape.EMPTY);
    }


    render(): void {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._board.render();
        this._shop.render();
        this._scoreBoard.render();
    }

    update(): void {
        // console.log('update');
        this._board.update();
        this._shop.update();
        this._scoreBoard.update();
    }

    drawRect(pos: { x: number, y: number }, width: number, height: number, color: string): void {
        this._context.beginPath();
        this._context.rect(pos.x, pos.y, width, height);
        this._context.fillStyle = color;
        this._context.fill();
        this._context.lineWidth = 1;
        this._context.strokeStyle = color;
        this._context.stroke();
    }

    
    resize():void{
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._canvas.width -= 4;
        this._canvas.height -= 4;
        this._width = this._canvas.width;
        this._height = this._canvas.height;
    }

    // updateMousePos(pos:{x:number, y:number}):void{
    //     this._board.updateMousePos(pos);
    // }
    resetCurrentShape(deleteShape:boolean):void{
        if(deleteShape){
            this._shop.deleteShape(this._currentShape);
        }
        this._currentShape = new Shape(this, Shape.EMPTY);
    }

    get width():number{
        return this._canvas.width;
    }
    get height():number{
        return this._canvas.height;
    }

    get context():CanvasRenderingContext2D{
        return this._context;
    }

    set currentShape(currentShape:Shape){
        this._currentShape = currentShape;
        // console.log(this._currentShape.toString());
    }

    get currentShape():Shape{
        return this._currentShape;
    }

    set debug(debug:boolean){
        this._debug = debug;
    }

    get debug():boolean{
        return this._debug;
    }

    getSegmentEdgeLength():number{
        return this._board.getSegmentEdgeLength();
    }
}


let game: Game;
window.onload = function () {
    game = new Game('game');
    loop();
}

window.onresize = function () {
    game.resize();
}

window.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    if(charStr = 'd'){
        game.debug = !game.debug;
    }
}


function loop() {
    game.update();
    game.render();
    window.requestAnimationFrame(loop);
}
