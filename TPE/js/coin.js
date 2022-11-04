
class Coin{

   constructor(game){
    this.game = game;
    this.x = this.game.width;
    this.y = this.game.height;
    this.speedX = Math.random()* -1.5 - 0.5;
    this.destroy = false;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 1; 

    this.width = 35;
    this.height = 24;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.image = document.getElementById("coin");
    this.frameY = Math.floor(Math.random() * 3);
   }

   update(){
    this.x += this.speedX - this.game.speed;
     if(this.x +this.width < 0 ) this.destroy = true;

   }           




draw(context){
    if(this.game.debug)
    context.strokeRect(this.x , this.y , this.width , this.height);
    context.drawImage(this.image, this.frameX * this.width , 0 , this.width, this.height, this.x, this.y, this.width, this.height);
  
}

}

