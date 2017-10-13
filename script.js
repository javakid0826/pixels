var WIDTH = 900;
var HEIGHT = 900;
var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
var keys = [];
var lastScore = 0;
var bestScore = 0;
var score = 0;
var dead = true;

var player = new Cube(WIDTH, HEIGHT, 0);
var cubeGood = new Cube(WIDTH, HEIGHT, 1);
var cube = new Cube(WIDTH, HEIGHT, 2);
var cube1 = new Cube(WIDTH, HEIGHT, 3);

function start(){
	if(dead){
		player = new Cube(WIDTH, HEIGHT, 0);
		cubeGood = new Cube(WIDTH, HEIGHT, 1);
		cube = new Cube(WIDTH, HEIGHT, 2);
		cube1 = new Cube(WIDTH, HEIGHT, 3);
		dead = false;
	}
}
		
window.addEventListener("keydown", function(e){
	keys[e.keyCode] = true;
}, false);
window.addEventListener("keyup", function(e){
	delete keys[e.keyCode];
}, false);

function update(){
	//calling players built-in move function and built-in boundary check function
	player.mover();
	player.boundCheck();

	//using enemies built-in move function to move them
	cube.mover(player);
	cube.boundCheck();
	cube1.mover(player);
	cube1.boundCheck();

	//check if player and one of the enemies or the player and the goal cube collide
	if(collision(player, cube) || collision(player, cube1)) gameOver();
	if(collision(player, cubeGood)) processGood();
	if(score > bestScore) bestScore = score;
}

function render(){
	//background
	context.fillStyle = 'rgba(00,225,00,0.3)';
	context.fillRect(0, 0, WIDTH, HEIGHT);
	//player
	context.fillStyle = "red";
	context.fillRect(player.x, player.y, player.width, player.height);
	//goal cube
	context.fillStyle = "purple";
	context.fillRect(cubeGood.x, cubeGood.y, cubeGood.width, cubeGood.height);
	//enemies
	context.fillStyle = "blue";
	context.fillRect(cube.x, cube.y, cube.width, cube.height);
	context.fillRect(cube1.x, cube1.y, cube1.width, cube1.height);
	//score
	context.fillStyle = "black";
	context.font = "bold 60px Comic Sans MS";
	context.fillText(score, 10, 60);
}

function collision(first, second){
	return !(first.x > second.x + second.width || first.x + first.width < second.x || first.y > second.y + second.height || first.y + first.height < second.y)
}

function processGood(){
	score++;
	cubeGood.randomizePos();
}

function gameOver(){
	dead = true;
	lastScore = score;
	score = 0;
	context.clearRect(0, 0, WIDTH, HEIGHT);
	context.fillStyle="black";
	context.font="Bold 30px Comic Sans MS";
	context.fillText("You Dead!", WIDTH/2, HEIGHT - 20);
	context.fillText("High Score:" + bestScore, 0, 100);
	context.fillText("Last Score:" + lastScore, 260, 100);
}

setInterval(function(){
	if(!dead){
		update();
		render();
	} else {
		gameOver();
	}
}, 1000/(30))