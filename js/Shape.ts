class Shape {
    public static EMPTY = [
        []
    ];

    public static L = [
        [1],
        [1],
        [1, 1]
    ];

    public static TRI = [

        [0, 1],
        [1, 1, 1]
    ];

    public static QUAD = [
        [1, 1],
        [1, 1]
    ];

    public static BAR3VERTICAL = [
        [1],
        [1],
        [1]
    ];

    public static BAR3HORIZONTAL = [
        [1, 1, 1]
    ];

    private _game: Game;
    private _pattern: number[][];
    private _segmEdgeLength: number;
    private _position: { x: number, y: number } = { x: 0, y: 0 };

    private _halfWidth: number
    private _halfHeight: number;

    protected _invalidDrop = false;
    protected _initialPosition: { x: number, y: number };



    constructor(game: Game, pattern: number[][] = [[1, 1, 1]], position: { x: number, y: number } = { x: 0, y: 0 }) {
        this._game = game;
        this._pattern = pattern;
        this._segmEdgeLength = this._game.getSegmentEdgeLength();
        this._position = position;
        this._initialPosition = this._position;
        this._halfWidth = this.getLongestRow() * this._segmEdgeLength / 2;
        this._halfHeight = this._pattern.length * this._segmEdgeLength * .5;
        // console.log(`crated Shape  width:${this.getLongestRow()} height:${this._pattern.length}, edgelength: ${this._segmEdgeLength}`);
        // console.log(`halfHeight:${this._halfHeight}`);
    }

    render() {
        if (this._game.debug) {
            var radius = this.halfWidth;
            this._game.context.beginPath();
            this._game.context.arc(this._position.x,
                this._position.y,
                radius, 0, 2 * Math.PI, false);
            this._game.context.fillStyle = 'rgba(79, 140, 64, .3)';
            this._game.context.fill();
            this._game.context.lineWidth = 5;
            this._game.context.strokeStyle = '#003300';
            this._game.context.stroke();
        }


        for (let y = 0; y < this._pattern.length; y++) {
            for (let x = 0; x < this._pattern[y].length; x++) {
                if (this.pattern[y][x] > 0) {
                    this._game.drawRect(
                        {
                            x: this._position.x + (x * this._segmEdgeLength) - this._halfWidth,
                            y: this._position.y + (y * this._segmEdgeLength) - this._halfHeight
                        },
                        this._segmEdgeLength,
                        this.segmEdgeLength,
                        Settings.OCCUPIEDFIELDCOLOR
                    );
                }

            }
        }

    }

    update() {
        if (this._invalidDrop) {
            //fly home
            this._position.x = this.lerp(this._position.x, this._initialPosition.x, Settings.FLYHOMESPEED);
            this._position.y = this.lerp(this._position.y, this._initialPosition.y, Settings.FLYHOMESPEED);
            if (
                Math.abs(this._position.x - this._initialPosition.x) < Settings.FLYHOMESPEED
                && Math.abs(this._position.y - this._initialPosition.y) < Settings.FLYHOMESPEED
            ) {
                this._position = this._initialPosition;
                this._invalidDrop = false;
            }
        }

    }
    get game(): Game {
        return this._game;
    }


    get pattern(): number[][] {
        return this._pattern;
    }

    set pattern(pattern: number[][]) {
        this._pattern = pattern;
    }

    get segmEdgeLength(): number {
        return this._segmEdgeLength;
    }

    set segmEdgeLength(segmEdgeLength: number) {
        this._segmEdgeLength = segmEdgeLength;
    }

    get halfWidth(): number {
        return this._halfWidth;
    }

    set halfWidth(halfWidth: number) {
        this._halfWidth = halfWidth;
    }

    get halfHeight(): number {
        return this._halfWidth;
    }

    set halfHeight(halfHeight: number) {
        this._halfHeight = halfHeight;
    }

    get position(): { x: number, y: number } {
        return this._position;
    }

    set position(position: { x: number, y: number }) {
        // position.x += this._halfWidth;
        // position.y += this._halfHeight;
        this._position = position;
    }

    get invalidDrop(): boolean {
        return this._invalidDrop;
    }

    set invalidDrop(invalidDrop: boolean) {
        this._invalidDrop = invalidDrop;
    }

    protected getLongestRow(): number {
        let longestRowCounter = 0;
        for (let r of this._pattern) {
            if (r.length > longestRowCounter) {
                longestRowCounter = r.length;
            }
        }
        return longestRowCounter;
    }

    getPoints(): number {
        let counter = 0;
        for (let y of this._pattern) {
            for (let x of y) {
                if (x != 0) {
                    counter++;
                }
            }
        }
        return counter;
    }

    static getClone(orig: Shape, position: { x: number, y: number }): Shape {
        let copy = new Shape(orig.game, orig.pattern, position);
        //copy.position = position;
        copy.segmEdgeLength = orig.segmEdgeLength;
        return copy;
    }

    isTouched(fingerPos: { x: number, y: number }): boolean {
        let dx = fingerPos.x - this._position.x;
        let dy = fingerPos.y - this._position.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this._halfWidth) {
            // console.warn(`\n${this.toString()}`);
            return true;
        }
        return false;

    }




    public toString(): string {
        let output = '';
        for (let y of this._pattern) {
            for (let x of y) {
                output += (x == 1) ? '☐' : ' ';
            }
            output += '\n';
        }
        return output;
    }

    protected lerp(value1: number, value2: number, amount: number): number {
        return (1 - amount) * value1 + amount * value2;
    };
}