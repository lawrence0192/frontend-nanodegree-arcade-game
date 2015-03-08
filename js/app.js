// Draw the enemy and player objects on the screen
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Reset the game
Object.prototype.reset = function() {
  player.x = 200;
  player.y = 380;
}

// Enemies our player must avoid
var Enemy = function(x,y) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //x and y coordinates and movement speed
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
Enemy.prototype.update = function(dt) {
    if(this.x <= 550){
        this.x += this.speed * dt;
    }else{
        this.x = -2;
    }

    //Reset game if the enemy and the player are in the same location
    if(player.x >= this.x - 30 && player.x <= this.x + 30){
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            this.reset();
        }
    }
}
// Player class and initial x and y coordinates
var Player = function(){
    this.sprite = 'image/char-boy.png';
    this.x = 200;
    this.y = 380;
}

//Update player position
Player.prototype.update = function(){
    if(this.ctlKey === 'left' && this.x > 0){ 
        this.x = this.x - 50;
    }else if(this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 50;
    }else if(this.ctlKey === 'up'){
        this.y = this.y - 50;
    }else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 50;
    }
    this.ctlKey = null;
    
    //Reset game once player reaches water
    if(this.y < 25){
        this.reset();
    }
}


//Input handler for player
Player.prototype.handleInput = function(e){
    this.ctlKey = e;    
}


// Instantiate enemies and player objects
var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 100));
    allEnemies.push(new Enemy(-2,150));
    allEnemies.push(new Enemy(-2,220));
}());

var player = new Player(); 


// listens for key presses and sends the keys to 
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
