class Shop{
    private _game:Game;
    private _availableShapes:Shape[];
    private _possibleShapes:Shape[];
    private _leftOffset:number;

    constructor(game:Game){
        this._game = game;
        this._possibleShapes = new Array();
        this.initShapes();

        this._availableShapes = new Array();
        this._leftOffset = this._game.width/ (Settings.NUMAVAILABLESHAPES + 2); // |***|
    }
    render(){
        for(let as of this._availableShapes){
            as.render();
        }
    }

    update(){
        if (this._availableShapes.length == 0) {
            this.fillShop();
        }

        for(let as of this._availableShapes){
            as.update();
            //dont render if over board
            as.isOverShop = this._checkIfOverShop(as);
        }
    }

    get availableShapes():Shape[]{
        return this._availableShapes;
    }

    set availableShapes(availableShapes:Shape[]){
        throw new TypeError('Implemnet me');
    }

    protected initShapes(){
        this._possibleShapes[0] = new Shape(this._game, Shape.EMPTY, undefined, new Color(0,0,0));
        this._possibleShapes[1] = new Shape(this._game, Shape.L, undefined, new Color(0,0,0));
        this._possibleShapes[2] = new Shape(this._game, Shape.TRI, undefined, new Color(0,0,0));
        this._possibleShapes[3] = new Shape(this._game, Shape.QUAD, undefined, new Color(0,0,0));
        this._possibleShapes[4] = new Shape(this._game, Shape.BAR3HORIZONTAL, undefined, new Color(0,0,0));
        this._possibleShapes[5] = new Shape(this._game, Shape.BAR3VERTICAL, undefined, new Color(0,0,0));
        this._possibleShapes[6] = new Shape(this._game, Shape.J, undefined, new Color(0,0,0));
        this._possibleShapes[7] = new Shape(this._game, Shape.FLASH, undefined, new Color(0,0,0));
        this._possibleShapes[8] = new Shape(this._game, Shape.Z, undefined, new Color(0,0,0));
        this._possibleShapes[9] = new Shape(this._game, Shape.G , undefined, new Color(0,0,0));
        this._possibleShapes[10] = new Shape(this._game, Shape.DOT , undefined, new Color(0,0,0));
    }

    protected fillShop(){

        console.log(`fill up shop`);
        this._availableShapes = new Array();
        for(let i = 0; i < Settings.NUMAVAILABLESHAPES; i++ ){
            let random = Math.floor((Math.random() * (this._possibleShapes.length - 1) + 1 ));
            //console.log(this._leftOffset);
            this._availableShapes[i] = Shape.getClone(
                this._possibleShapes[random],
                 {x: (this._game.width/Settings.NUMAVAILABLESHAPES * i) + this._leftOffset,
                y:(this._game.height - (this._game.height - this._game.width)/2)}
                );
        }
        this._game.checkGameOver();
    }

    protected _checkIfOverShop(shape:Shape):boolean{
        return (shape.position.y > this._game.width);
    }

    touchStart(fingerPos:{x:number, y:number}):void{
        for (let s of this._availableShapes) {
            if(s.isTouched(fingerPos)){
                this._game.currentShape = s;
                //console.warn(`\n${this._game.currentShape.toString()}`);
                return;
            }
        }
    }

    deleteShape(currentShape:Shape):void{
        let index = this._availableShapes.indexOf(currentShape,0);
        console.log(`deleted ${index}`);
        if (index > -1) {
            this._availableShapes.splice(index, 1);
        }
        
        //this._availableShapes.splice(index, 1);
        //delete this._availableShapes[indexOfCurrentShape];
        console.log(`_availableShapes.length ${this._availableShapes.length}`);
    }
}