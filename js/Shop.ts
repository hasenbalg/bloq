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
        }
    }

    protected initShapes(){
        this._possibleShapes[0] = new Shape(this._game, Shape.EMPTY);
        this._possibleShapes[1] = new Shape(this._game, Shape.L );
        this._possibleShapes[2] = new Shape(this._game, Shape.TRI);
        this._possibleShapes[3] = new Shape(this._game, Shape.QUAD);
        this._possibleShapes[4] = new Shape(this._game, Shape.BAR3HORIZONTAL);
        this._possibleShapes[5] = new Shape(this._game, Shape.BAR3VERTICAL);
    }

    protected fillShop(){

        console.log(`fill up shop`);
        this._availableShapes = new Array();
        for(let i = 0; i < Settings.NUMAVAILABLESHAPES; i++ ){
            let random = Math.floor((Math.random() * (this._possibleShapes.length - 1) + 1 ));
            console.log(this._leftOffset);
            this._availableShapes[i] = Shape.getClone(
                this._possibleShapes[random],
                 {x: (this._game.width/Settings.NUMAVAILABLESHAPES * i) + this._leftOffset,
                y:(this._game.height - (this._game.height - this._game.width)/2)}
                );
        }
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