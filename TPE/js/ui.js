class Ui{
    constructor(game){
        this.game = game;
        this.fontSize = 50;
        this.fontFamily = 'Helvetica';
        this.color = 'white';
    }
    draw(context){
        context.save();
        context.fillStyle = this.color;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.font = '20px Helvetica';  

        //score
        context.fillText('Score: ' + this.game.score, 40 ,40);

        //ammo
        if(this.game.player.powerUp) context.fillStyle = "red";
        for(let i = 0;i<this.game.ammo;i++){    
            context.fillRect(20 + 5 *i, 50 , 3 , 20 );
        }

        //timer
        const foramtoTiempo = (this.game.gameTime*0.001).toFixed(1);
        context.fillText('Timer: '+ foramtoTiempo, 20 , 100);

        //gameOver
        if(this.game.gameOver){
            context.textAlign='center'
            let mensaje1;
            let mensaje2;
            let mensaje3;
            if(this.game.score > this.game.winScore){
                mensaje1 = 'Ganaste';
                mensaje2 = 'Bien hecho'
                mensaje3 = 'Tu puntaje es: ' + this.game.score;
                context.font= '300px'+ this.fontFamily;
                context.fillText(mensaje3 ,this.game.width * 0.5 , this.game.height * 0.5 +80);
                this.game.sound.music.pause();
                this.game.sound.win.play();
            }else{
                mensaje1 = 'Perdiste';
                mensaje2 = 'Intentalo de nuevo';
                this.game.sound.music.pause();
            }
            context.font= '80px'+ this.fontFamily;
            context.fillText(mensaje1 ,this.game.width * 0.5 , this.game.height * 0.5 -40);
            context.font= '40px'+ this.fontFamily;
            context.fillText(mensaje2 ,this.game.width * 0.5 , this.game.height * 0.5 +40);

           
            

        }
        context.restore();
    }
    
   
}