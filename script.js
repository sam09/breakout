var c = document.getElementById("canvas"); //$("#canvas")[0];
var ctx = c.getContext("2d");

var grid = {

	height: c.height/4,
	width: c.width,
	color: "red",
	positions : [],
	brickHeight: null,
	brickWidth: null,
    margin: null,

    init: function() {
    	
    	grid.brickHeight = grid.height/4;
    	grid.brickWidth = grid.width/4;
    	grid.margin = grid.brickWidth/80;
    	for(var i = 0; i <= grid.height; i = i + grid.brickHeight ) {
    		for( var j = 0; j <= grid.width; j = j + grid.brickWidth ) {
    			ctx.beginPath();
    			ctx.fillStyle = grid.color;
    			ctx.rect( j , i , grid.brickWidth, grid.brickHeight);
    			ctx.fill();
    			j += grid.margin;
    		}
    		i += grid.margin;
    	}
    }
}

grid.init();
/* Game Loop
var requestAnimationFrame =  window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame;

function loop() {
    
  }
  setTimeout(function() {
    requestAnimationFrame(loop);
  }, 1000 / game.fps);
};

requestAnimationFrame(loop);*/