let canvas = document.getElementById("game")
let audio = document.getElementsByTagName("audio")
let body = document.getElementById("main")
let ctx = canvas.getContext("2d")
let auto = document.getElementById('player')
let endScreen = document.getElementById("modal")


//Background page and emphasis on start game every second
function startPage(){
    //Game Title
    ctx.shadowColor="red";
    ctx.shadowBlur=3;
    ctx.lineWidth=3;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline="top";
    ctx.font = "1rem Arial";
    ctx.fillText("Undertale", canvas.width/2, canvas.height/2 + 20);

    //Game press enter font
    let count = 1000;
    count--;
    if(count % 2 === 1){
    ctx.shadowColor="black";
    ctx.shadowBlur=4;
    ctx.lineWidth=4;
    ctx.font = "1rem Arial";
    ctx.fillStyle = "white"
    ctx.fillText("Press Enter To Start", canvas.width/2, canvas.height/2 + 50);
    }
}

let handle = setInterval(startPage, 1200);
// clearing canvas and setting new background image
function clearCanvas(){
    clearInterval(handle);
    ctx.clearRect(0, 0, 640, 360);
    body.style.backgroundImage = "url('./images/background1.gif')"    
}

// upon pressing Enter game clears startpage and starts
function enterGame(e){
    if(e.keyCode === 13) {
        clearCanvas();
        Start();
        auto.volume = 0.05
        auto.play();
    }  
}
document.onkeydown = enterGame;

//Variables
let score, scoreText, highscore, highscoreText, player, gravity, gameSpeed;
let obstacles = [];
let keys = {};

class Player {
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.width = width
        this.height = height;
        this.color = color;

        this.directionY = 0; // Jump velocity, jump speed in a direction
        this.jumpForce = 16;
        this.originalHeight = height;
        this.grounded = false;
        this.jumpTimer = 0;

        this.dog = new Image();
        this.dog.src = './images/dog1.png'

    }

    Animate () {
     //Jump
     if(keys['Space'] || keys['ArrowUp']){
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
     ctx.drawImage(this.dog,this.x,this.y,this.width, this.height)
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
       
       this.cov = new Image();
       this.cov.src = "./images/cov.png"
    }
    Update () {
        this.x += this.directionX;
        this.Draw();
        this.directionX = -gameSpeed;
    }
    Draw () {
         ctx.drawImage(this.cov,this.x, this.y, this.width, this.height)
    }
}

class Obstacle2 {
    constructor(x,y,width,height,color){
       this.x = x;
       this.y = y;
       this.width = width;
       this.height = height;
       this.color = color;
       this.directionX = -gameSpeed;
       
       this.bat = new Image();
       this.bat.src = "./images/bat.png"
    }
    Update () {
        this.x += this.directionX;
        this.Draw();
        this.directionX = -gameSpeed;
    }
    Draw () {
         ctx.drawImage(this.bat,this.x, this.y, this.width, this.height)
    }
}

class Score {
    constructor(score,x,y,alignment,color,size){
        this.score = score;
        this.x = x;
        this.y = y;
        this.alignment = alignment;
        this.color = color;
        this.size = size;
    }
    Draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.font = this.size + "px sans-serif";
        ctx.textAlign = this.alignment;
        ctx.fillText(this.score, this.x, this.y)
        ctx.closePath();
    }
}
class Instructions {
    constructor(text,x,y,alignment, color, size){
    this.text = text;
    this.x = x;
    this.y = y;
    this.alignment = alignment;
    this.color = color;
    this.size = size;
    }
    Draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.font = this.size + "px sans-serif";
        ctx.textAlign = this.alignment;
        ctx.fillText(this.text, this.x, this.y);
        ctx.closePath();
    }
}
//Game Functions
     //Spawn Obstacles
function SpawnObstacle () {
    let size = RandomIntRange(35, 120); // random size of the spawned obstacle
    let type = RandomIntRange(0,2);
  
       
   
    let obstacle = new Obstacle( canvas.width + size, canvas.height - size, size, size, "#FB4D3D");
    let obstacle2 = new Obstacle(canvas.width + size + 400, canvas.height - size, size, size, "#EAC435");
    let obstacle3 = new Obstacle2(canvas.width + size + 800, canvas.height - 250, size, size, "#EAC435");
    if(type == 1) {
        obstacle.y -= player.originalHeight - 10; //Obstacles that can be ducked
    }
    if(type == 2) {
        obstacles.push(obstacle2, obstacle3)
    }
    obstacles.push(obstacle);
}
function RandomIntRange(min, max) {
    return Math.round(Math.random() * (max - min) + min); //Return a random number in the size variable, between (40, 120)
}
// upon Start draw the player and all other features to the canvas
function Start () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.font = "20px sans-serif";
    gameSpeed = 1;
    gravity = 1;
    score = 0;
    highscore = 0;
    if(localStorage.getItem("highscore")){
        highscore = localStorage.getItem("highscore")
    }

    player = new Player(200, 0, 50, 50, "#FF5858");

    scoreText = new Score("Score: " + scoreText, canvas.width - 400, 28, "left", "white","20")

    highscoreText = new Score("Highscore " + highscore, canvas.width - 30, 28, "right", "white", "20");
    
    playInstructions = new Instructions("Jump = UpArrow",canvas.width - 700, 28, "left", "white", "15");

    playInstructions2 = new Instructions("Duck = DownArrow",canvas.width - 700, 53, "left", "white", "15");
    requestAnimationFrame(Update);
}

//Update animation frame & clear canvas upon change
let initialSpawnTimer = 240;
let spawnTimer = initialSpawnTimer;

function Update () {
    requestAnimationFrame(Update);
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    spawnTimer--;
    if(spawnTimer <= 1){
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
    //Collision detection
     if(o.x + o.width < 0){
         obstacles.splice(i,1);
     }    
     
     if(player.x < o.x + o.width && player.x + player.width > o.x && player.y < o.y + o.height && player.y + player.height > o.y){
         obstacles = [];
         score = 0;
         spawnTimer = initialSpawnTimer;
         gameSpeed = 1;
         //Store the highscore in local storage upon collision
         window.localStorage.setItem("highscore", highscore);
         ctx.clearRect(0, 0, 640, 360);
         body.style.backgroundImage = "url('./images/background0.png')"  
         endScreen.style.display = "block";
         
        
     }
       o.Update();
    }

    player.Animate();
    score++;
    scoreText.score = "Score " + score;
    scoreText.Draw();
    
    if(score > highscore) {
        highscore = score;
        highscoreText.score = "Highscore: " + highscore;
    }
    highscoreText.Draw();
    playInstructions.Draw();
    playInstructions2.Draw();

    gameSpeed += 0.003; 
}

//Event Listeners
document.addEventListener("keydown", function(event){
    keys[event.code] = true;
})
document.addEventListener("keyup", function(event){
    keys[event.code] = false;
})
document.getElementById("btn").addEventListener("click", function() {
    clearCanvas();
    gameSpeed = 2;
    Start();
    auto.volume = 0.05;
    endScreen.style.display = "none";
    
  });





