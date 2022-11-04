class Sounds{
    constructor(game){
        this.game = game;
        this.coin = document.getElementById('coinSound');
        this.music = document.getElementById('music');
        this.muerte = document.getElementById('muerte');
        this.bichomuerto = document.getElementById('bichoMuerto');
        this.win = document.getElementById('win');


        this.music.volume =0.1;
        this.coin.volume = 0.1;
        this.bichomuerto.volume = 0.1;
        this.muerte.volume = 0.1;
        this.win.volume = 0.1;
    }
}