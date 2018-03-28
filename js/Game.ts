///<reference path="Settings.ts" />
///<reference path="Board.ts" />
///<reference path="Shop.ts" />
///<reference path="Shape.ts" />
///<reference path="ScoreBoard.ts" />
///<reference path="IScreen.ts" />
///<reference path="GameOverScreen.ts" />
///<reference path="Boot.ts" />


class Game implements IScreen{
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;
    private _board:Board;
    private _shop:Shop;
    protected _scoreBoard:ScoreBoard;

    private _currentShape:Shape;

    protected _debug:boolean;
    protected _isOver:boolean;
    

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._canvas.style.backgroundColor = Settings.BACKGROUNDCOLOR;
        this._context = <CanvasRenderingContext2D>this._canvas.getContext('2d');
        this._context.imageSmoothingEnabled = true;
        this._width = this._canvas.width;
        this._height = this._canvas.height;
        this._debug = false;
        this._isOver = false;
        this.resize();
        this._scoreBoard = new ScoreBoard(this._context, {x:this._width/2, y: this._height - 30});

        this._board = new Board(this);
        let self = this;
        this._canvas.addEventListener('touchstart', function(e){
            //pickup shape
            e.preventDefault();
            self._shop.touchStart({x:e.touches[0].clientX, y:e.touches[0].clientY});
            

            //add  touch listeners
            this.addEventListener('touchmove',function(e:TouchEvent){
                e.preventDefault();
                self._currentShape.position = {x:e.touches[0].clientX, y:e.touches[0].clientY};
                self._board.reserve(self.currentShape);
            });
            this.addEventListener('touchend',function(e){
                // console.log('touchend');
                //drop shape
                e.preventDefault();
                self._board.dropShape(self.currentShape);
                this.removeEventListener('touchmove',function(){});
                this.removeEventListener('touchend',function(){});
                this.removeEventListener('touchcancel',function(){});
            });
            this.addEventListener('touchcancel',function(e){
                e.preventDefault();
                console.log('touchcancel');
                this.removeEventListener('touchmove',function(){});
                this.removeEventListener('touchend',function(){});
                this.removeEventListener('touchcancel',function(){});
            });
        });

        this._shop = new Shop(this);
        this._currentShape = new Shape(this, Shape.EMPTY,undefined, new Color(0,0,0));
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
        this._context.save();
        this._context.beginPath();
        this._context.rect(pos.x, pos.y, width - .5, height - .5);
        this._context.fillStyle = color;
        this._context.fill();
        this._context.restore();
        // this._context.lineWidth = 1;
        // this._context.strokeStyle = color;
        //this._context.stroke();
    }

    drawFrame(pos: { x: number, y: number }, width: number, height: number, color: string): void {
        this._context.beginPath();
        this._context.rect(pos.x, pos.y, width, height);
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

   
    resetCurrentShape(deleteShape:boolean):void{
        if(deleteShape){
            this._shop.deleteShape(this._currentShape);
            //check if the rest shapes still fit
            this.checkGameOver();

        }
        this._currentShape = new Shape(this, Shape.EMPTY,undefined, new Color(0,0,0));
    }

    checkGameOver(){
        for(let shape of this._shop.availableShapes){
            let possiblePositions: number[][] = this._board.findPossiblePositions(shape);
            let positionsCounter = 0;
            for(let row of possiblePositions){
                for(let field of row){
                    if(field == FieldStates.SHAPEOKHERE){
                        positionsCounter++;
                    }
                }
            }
            if(positionsCounter == 0){
                shape.isActive = false;
            }else{
                shape.isActive = true;
            }
        }

        //check if there are still active shapes available
        let counterActiveShapesAvailable = 0;
        for(let shape of this._shop.availableShapes){
            if(shape.isActive){
                counterActiveShapesAvailable++;
            }
        }
        if(counterActiveShapesAvailable == 0 && this._shop.availableShapes.length > 0){
            this._isOver = true;
            console.log('GAME OVER');
            swapScreen(new GameOverScreen(cloneCanvas(this._canvas)));
            //this = undefined;
        }
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

    set canvas(canvas:HTMLCanvasElement){
        throw new TypeError('Implement me');
    }

    get canvas():HTMLCanvasElement{
        return this._canvas;
    }

    getSegmentEdgeLength():number{
        return this._board.getSegmentEdgeLength();
    }
}

