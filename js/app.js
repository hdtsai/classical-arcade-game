// current round
let round = 1;
//enemy class
class Enemy{
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = Math.floor(Math.random() * 200) + 50;
        this.speed =  Math.floor(Math.random() * 250) + 80;
    }
    update(dt){
        // add with time * speed
        this.x +=  dt * this.speed;
        //first round we create 5 enemies, it would increase.
        if (allEnemies.length >= 5){
            clearInterval(startCreating);
        }
        // if bug is moving out of bound, its location would be reset.
        if(this.x > 500){
            this.x = 0;
            this.y = Math.floor(Math.random() * 200) + 50;
            this.speed = Math.floor(Math.random() * 250) + 80;
        }
        // collision detection
        console.log(player.x, player.y,this.x, this.y);

        if (Math.abs(this.x - player.x) <= 15 && Math.abs(this.y - player.y) <= 15){
            player.x = 200;
            player.y = 400;
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//player class
class Player{
    constructor(x= 200, y = 400){
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.movingSpeed = 25;
    }
    update(){}
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(num){
        //if the player reaches the goal, add the round number and add one enemy.
        if(this.y <= 20){
            this.x = 200;
            this.y = 400;
            this.movingSpeed += 2;
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
            allEnemies.push(new Enemy());
        }
        //moving with keyboard action.
        if(num === 'up' && this.y >= 20){
            this.y -= this.movingSpeed;
        }
        if(num === 'down' && this.y <= 400){
            if(this.y + this.movingSpeed > 400){
                this.y = 400;
            }else {
                this.y += this.movingSpeed;
            }
        }
        if(num === 'left' && this.x >= 0){
            if(this.x - this.movingSpeed < 0){
                this.x = 0;
            }else{
                this.x -= this.movingSpeed;
            }
        }
        if(num === 'right' && this.x <= 400){
            if(this.x + this.movingSpeed > 400){
                this.x = 400;
            }else{
                this.x += this.movingSpeed;
            }
        }
    }
}
// Place all enemy objects in allEnemies
let allEnemies = [];

//initialize enemies
let startCreating = setInterval(function(){
    allEnemies.push(new Enemy());
}, 1000);

// initialize player
const player = new Player();

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

