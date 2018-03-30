class Color{
    protected _r:number;
    protected _g:number;
    protected _b:number;
    protected _a:number;

    constructor(r:number, g:number, b:number, a:number = 1){
        this._r = r;
        this._b = b;
        this._g = g;
        this._a = a;
    }

    makeTransparent(a:number){
        if(a <= 1 && a > 0){
            this._a = a;
            // console.log(this.toString());
        }
    }

    makeOpaque(){
            this._a = 1;
    }

    set r(r:number){
        if(r <= 255 && r > 0){
            this._r = r;
        }
    }

    get r():number{
        return this._r;
    }

    set g(g:number){
        if(g <= 255 && g > 0){
            this._g = g;
        }
    }

    get g():number{
        return this._g;
    }
    
    set b(b:number){
        if(b <= 255 && b > 0){
            this._b = b;
        }
    }

    get b():number{
        return this._b;
    }

    set a(a:number){
        if(a <= 1 && a >= 0){
            this._a = a;
        }
    }

    get a():number{
        return this._a;
    }

    toString():string{
        return `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
    }
    
}