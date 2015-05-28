var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}


//Create canvas with the device resolution.
window.onload = function () {
	var	canvas = createHiDPICanvas(700, 500);
	canvas.id = "canvas";
	canvas.style.marginLeft = window.width/2 + "px";

	document.body.appendChild(canvas);
	var ctx = canvas.getContext("2d");

	var ball = {
   
		x: canvas.width/2,
  		y: canvas.height-30,
  		dx: 1,
  		dy: -1,
  		speed: 3,
  		radius: canvas.height/40,
	  
  		draw:function() {

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
    		if( ball.x + ball.dx < ball.radius || ball.x + ball.dx > canvas.width-ball.radius )
      			ball.dx *= (-1);    
    		   
    
    		ball.x += ( ball.dx * ball.speed);
    		ball.y += ( ball.dy * ball.speed);
  		},

};    
    
	paddle = {    
    
		height: canvas.height/40,   
  		width: canvas.width/5,    
		x: null,    
  		right:false,    
  		left:false,   
    
  		init : function() {   
    		paddle.x = (canvas.width - paddle.width)/2;   
  		},    
    
  		inc:function() {    
    		if(paddle.right && paddle.x < canvas.width-paddle.width)
        		paddle.x += 7;    
   			else if(paddle.left && paddle.x > 0)
        		paddle.x -= 7;
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
   
	bricks = {
		
		rowCount: 10,
		colmnCount: 4,
		height: null,
	  	width: null,
	  	padding: 1,
	  	pos: null,
	  	count: null,

  		init: function() {
			bricks.pos = [];
			bricks.width = canvas.width / bricks.rowCount;
			bricks.height = canvas.height / (bricks.colmnCount*5);
			bricks.count = bricks.colmnCount * bricks.rowCount;

	  		for(c=0; c < bricks.colmnCount; c++) {
  				bricks.pos[c] = [];
  				for(r=0; r < bricks.rowCount; r++ )
  					bricks.pos[c][r] = {x : null, y: null, status: true };
	  		}
  		},

  		draw: function() {
	  		for(c=0; c < bricks.colmnCount; c++) {
  				var y = c*(bricks.height + bricks.padding);

  				for(r=0; r < bricks.rowCount; r++ ) {
	  				if (bricks.pos[c][r].status == true ) {
  						var x = r*(bricks.width+ bricks.padding);

  						bricks.pos[c][r].x = x;
  						bricks.pos[c][r].y = y;

	  					ctx.beginPath();
  						ctx.rect(x, y, bricks.width, bricks.height);
  						ctx.fillStyle = "#841F27";
  						ctx.fill();
  						ctx.closePath();
  					}
  				}
  			}
  			bricks.checkCollison();
  			bricks.checkGame();
  		},

  		checkCollison: function() {
			for(c=0; c < bricks.colmnCount; c++) {
  				for(r=0; r < bricks.rowCount; r++ ) {
	  				var b = bricks.pos[c][r];
  					if(ball.x  > b.x && ball.x < b.x + bricks.width && ball.y > b.y && ball.y < b.y + bricks.height && b.status ) {
  						ball.dy *= (-1);
  						bricks.pos[c][r].status = false;
  						bricks.count --;
  					}	
  				}
  			}
  			console.log(bricks.count);
  		},
  	
  		checkGame: function() {
  			if(bricks.count == 0)
  				gameWon();
  			if(bricks.count < (bricks.colmnCount * bricks.rowCount / 2) )
	  			ball.speed = 4;
  			if(bricks.count < (bricks.colmnCount * bricks.rowCount / 4) )
	  			ball.speed = 5;
	  	}
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
	bricks.init();

	function gameLoop() {

  		ctx.clearRect(0, 0, canvas.width, canvas.height); 
  		ball.draw();
  		paddle.draw();
  		bricks.draw();
	}
	var a = setInterval(gameLoop, 10);

     
	function gameOver() {
  		alert("Game Over");   
  		clearInterval(a);   
	}
	function gameWon() {
		ctx.clearRect( 0 , 0 , canvas.width, canvas.height);
  		alert("You Won");
  		clearInterval(a);
	}
};