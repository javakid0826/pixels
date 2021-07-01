const WIDTH = 800;
const HEIGHT = 800;

const canv = document.createElement("canvas");
canv.width = WIDTH;
canv.height = HEIGHT;
const context = canv.getContext("2d");

/** Array of currently held keys, indexed by their KeyboardEvent.code */
const keys = [];

/** The best score achieved on each difficulty */
const bestScores = [0, 0, 0];

/** The current score */
let score = 0;

/** Whether or not the player is currently dead */
let dead = true;

/** Toggle for "draw mode" where it doesn't clear the screen */
let draw = false;

/** The current difficulty */
let diff = 0;

/**
 * @type {Player}
 * The player
 */
let player;

/**
 * @type {Food}
 * The goal
 */
let cubeGood;

/**
 * @type {Enemy[]}
 * The array containing all the enemies
 */
let enemies = [];

/** The current color of the background */
let bgCol;

const drawToggle = () => draw = !draw;

const difficulty = level => {
	if (dead) {
		// Spawn a different amount of enemies based on difficulty
		switch(level) {
			case 0:
				enemies = [new Enemy(0, level)];
				bgCol = "#00FF00";
				break;
			case 1:
				enemies = [new Enemy(0, level), new Enemy(1, level)];
				bgCol = "#FF8000";
				break;
			case 2:
				enemies = [new Enemy(0, level), new Enemy(1, level), new Enemy(2, level)];
				bgCol = "#FF0000";
				break;
		}

		player = new Player(0);
		cubeGood = new Food(1);
		cubeGood.randomizePos();
		diff = level;
		dead = false;
		score = 0;
	}
}

// The buttons for the different difficulties
const easyBtn = document.createElement("button");
easyBtn.onclick = () => difficulty(0);
easyBtn.innerText = "Easy";
const normalBtn = document.createElement("button");
normalBtn.onclick = () => difficulty(1);
normalBtn.innerText = "Normal";
const hardBtn = document.createElement("button");
hardBtn.onclick = () => difficulty(2);
hardBtn.innerText = "Hard";

// Keyboard events
window.addEventListener("keydown", evt => {
	keys[evt.code] = true;
}, false);
window.addEventListener("keyup", evt => {
	delete keys[evt.code];
}, false);

// The main update function
const update = () => {
	// Update the player
	player.update();

	// Update the enemies
	for (const enem of enemies) enem.update(player);

	if (!draw) {
		// Kill the player if they collide with any enemies
		for (const enem of enemies) {
			if (collision(player, enem)) dead = true;
		}

		// Reward the player if they collide with the food
		if (collision(player, cubeGood)) processGood();

		// If your current score is better than your best then change the best score
		if(score > bestScores[diff]) bestScores[diff] = score;
	}
}

// The main drawing function
const render = () => {
	// Only draw the background if the toggle is off
	if (!draw) {
		context.fillStyle = bgCol;
		context.fillRect(0, 0, WIDTH, HEIGHT);
	}

	// Draw the player
	context.fillStyle = "black";
	context.fillRect(player.x, player.y, player.width, player.height);

	// Draw the food
	context.fillStyle = "purple";
	context.fillRect(cubeGood.x, cubeGood.y, cubeGood.width, cubeGood.height);

	// Draw the enemies
	context.fillStyle = "blue";
	for (const enem of enemies) {
		context.fillRect(enem.x, enem.y, enem.width, enem.height);
	}

	// Draw the current score
	context.fillStyle = "black";
	context.font = "bold 60px Comic Sans MS";
	context.fillText(score, 10, 60);
}

/** If the player got the food */
const processGood = () => {
	score++;
	cubeGood.randomizePos();
}

const gameOver = () => {
	dead = true;
	context.clearRect(0, 0, WIDTH, HEIGHT);
	context.fillStyle = "black";
	context.font = "Bold 30px Comic Sans MS";
	context.fillText("You Dead!", WIDTH / 2, HEIGHT - 20);
	context.fillText("High Score: " + bestScores[diff], 0, 100);
	context.fillText("Last Score: " + score, 260, 100);
}

// Main loop
setInterval(() => {
	if (!dead) {
		update();
		render();
	} else {
		gameOver();
	}
}, 1000 / 60);

const body = document.getElementsByTagName("body")[0];
body.appendChild(canv);
body.appendChild(document.createElement("br"));
body.appendChild(easyBtn);
body.appendChild(normalBtn);
body.appendChild(hardBtn);