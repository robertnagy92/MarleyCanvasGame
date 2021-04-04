let canvas = document.getElementById("game")
let ctx = canvas.getContext("2d")


//Background page 
ctx.font = "1.3rem Arial";
ctx.shadowColor="black";
ctx.shadowBlur=7;
ctx.lineWidth=5;
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.textBaseline="top";
ctx.fillText("Marley", canvas.width/2, canvas.height/2);
ctx.font = "1rem Arial";
ctx.fillText("Press Enter To Start", canvas.width/2, canvas.height/2 + 50);