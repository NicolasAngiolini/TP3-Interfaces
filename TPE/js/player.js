class Player{
    constructor(game){
        this.game = game;
        this.width = 48.5;
        this.height = 40;
        this.x = 20;
        this.y = 100;

        
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 8;

        this.speedY = 0;
        this.maxSpeed = 2;
        this.projectiles = [];
        this.image = document.getElementById('player');
        this.powerUp = false;
        this.powerUpTimer = 0 ;
        this.powerUpLimit= 10000;

        this.fps = 80;
        this.frameTimer = 0;
        this.frameInterval = 10000/this.fps;

    }

    update(deltaTime){
       if(this.game.keys.includes('ArrowUp'))
            this.speedY = -this.maxSpeed;
        else if (this.game.keys.includes('ArrowDown'))
            this.speedY = this.maxSpeed;
        else this.speedY = 0;
        this.y += this.speedY;

        //limites 
        if( this.y > this.game.height - this.height * 0.5 ) this.y = this.game.height - this.height * 0.5;
        else if(this.y < -this.height* 0.5) this.y = -this.height * 0.5;
        
        //Proyectiles
        this.projectiles.forEach(projectile =>{
            projectile.update();
        });
        this.projectiles = this.projectiles.filter(projectile => !projectile.destroy);

      
        ///power Up
        if(this.powerUp){
            if(this.powerUpTimer> this.powerUpLimit){
                this.powerUpTimer = 0;
                this.powerUp = false;
            }else{
                this.powerUpTimer += deltaTime;
            }
        }

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
        if(this.game.debug){
            context.strokeRect(this.x,this.y,this.width,this.height);
        }
        context.drawImage(this.image,this.frameX * this.width , 0 , this.width ,this.height,
            this.x, this.y, this.width, this.height);

        this.projectiles.forEach(projectile =>{
            projectile.draw(context);
        });
    }
    shootTop(){
        if(this.game.ammo >0){
            this.projectiles.push(new Projectile(this.game, this.x+80 ,this.y+30));
            this.game.ammo--;
        }
        
       }
       powerUp(){
        this.powerUpTimer = 0;
        this.powerUp = true;
        this.game.ammo = this.game.maxAmmo;
       }
    
}