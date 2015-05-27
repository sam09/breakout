
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

var ball = {
   
  x: canvas.width/2,
  y: canvas.height-30,
  dx: 2,
  dy: -2,    
  radius: 10,
  
  draw:function() {

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.beginPath();
    ctx.arc( ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    ball.inc();
  },
  
  inc:function() {

    //Roof
    if( ball.y + ball.dy < ball.radius ) {
      ball.dy *= (-1);
    }

    if ( ball.y + ball.dy > canvas.height -ball.radius-paddle.height) {   
            
      if (ball.x > paddle.x && ball.x < paddle.x+paddle.width) { //ball hit the paddle    
              
        if(ball.x > paddle.x + 3*paddle.width/4 && ball.dx < 0)   
          ball.dx *= (-1);    
        else if (ball.x < paddle.x + paddle.width/4 && ball.dx > 0)   
          ball.dx *= (-1);    

        ball.dy *= (-1);
      }
      else if(ball.y + ball.dy > canvas.height + ball.radius)   
        gameOver();   
    }   
    //Bouncing Of Walls   
    if( ball.x + ball.dx < ball.radius || ball.x + ball.dx > canvas.width-ball.radius ) {   
      ball.dx *= (-1);    
    }   
    
    ball.x += ball.dx;   
    ball.y += ball.dy;
  },

};    
    
paddle = {    
    
  height: 10,   
  width: 75,    
  x: null,    
  right:false,    
  left:false,   
    
  init : function() {   
    paddle.x = (canvas.width - paddle.width)/2;   
  },    
    
  inc:function() {    
    if(paddle.right && paddle.x < canvas.width-paddle.width) {  
        paddle.x += 7;    
    }
   else if(paddle.left && paddle.x > 0) {   
        paddle.x -= 7;    
    }   
  },

  draw:function() {   
    ctx.beginPath();    
    ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);   
    ctx.fillStyle = "#0095DD";    
    ctx.fill();   
    ctx.closePath();    
    paddle.inc();   
  },    
    
};    
    
document.addEventListener("keydown", keyDownHandler, false);    
document.addEventListener("keyup", keyUpHandler, false);    
    
function keyDownHandler(e) {    
    
  if(e.keyCode == 65)   
    paddle.left = true;   
  else if(e.keyCode == 68)    
    paddle.right = true;    
}   
    
function keyUpHandler(e) {   
  if(e.keyCode == 65)   
    paddle.left = false;    
  else if(e.keyCode == 68)    
    paddle.right = false;   
}

paddle.init();    
     
function gameLoop() {
  ball.draw();
  paddle.draw();
}
var a = setInterval(gameLoop, 10);

     
function gameOver() {
  alert("Game Over");   
  clearInterval(a);   
}     