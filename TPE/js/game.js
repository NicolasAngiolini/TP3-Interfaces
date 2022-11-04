class Game{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input =  new InputHandler(this);
        this.ui = new Ui(this);
        this.background = new Background(this);
        this.sound = new Sounds(this);

        this.keys = [];
        this.enemies=[];
        this.coins = [];

        this.enemyTimer = 0;
        this.enemyInterval = 1000;

        this.coinTimer = 0;
        this.coinInterval = 1000;

        this.ammo = 20;
        this.maxAmmo = 25;
        this.ammoTimer = 0;
        this.ammoInterval = 500;

        this.gameOver = false;
        this.score = 0;
        this.gameTime = 0;
        this.timeLimit = 50000;
        this.winScore = 1;
        this.speed = 0.5;
        this.debug = false;
    }
    update(deltaTime){
        if(!this.gameOver) this.gameTime +=deltaTime;
        if(this.gameTime > this.timeLimit) this.gameOver = true;
        this.background.update();
        this.background.layer4.update();
        this.player.update(deltaTime);

        //recarga las balas       
        if(this.ammoTimer> this.ammoInterval){
            if(this.ammo < this.maxAmmo)this.ammo++;
            this.ammoTimer=0;
        }else{
            this.ammoTimer +=deltaTime;
        }

        //Chequea si el jugador agarro una coins
        this.coins.forEach(coin =>{
            coin.update();
            if(this.checkCollision(this.player,coin)){
                this.player.powerUp = true;
                this.sound.coin.play();
                coin.destroy = true;
            }
        }) 
        //agrega y destruye las coins
        this.coins = this.coins.filter(coin => !coin.destroy);
        if(this.coinTimer > this.coinInterval && (!this.gameOver)){
            this.addCoin();
            this.coinTimer=0;
        }else{
            this.coinTimer += deltaTime;
        }
        
        //agrega y destruye enemigos|
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime)
            if(this.checkCollision(this.player,enemy)){
                enemy.destroy = true;
                this.sound.muerte.play();
                this.gameOver = true;
            
            }
         
        
    
           //comprueba si un proyectil hizo contacto con un enemigo y si su vida llega a 0 lo mata
            this.player.projectiles.forEach(projectile =>{
                if(this.checkCollision(projectile,enemy)){
                    if(this.player.powerUp){
                        enemy.lives=enemy.lives-3;      
                        projectile.destroy = true;
                    }else{
                        enemy.lives--;
                        projectile.destroy = true;
                    }
                    
                if(enemy.lives <= 0){
                    enemy.destroy = true; 
                    this.score += enemy.score;
                    this.sound.bichomuerto.play();
                   
                }                    
                }
            })
        });
        
    
        //Agrega enemigos al arreglo
        this.enemies = this.enemies.filter(enemy => !enemy.destroy);
        if(this.enemyTimer > this.enemyInterval && (!this.gameOver)){
            this.sound.music.play();
            this.addEnemy();
            this.enemyTimer=0;
        }else{
            this.enemyTimer+=deltaTime;
        }


    /*if(this.score > this.winScore){
            this.gameOver = true;
        }
*/

    }
    draw(context){
        this.background.draw(context);
        this.player.draw(context);
        this.ui.draw(context);
        this.coins.forEach(coin =>{
            coin.draw(context); 
        })
        this.enemies.forEach(enemy =>{
            enemy.draw(context);
        }); 
        this.background.layer4.draw(context);

      
    }

    //agrega un enemigo al arreglo
    addEnemy(){
        this.enemies.push (new Insecto(this));
    }

    //agrega una coin al arreglo
    addCoin(){
        if(this.coins.length == 0)
        this.coins.push (new Coin(this));
    }

    //comprueba la posicion de las hitbox y si los 2 rectangulos hicieron contacto
    checkCollision(rect1,rect2){
        return(
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y)

    }


}