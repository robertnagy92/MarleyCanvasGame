let canvas = document.getElementById("game")
let audio = document.getElementsByTagName("audio")
let body = document.getElementById("main")
let ctx = canvas.getContext("2d")

//Background page and emphasis on start game every second
ctx.shadowColor="black";
ctx.shadowBlur=7;
ctx.lineWidth=5;
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.textBaseline="top";
ctx.font = "1.3rem Arial";
ctx.fillText("Marley", canvas.width/2, canvas.height/2);

function shadowInterval(){
    let count = 1000;
    count--;
    if(count % 2 === 1){
    ctx.shadowColor="black";
    ctx.shadowBlur=7;
    ctx.lineWidth=5;
    ctx.font = "1rem Arial";
    ctx.fillStyle = "white"
    ctx.fillText("Press Enter To Start", canvas.width/2, canvas.height/2 + 50);
    }
}

let handle = setInterval(shadowInterval, 1200);
// clearing canvas and setting new background image
function clearCanvas(){
    clearInterval(handle)
    ctx.clearRect(0, 0, 640, 360)
    body.style.backgroundImage = "url('./images/background0.png')"
    Start();
}

// upon pressing Enter game starts
function enterGame(e){
    if(e.keyCode === 13) {
        clearCanvas()
    }
}
document.onkeydown = enterGame;

let score, highscore, player, gravity, gameSpeed;
let obstacles = [];
let keys = {};

class Player {
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.width = width
        this.height = height;
        this.color = color;

        this.directionY = 0; // Jump velocity
        this.jumpForce = 16;
        this.originalHeight = height;
        this.grounded = false;
        this.jumpTimer = 0;
    }

    Animate () {
     //Jump
     if(keys['KeyW'] || keys['ArrowUp']){
        this.Jump();
    } else {
        this.jumpTimer = 0;
    }

    if(keys["KeyS"] || keys["ArrowDown"]){
        this.height = this.originalHeight / 2;
    } else {
        this.height = this.originalHeight
    }

    this.y += this.directionY
     //Gravity
     if(this.y + this.height < canvas.height) {
         this.directionY += gravity;
         this.grounded = false;
     } else {
         this.directionY = 0;
         this.grounded = true;
         this.y = canvas.height - this.height
     }

        this.Draw();
    }

   //Jump height, longer keypress generates more jumpforce
    Jump () {
     if(this.grounded && this.jumpTimer == 0) {
         this.jumpTimer = 1;
         this.directionY =- this.jumpForce;
     } else if (this.jumpTimer > 0 && this.jumpTimer < 16){
         this.jumpTimer++;
         this.directionY =- this.jumpForce - (this.jumpTimer / 50)
     }

     
    }

    Draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.closePath();
    }
}

class Obstacle {
    constructor(x,y,width,height,color){
       this.x = x;
       this.y = y;
       this.width = width;
       this.height = height;
       this.color = color;

       this.directionX = -gameSpeed;
    }

    Update () {
        this.x += this.directionX;
        this.Draw();
        this.directionX = -gameSpeed;
    }

    Draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.closePath();
    }
}
//Game Functions
//Spawn Obstacles
function SpawnObstacle () {
    let size = RandomIntRange(20, 70); // random size of the spawned obstacle
    // console.log(size);
    let type = RandomIntRange(0,1);
    let obstacle = new Obstacle(canvas.width + size, canvas.height - size, size, size, "#2484E4" );

    if(type == 1) {
        obstacle.y -= player.originalHeight - 10;
    }
    obstacles.push(obstacle);
}


function RandomIntRange(min, max) {
    return Math.round(Math.random() * (max - min) + min); //Return a random number in the size variable, between (20, 70)
}
// upon Start draw the player to the canvas
function Start () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.font = "20px sans-serif";

    gameSpeed = 3;
    gravity = 1;

    // score = 0;
    // highscore = 0;

    player = new Player(25, 0, 50, 50, "#FF5858");
    requestAnimationFrame(Update);
}

//Update animation frame & clear canvas upon change
let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update () {

    requestAnimationFrame(Update);
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    spawnTimer--;
    if(spawnTimer <= 0){
        SpawnObstacle();
        console.log(obstacles)
        spawnTimer = initialSpawnTimer - gameSpeed * 8;
    
      if(spawnTimer < 60) {
          spawnTimer = 60;
      }
    }

    //Spawn obstacles
    for(let i = 0; i < obstacles.length; i++){
        let o = obstacles[i]
       
        o.Update();
    }

    player.Animate();
    
}

//Event Listeners
document.addEventListener("keydown", function(event){
    keys[event.code] = true;
})
document.addEventListener("keyup", function(event){
    keys[event.code] = false;
})




