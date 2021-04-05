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

let handle = setInterval(shadowInterval, 1300);
// clearing canvas and setting new background image
function clearCanvas(){
    clearInterval(handle)
    ctx.clearRect(0, 0, 640, 360)
    body.style.backgroundImage = "url('./images/background0.png')"

}

// upon pressing Enter game starts
function move(e){
    if(e.keyCode === 13) {
        clearCanvas()
    }
}
document.onkeydown = move;





