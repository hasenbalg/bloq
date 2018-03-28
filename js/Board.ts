///<reference path="Game.ts" />
///<reference path="Settings.ts" />
///<reference path="FieldStates.ts" />
///<reference path="Field.ts" />



class Board {
    protected _game: Game;
    protected _segmentsNum: number;
    protected _segmEdgeLength: number;
    protected _margin: number = 5;
    protected _width: number;
    protected _matrix: Field[][];
    protected _currentColor: string = '';

    constructor(game: Game) {
        this._game = game;

        this._segmentsNum = Settings.NUMBLOCKSINAROW;

        this._segmEdgeLength = (this._game.width - this._margin * 2) / this._segmentsNum;
        this._width = this._game.width - this._margin * 2;
        this._matrix = this._getEmptyMatrix();
    }

    render(): void {
        this._game.drawFrame({ x: this._margin, y: this._margin }, this._width, this._width, Settings.BOARDCOLOR);


        for (const row of this._matrix) {
            for (const field of row) {
                field.render();
            }
        }
    }

    update(): void {
        for (const row of this._matrix) {
            for (const field of row) {
                field.update();
            }
        }
    }

    protected _getEmptyMatrix(): Field[][] {
        let newMatrix: Field[][];
        newMatrix = new Array();
        for (let y = 0; y < this._segmentsNum; y++) {
            newMatrix[y] = new Array();
            for (let x = 0; x < this._segmentsNum; x++) {
                newMatrix[y][x] = new Field(this._game, {
                    x: (x * this._segmEdgeLength) + this._margin,
                    y: (y * this._segmEdgeLength) + this._margin
                },
                this._segmEdgeLength,
                this._segmEdgeLength);
            }
        }
        return newMatrix;
    }

    // updateMousePos(pos: { x: number, y: number }): void {
    //     if (pos.x - this._margin > this._margin
    //         && pos.y - this._margin > this._margin
    //         && pos.x < this._game.width - this._margin
    //         && pos.y < this._game.width + this._margin
    //     ) {
    //         this._matrix = this._getEmptyMatrix();

    //         let boardWidth = this._game.width - this._margin * 2;
    //         let x = Math.floor((pos.x - this._margin) / boardWidth * this._segmentsNum);
    //         let y = Math.floor((pos.y - this._margin) / boardWidth * this._segmentsNum);;
    //         this._matrix[y][x] = FieldStates.RESERVED;
    //     }
    // }

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
                    if (this._matrix[y][x].status == FieldStates.RESERVED) {
                        this._matrix[y][x].status = FieldStates.FREE;
                    }
                    newMatrix[y][x] = this._matrix[y][x];
                }
            }


            let topLeftField = {
                x: 0,
                y: 0
            }


            //get possible positions
            let possiblePositions = this.findPossiblePositions(shape);
            let shortestDistance = Number.MAX_VALUE;
            for (let y = 0; y < possiblePositions.length; y++) {
                for (let x = 0; x < possiblePositions[y].length; x++) {
                    if (possiblePositions[y][x] == FieldStates.SHAPEOKHERE) {
                        let currentDistance = this._getDistance({ x: x * this._segmEdgeLength + this._margin, y: y * this._segmEdgeLength + this._margin }, shape.position);
                        if (currentDistance < shortestDistance) {
                            shortestDistance = currentDistance;
                            topLeftField = { x: x, y: y };
                        }
                    }
                }
            }

            if(shortestDistance > Settings.SNAPDISTANCE){
                return;
            }





            console.log(this.toString());
            console.log(shape.toString());
            for (let y = 0; y < shape.pattern.length; y++) {
                for (let x = 0; x < shape.pattern[y].length; x++) {
                    try {
                        if (shape.pattern[y][x] > 0) {
                            if (newMatrix[topLeftField.y + y][topLeftField.x + x].status == FieldStates.FREE) {
                                newMatrix[topLeftField.y + y][topLeftField.x + x].status = FieldStates.RESERVED;
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
        // generate a new board with the old occupations
        let newMatrix = this._getEmptyMatrix();
        let thereWasChange = false;
        //remove reservations 
        for (let y = 0; y < this._matrix.length; y++) {
            for (let x = 0; x < this._matrix[y].length; x++) {
                if (this._matrix[y][x].status == FieldStates.RESERVED) {
                    thereWasChange = true;
                    this._matrix[y][x].status = FieldStates.OCCUPIED;
                    this._matrix[y][x].color = shape.color;
                }
                newMatrix[y][x] = this._matrix[y][x];
            }
        }

        if (!thereWasChange) {//matrix did not change
            shape.invalidDrop = true;
        } else {
            //drop is successful
            this._matrix = newMatrix;
            this._clearCompleteLines();
            Player.getInstance().score += shape.getPoints();
        }
        this._game.resetCurrentShape(thereWasChange);
    }

    protected _clearCompleteLines(): void {
        // look for lines
        for (let y = 0; y < this._matrix.length; y++) {
            let counter = 0;
            for (let x = 0; x < this._matrix[y].length; x++) {
                if (this._matrix[y][x].status == FieldStates.OCCUPIED) {
                    counter++;
                }
            }
            //clear line
            if (counter == this._matrix[0].length) {
                console.log(counter);
                for (let x = 0; x < this._matrix[y].length; x++) {
                    if (this._matrix[y][x].status == FieldStates.OCCUPIED) {
                        this._matrix[y][x].status = FieldStates.VANISHING;
                    }
                }
                Player.getInstance().score += counter;
            }

        }
        // look for columns
        for (let y = 0; y < this._matrix.length; y++) {
            let counter = 0;
            for (let x = 0; x < this._matrix[y].length; x++) {
                if (this._matrix[x][y].status == (FieldStates.OCCUPIED || FieldStates.VANISHING)) {
                    counter++;
                }
            }
            //clear column
            if (counter == this._matrix[0].length) {
                console.log(counter);
                for (let x = 0; x < this._matrix[y].length; x++) {
                    if (this._matrix[x][y].status == (FieldStates.OCCUPIED || FieldStates.VANISHING)) {
                        this._matrix[x][y].status = FieldStates.VANISHING;
                    }
                }
                Player.getInstance().score += counter;
            }

        }

        // for (const row of this._matrix) {
        //     for (const field of row) {
        //         if(field.status == FieldStates.VANISHING){
        //             field.status = FieldStates.FREE;
        //         }
        //     }
        // }

    }

    findPossiblePositions(shape: Shape): number[][] {
        let possiblePositions = new Array();

        for (let y = 0; y < this._matrix.length; y++) {
            possiblePositions[y] = new Array();
            for (let x = 0; x < this._matrix[y].length; x++) {
                possiblePositions[y][x] = this._matrix[y][x].status;
            }
        }

        for (let y = 0; y < this._matrix.length; y++) {
            for (let x = 0; x < this._matrix[y].length; x++) {
                let shapeIsFitting = true;
                let sy = 0;
                let sx = 0;
                for (let sy = 0; sy < shape.pattern.length; sy++) {
                    for (let sx = 0; sx < shape.pattern[sy].length; sx++) {
                        if (
                            y + sy > this._segmentsNum - 1
                            || x + sx > this._segmentsNum - 1
                            || (
                                shape.pattern[sy][sx] == 1
                                && this._matrix[y + sy][x + sx].status == FieldStates.OCCUPIED
                            )
                        ) {
                            shapeIsFitting = false;
                        }
                    }
                }
                if (shapeIsFitting) {
                    possiblePositions[y][x] = FieldStates.SHAPEOKHERE;
                }
            }
        }
        return possiblePositions;
    }

    getSegmentEdgeLength(): number {
        return this._segmEdgeLength;
    }
    protected _getDistance(point1:{x:number, y:number}, point2:{x:number, y:number}) {
        let a = point1.x - point2.x;
        let b = point1.y - point2.y;

        return Math.sqrt(a * a + b * b);
    }

    public toString(): string {
        let output = '';
        for (let y of this._matrix) {
            for (let x of y) {
                output += x.status;
            }
            output += '\n';
        }
        return output;
    }


}