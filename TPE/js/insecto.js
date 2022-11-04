class Insecto extends Enemy{

    constructor(game){
        super(game);
        this.width = 84.5;
        this.height = 67;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
        this.image = document.getElementById("insecto");
        this.frameY = Math.floor(Math.random() * 3);
    }



}