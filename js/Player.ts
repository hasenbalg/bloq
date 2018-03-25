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
        //https://stackoverflow.com/a/24103596
        let days = 356;
        let name = Settings.COOKIENAME;
        let value = this._highscore;

        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    read():void {console.log('READING');
        let name = Settings.COOKIENAME;
        let nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' '){
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0){
                this._highscore = Number(c.substring(nameEQ.length, c.length));
            }
        }
        this._highscore =  0;
    }

    delete(){
        let name = Settings.COOKIENAME;
        document.cookie = name+'=; Max-Age=-99999999;'; 
    }
}