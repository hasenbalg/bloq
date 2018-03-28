///<reference path="GameObject.ts" />
///<reference path="Color.ts" />

class Field extends GameObject {



    protected _status: FieldStates
    protected _color: Color;
    protected _initialWidth: number;
    protected _initialHeight: number;
    protected _vanishingSpeed = .01;

    constructor(game: Game, position: { x: number, y: number }, width: number, height: number) {
        super(game);
        this._position = position;
        this._width = width;
        this._height = height;
        this._initialWidth = width;
        this._initialHeight = height;
        this._color = new Color(0, 0, 0);
        this._status = FieldStates.FREE;
    }

    update(): void {
        if (this._status == FieldStates.VANISHING) {
            // this._color.a -= this._vanishingSpeed;
            // if(this._color.a < 0.1){
            //     this.status = FieldStates.FREE;
            // }
            this.status = FieldStates.FREE;
        }
    }

    render(): void {
        switch (this._status) {
            case FieldStates.FREE:
                return;
            case FieldStates.RESERVED:
                this._color.makeTransparent(.2);
                break;
            case FieldStates.OCCUPIED:
                this._color.makeOpaque();
                break;
        }
        this._game.drawRect(
            {
                x: this._position.x,
                y: this._position.y
            },
            this._width,
            this._height,
            this._color.toString()
        );
    }

    set status(status: FieldStates) {
        switch (status) {
            case FieldStates.FREE:
                this._color = new Color(0, 0, 0, 0);
                // this._color.makeTransparent(0);
                break;
            case FieldStates.OCCUPIED:
                this._color.makeOpaque();
                break;
            case FieldStates.RESERVED:
                this._color.makeTransparent(.7);
                break;
            default:
                break;
        }
        this._status = status;
    }

    get status(): FieldStates {
        return this._status;
    }

    get color(): Color {
        return this._color;
    }

    set color(color: Color) {
        this._color = color;
    }

}