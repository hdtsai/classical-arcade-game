// current round
let round = 1;
// prototype of both Enemy and Player
class Character{
    constructor(sprite, x, y, speed){
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    update(){};
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
//enemy class
class Enemy extends Character{
    constructor(sprite, x, y, speed){
        super(sprite, x, y, speed);
    }
    update(dt){
        // add with time * speed
        this.x +=  dt * this.speed;
        // if bug is moving out of bound, its location would be reset.
        if(this.x > 500){
            this.x = -30;
            this.y = Math.floor(Math.random() * 200) + 50;
            this.speed = Math.floor(Math.random() * 250) + 80;
        }
        // collision detection
        if (Math.abs(this.x - player.x) <= 40 && Math.abs(this.y - player.y) <= 40){
            player.x = 200;
            player.y = 400;
        }
    }
}

//player class
class Player extends Character{
    constructor(sprite, x, y, speed){
        super(sprite, x, y, speed);
    }
    handleInput(num){
        //if the player reaches the goal, add the round number and add one enemy.
        if(this.y <= 20){
            this.x = 200;
            this.y = 400;
            this.speed += 2;
            round++;
            // show some sentences if reaching round 15
            if (round === 15){
                Swal.fire({
                    title: 'Congratulations!',
                    html:  'You\'ve successfully reached 15 rounds!',
                    type: 'success',
                    allowEscapeKey: true,
                })
            }
            document.querySelector('#round').textContent = round.toString();
            allEnemies.push(new Enemy('images/enemy-bug.png', -30, Math.floor(Math.random() * 200) + 50, Math.floor(Math.random() * 250) + 80));
        }
        //moving with keyboard action.
        if(num === 'up' && this.y >= 20){
            this.y -= this.speed;
        }
        if(num === 'down' && this.y <= 400){
            if(this.y + this.speed > 400){
                this.y = 400;
            }else {
                this.y += this.speed;
            }
        }
        if(num === 'left' && this.x >= 0){
            if(this.x - this.speed < 0){
                this.x = 0;
            }else{
                this.x -= this.speed;
            }
        }
        if(num === 'right' && this.x <= 400){
            if(this.x + this.speed > 400){
                this.x = 400;
            }else{
                this.x += this.speed;
            }
        }
    }

}
// Place all enemy objects in allEnemies
let allEnemies = [];

//initialize enemies
for(let i = 0 ; i < 5 ; i ++){
    allEnemies.push(new Enemy('images/enemy-bug.png', -30, Math.floor(Math.random() * 200) + 50, Math.floor(Math.random() * 250) + 80));
}
// initialize player
const player = new Player('images/char-boy.png', 200, 400, 25);

// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

