///<reference path="Game.ts" />
///<reference path="Settings.ts" />

enum FieldStates {
    FREE, RESERVED, OCCUPIED
}

class Board {
    private _game: Game;
    private _segmentsNum: number;
    private _segmEdgeLength: number;
    private _margin: number = 5;
    private _width: number;
    private _matrix: FieldStates[][];
    private _currentColor: string = '';

    constructor(game: Game) {
        this._game = game;

        this._segmentsNum = Settings.NUMBLOCKSINAROW;

        this._matrix = this._getEmptyMatrix();
        this._segmEdgeLength = (this._game.width - this._margin * 2) / this._segmentsNum;
        this._width = this._game.width - this._margin * 2;
    }

    render(): void {
        // this._game.drawRect(
        //     {
        //         x:this._margin,
        //         y:this._margin
        //     },
        //     this._segmEdgeLength * this._segmentsNum,
        //     this._segmEdgeLength * this._segmentsNum,
        //     'white'
        // );

        for (let y = 0; y < this._matrix.length; y++) {
            for (let x = 0; x < this._matrix[y].length; x++) {
                switch (this._matrix[y][x]) {
                    case FieldStates.FREE:
                        this._currentColor = '';
                        continue;
                    case FieldStates.RESERVED:
                        this._currentColor = Settings.RESERVEDFIELDCOLOR;
                        break;
                    case FieldStates.OCCUPIED:
                        this._currentColor = Settings.OCCUPIEDFIELDCOLOR;
                        break;
                }
                this._game.drawRect(
                    {
                        x: (x * this._segmEdgeLength) + this._margin,
                        y: (y * this._segmEdgeLength) + this._margin
                    },
                    this._segmEdgeLength,
                    this._segmEdgeLength,
                    this._currentColor
                );
            }
        }
    }

    update(): void {

    }

    private _getEmptyMatrix(): number[][] {
        let newMatrix: number[][];
        newMatrix = new Array();
        for (let y = 0; y < this._segmentsNum; y++) {
            newMatrix[y] = new Array();
            for (let x = 0; x < this._segmentsNum; x++) {
                newMatrix[y][x] = FieldStates.FREE;
            }
        }
        return newMatrix;
    }

    updateMousePos(pos: { x: number, y: number }): void {
        if (pos.x - this._margin > this._margin
            && pos.y - this._margin > this._margin
            && pos.x < this._game.width - this._margin
            && pos.y < this._game.width + this._margin
        ) {
            this._matrix = this._getEmptyMatrix();

            let boardWidth = this._game.width - this._margin * 2;
            let x = Math.floor((pos.x - this._margin) / boardWidth * this._segmentsNum);
            let y = Math.floor((pos.y - this._margin) / boardWidth * this._segmentsNum);;
            this._matrix[y][x] = FieldStates.RESERVED;
            //console.log();
        } else {
            //console.log('out');
        }
    }

    reserve(shape: Shape): void {
        // touch is in board boundries
        if (
            shape.position.x - this._margin > this._margin
            && shape.position.y - this._margin > this._margin
            && shape.position.x < this._game.width - this._margin
            && shape.position.y < this._game.width + this._margin
        ) {
            // generate a new board with the old occupations
            let newMatrix = this._getEmptyMatrix();
            //remove reservations 
            for (let y = 0; y < this._matrix.length; y++) {
                for (let x = 0; x < this._matrix[y].length; x++) {
                    if (this._matrix[y][x] == FieldStates.RESERVED) {
                        this._matrix[y][x] = FieldStates.FREE;
                    }
                    newMatrix[y][x] = this._matrix[y][x];
                }
            }


            let topLeftField = {
                x: Math.floor((shape.position.x - this._margin) / this._width * this._segmentsNum),
                y: Math.floor((shape.position.y - this._margin) / this._width * this._segmentsNum)
            }
            console.log(shape.toString());
            for (let y = 0; y < shape.pattern.length; y++) {
                for (let x = 0; x < shape.pattern[y].length; x++) {
                    try {
                        if (shape.pattern[y][x] > 0) {
                            if (newMatrix[topLeftField.y + y][topLeftField.x + x] == FieldStates.FREE) {
                                newMatrix[topLeftField.y + y][topLeftField.x + x] = FieldStates.RESERVED;
                            } else {
                                return;
                            }
                        }
                    } catch (error) {
                        if (error instanceof TypeError) {
                            //console.log('out of board');
                            return;
                        } else {
                            throw (error);
                        }
                    }
                }
            }
            this._matrix = newMatrix;
        }
    }

    dropShape(shape: Shape): void {
        console.log(this.toString());
        // generate a new board with the old occupations
        let newMatrix = this._getEmptyMatrix();
        let thereWasChange = false;
        //remove reservations 
        for (let y = 0; y < this._matrix.length; y++) {
            for (let x = 0; x < this._matrix[y].length; x++) {
                if (this._matrix[y][x] == FieldStates.RESERVED) {
                    thereWasChange = true;
                    this._matrix[y][x] = FieldStates.OCCUPIED;
                }
                newMatrix[y][x] = this._matrix[y][x];
            }
        }
        console.log(`matrix did change ${thereWasChange}`);
        if (!thereWasChange) {//matrix did not change
            shape.invalidDrop = true;
        }else{
            //drop is successful
            this._matrix = newMatrix;
            this._clearCompleteLines();
        }
        this._game.resetCurrentShape(thereWasChange);
    }

    protected _clearCompleteLines(): void {
        console.log('clear');
    }

    getSegmentEdgeLength(): number {
        return this._segmEdgeLength;
    }

    public toString(): string {
        let output = '';
        for(let y of this._matrix){
            for(let x of y){
                output += x;
            }
            output += '\n';
        }
        return output;
    }


}