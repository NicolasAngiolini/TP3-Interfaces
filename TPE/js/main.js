document.querySelector("#botonRestart").addEventListener('click', function () {
    this.music = document.getElementById('music');
    window.location.reload();
    
});



window.addEventListener("load",function(){
const canvas = this.document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

let game = new Game(canvas.width, canvas.height);


let lastTime = 0;



document.querySelector("#botonEmpezar").addEventListener('click',function(){
    animate(0);
    
});

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0 ,0 , canvas.width,canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if(!game.gameOver)
    requestAnimationFrame(animate);
    
}



});
