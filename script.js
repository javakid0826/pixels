//document.getElementById("width")
//document.getElementById("height")
var tryAgain=false;
function tryagain(){
        tryAgain=true;
}
function eatThemUp(){ 
	var scoreArray=[], timeArray=[], time=0, bestTime=0, tries;
	var highScore=0, lastScore;
	var collisIS;
	var enemySpeed = 3.333, speed = 15;
	var canvas = document.getElementById("mainCanvas");
	//canvas.width=WIDTH;
	//canvas.height=HEIGHT;
	var context = canvas.getContext("2d");
	var keys = [];
	var WIDTH = 700, HEIGHT = 700;
	var player = {
		width: 20,
		height: 20,
		x: (WIDTH - 20) /2,
		y: (HEIGHT - 20) /2
	}
	var repul = 1;
	var gravity = 0.1;
	var dampening = 2;
	var cube = {
		x: 20,
		y: 20,
		width: 20,
		height: 20,
		vy: 0,
		vx: 0
	}
	var cube1 = {
		x: 20,
		y: 20,
		width: 20,
		height: 20,
		vx: 0,
		vy: 0
	}
	var cubeGood = {
		x: Math.random() * (WIDTH - 50),
		y: Math.random() * (HEIGHT - 50),
		width: 50,
		height: 50,
	//	vx: 0
    }
	var score = 0;
	window.addEventListener("keydown", function(e){
		keys[e.keyCode] = true;
	}, false);
	window.addEventListener("keyup", function(e){
		delete keys[e.keyCode];
	}, false);

	function game(){
		update();
		render();
	}
	function update(){
		if(keys[38] || keys[87]) player.y-=speed;
		if(keys[40] || keys[83]) player.y+=speed;
		if(keys[37] || keys[65]) player.x-=speed;
		if(keys[39] || keys[68]) player.x+=speed;
		if(player.x < 0) player.x = 0;
		if(player.y < 0) player.y = 0;
		if(player.x >= WIDTH-player.width) player.x = HEIGHT-player.x;
		if(player.y >= HEIGHT-player.height) player.y = WIDTH-player.y;
		var dx = player.x - cube.x,
			dy = player.y - cube.y;
		cube.vx+= dx / 30;
		cube.vy+= dy / 60;
		cube.y+= cube.vy;
		cube.x+= cube.vx;
		var dx1 = player.x - cube1.x,
			dy1 = player.y - cube1.y;
		cube1.vx+= dx1 / 60;
		cube1.vy+= dy1 / 30;
		cube1.y+= cube1.vy;
		cube1.x+= cube1.vx;
		if(cube.x < 0) cube.vx = -Math.abs(cube.vx) / 5;
		if(cube.y < 0) cube.vy = -Math.abs(cube.vy) / 5;
		if(cube.x >= WIDTH-cube.width) cube.vx = -Math.abs(cube.vx) / 5;
		if(cube.y >= HEIGHT-cube.height) cube.vy = -Math.abs(cube.vy) / 5;
		if(cube1.x < 0) cube1.vx = -Math.abs(cube1.vx) / 5;
		if(cube1.y < 0) cube1.vy = -Math.abs(cube1.vy) / 5;
		if(cube1.x >= WIDTH-cube.width) cube1.vx = -Math.abs(cube1.vx) / 5;
		if(cube1.y >= HEIGHT-cube.height) cube1.vy = -Math.abs(cube1.vy) / 5;
        collis(player, cube);
        collis(player, cube1);
        if(score>highScore)highScore=score;
		if(collision(player, cubeGood)) processGood();
		if(collisX(cube, cube1)){
			cube.vx = -(Math.abs(cube.vx)*10);
			cube1.vx = -(Math.abs(cube1.vx)*10);
		}
		if(collisY(cube, cube1)){
			cube.vy = -(Math.abs(cube.vy)*10);
			cube1.vy = -(Math.abs(cube1.vy)*10);
		}
        scoreArray[tries]=score;
        timeArray[tries]=time/100;
        if((time/100)>bestTime)bestTime=time/100;
		
	}
	function render(){
		context.fillStyle = 'rgba(00,225,00,0.3)';
		context.fillRect(0, 0, WIDTH, HEIGHT);
		//context.clearRect(0, 0, WIDTH, HEIGHT)
		context.fillStyle = "red";
		context.fillRect(player.x, player.y, player.width, player.height);
		context.fillStyle = "blue";
		context.fillRect(cube.x, cube.y, cube.width, cube.height);
		context.fillStyle = "blue";
		context.fillRect(cube1.x, cube1.y, cube1.width, cube1.height);
		context.fillStyle = "black";
		context.font = "bold 60px Comic Sans MS";
        context.fillText(time/100, 10, 360);
		context.fillText(score, 10, 60);
		context.fillStyle = "red";
		context.fillRect(cubeGood.x, cubeGood.y, cubeGood.width, cubeGood.height);
	}
	function collision(first, second){
		return !(first.x > second.x + second.width || first.x + first.width < second.x || first.y > second.y + second.height || first.y + first.height < second.y)
	}
	function collis(first, second){
        if((first.y < second.y + 19 && first.y > second.y - 19) && (first.x < second.x + 19 && first.x > second.x - 19)){
            collisIS = true
        }
    }
    function collisY(first, second){
        if((first.y < second.y + 19 || first.y + 19 > second.y) && (first.x < second.x + 19 && first.x > second.x + 19)){
            return true;
        }
    }
    function collisX(first, second){
        if((first.x < second.x + 19 || first.x + 19 > second.x) && (first.y < second.y + 19 && first.y > second.y + 19)){
            return true;
        }
    }
	cube1.y = Math.random() * (HEIGHT - 10);
        var cdx = cube.x - cube1.x,
	cdy = cube.y - cube1.y,
	cd = Math.sqrt(cdy*cdy + cdx*cdx),
	cux = cdx / cd,
	cuy = cdy / cd;
	function enemyRepulsion(a, b){
			var cdx = b.x - a.x,
				cdy = b.y - a.y,
				cd = Math.sqrt(cdy*cdy + cdx*cdx),
				cux = cdx / cd,
				cuy = cdy / cd;
			if(cd < 50){
				a.vx -= cux * 10;
				a.vy -= cuy * 10;
				b.vx += cux * 10;
				b.vy += cuy * 10;
				console.log("www");
			}
	}
	function processGood(){
		score++;
		cubeGood.x = Math.random() * (WIDTH - 50);
		cubeGood.y = Math.random() * (HEIGHT - 50);
	}
	setInterval(function(){
        if(!collisIS){
            game()
        }
        else if(tryAgain){
            context.clearRect(WIDTH, HEIGHT, 0, 0);
            collisIS=false;
            tryAgain=false;
            lastScore=Math.abs(score);
            score=0;
            player.x=(WIDTH-10)/2;
            player.y=HEIGHT-30;
            cube1.x=500/4;
            cube.x=(500/4)*3;
            cube1.y=cube.y=20;
            time=0;
        }
		else{
			context.clearRect(0, 0, WIDTH, HEIGHT);
            context.fillStyle="black";
            context.font=" 30px Comic Sans MS";
			context.fillText("You Dead!", 170, 400);
            context.fillText("High Score:" + highScore, 0, 100);
            context.fillText("Last Score:" + scoreArray[tries], 260, 100);
            context.fillText("Best Time:" + bestTime, 0, 200);
            context.fillText("Last Time:" +timeArray[tries], 260, 200);
		}
	}, 1000/(30))
    setInterval(function(){
       time++; 
    }, 10)
}
