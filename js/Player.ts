class Player {
    protected _name: string = 'XXX';
    protected _score: number = 0;
    protected _highscore: number = 0;

    protected static _player: Player;

    protected Player() {

    }

    public static getInstance(): Player {
        if (this._player == null) {
            this._player = new Player();
        }
        return this._player;
    }


    get name(): string {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }

    get score(): number {
        return this._score;
    }

    set score(points: number) {
        if(points > this._highscore){
            this._highscore = points;
        }
        this._score = points;
    }

    get highscore(): number {
        return this._highscore;
    }

    checkHighscore() {
        if (this._score > this._highscore) {
            this._highscore = this._score;
        }
    }

    save(): void {
        localStorage.setItem('name', this._name);
        localStorage.setItem('highscore', this._highscore.toString());
    }

    restore():void {
        console.log('restoring');
            this._name = localStorage.getItem('name') || 'XXX';
            this._highscore = Number(localStorage.getItem('highscore')) || 0;
        
    }

    delete(){
        localStorage.removeItem('name');
        localStorage.removeItem('highscore');
    }
}