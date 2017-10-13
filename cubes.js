function Cube(WIDTH, HEIGHT, state){
  var enemyIncrement = WIDTH/2;
  var SPEED = 20;
  //checks if state is equal to zero (meaning it is a player)
  if(state == 0){
    this.x = WIDTH/2;
    this.y = HEIGHT - 20;
    this.width = 20;
    this.height = 20;
      //player move function
    this.mover = function(){
        if(keys[38] || keys[87]) this.y-=SPEED;
        if(keys[40] || keys[83]) this.y+=SPEED;
        if(keys[37] || keys[65]) this.x-=SPEED;
        if(keys[39] || keys[68]) this.x+=SPEED;
    }
      //player boundary checker
    this.boundCheck = function(){
        if(this.x < 0) this.x = 0;
        if(this.y < 0) this.y = 0;
        if(this.x >= WIDTH-this.width) this.x = WIDTH - this.width;
        if(this.y >= HEIGHT-this.height) this.y = HEIGHT - this.height;
    }
  }
  //state equaling 1 means goal cube
  if(state == 1){
    this.height = 40;
    this.width = 40;
      //function to randomize the position of the goal cube
    this.randomizePos = function(){
        this.x = Math.random() * (WIDTH - 40);
        this.y = Math.random() * (HEIGHT - 40);
    }
  }
  //and finally, this checks if it is an enemy (2, 3, or 4)
  if(state == 2 || state == 3 || state == 4){
    this.x = enemyIncrement * (state - 2);
    this.y = 20;
    this.height = 20;
    this.width = 20;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    //move function for enemies
    this.mover = function(player){
        var dx = player.x - this.x;
        var dy = player.y - this.y;
        this.ax = dx/25;
        this.ay = dy/25;
        this.vx+= this.ax;
        this.vy+= this.ay;
        this.x+= this.vx;
        this.y+= this.vy;
    }
      //enemy boundary check
    this.boundCheck = function(){
        if(this.x < 0) this.x = 0;
        if(this.y < 0) this.y = 0;
        if(this.x >= WIDTH-this.width) this.x = WIDTH - this.width;
        if(this.y >= HEIGHT-this.height) this.y = HEIGHT - this.height;
    }
  }
}
