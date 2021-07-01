/** The acceleration */
const ACC = 5;

class Cube {
	constructor() {
		this.speed = 10;
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.width = 20;
		this.height = 20;

		this.boundCheck = () => {
			const vel = simpleLimit2D({x: this.vx, y: this.vy}, this.speed);
			this.vx = vel.x;
			this.vy = vel.y;

			if (this.x < 0) {
				this.x = 0;
				this.vx = 0;
			}
			if (this.y < 0) {
				this.y = 0;
				this.vy = 0;
			}
			if (this.x > WIDTH - this.width) {
				this.x = WIDTH - this.width;
				this.vx = 0;
			}
			if (this.y > HEIGHT - this.height) {
				this.y = HEIGHT - this.height;
				this.vy = 0;
			}
		};
	}
}

class Player extends Cube {
	constructor() {
		super();
		
		this.x = WIDTH / 2;
		this.y = HEIGHT - 20;

		this.mover = () => {
			if (keys["ArrowUp"] || keys["KeyW"]) this.vy -= ACC;
			if (keys["ArrowDown"] || keys["KeyS"]) this.vy += ACC;
			if (keys["ArrowLeft"] || keys["KeyA"]) this.vx -= ACC;
			if (keys["ArrowRight"] || keys["KeyD"]) this.vx += ACC;

			this.x += this.vx;
			this.y += this.vy;
			this.vx *= 0.9;
			this.vy *= 0.9;
		};

		this.update = () => {
			this.mover();
			this.boundCheck();
		};
	}
}

class Food extends Cube {
	constructor() {
		super();
		
		this.height = 40;
		this.width = 40;
		this.randomizePos = () => {
			this.x = Math.random() * (WIDTH - 40);
			this.y = Math.random() * (HEIGHT - 40);
		};
	}
}

class Enemy extends Cube {
	constructor(enemNum, diff) {
		super();

		const enemyIncrement = (WIDTH - 40) / 2;
		this.speedup = 1;
		this.speed *= 0.9;
		this.x = enemyIncrement * enemNum;
		this.y = 20;
		this.diff = enemNum;
		this.divisor;

		if (diff === 0) this.divisor = 100;
		if (diff === 1) this.divisor = 50;
		if (diff === 2) this.divisor = 25;

		this.mover = player => {
			const dx = player.x - this.x;
			const dy = player.y - this.y;

			this.vx += dx / this.divisor * this.speedup;
			this.vy += dy / this.divisor * this.speedup;
			this.x += this.vx;
			this.y += this.vy;
		};

		this.update = player => {
			this.mover(player);
			this.boundCheck();
			this.speedup *= 1.001;
		}
	}
}