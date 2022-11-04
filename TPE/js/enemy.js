class Enemy{
    constructor(game){
        this.game = game;
        this.x = this.game.width;
        this.y = this.game.height;
        this.speedX = Math.random()* -1.5 - 0.5;
        this.destroy = false;
        this.lives = 5;
        this.score = this.lives;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 7;
        this.fps = 80;
        this.frameTimer = 0;
        this.frameInterval = 10000/this.fps;
        this.speed = 1;   
    }

    update(deltaTime){
         this.x += this.speedX - this.game.speed;
        if(this.x +this.width < 0 ) this.destroy = true;

         //animacion
         if(this.frameTimer > this.frameInterval){
            if(this.frameX >= this.maxFrame)this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        }else{
            this.frameTimer += deltaTime;
        }           
  }
    
    

    draw(context){
        if(this.game.debug)
        context.strokeRect(this.x , this.y , this.width , this.height);
        context.drawImage(this.image, this.frameX * this.width , 0 , this.width, this.height, this.x, this.y, this.width, this.height);
        
        if(this.game.debug){
            context.font = '20px Helvetica';    
            context.fillText(this.lives, this.x , this.y);
        }
       
    }

}
