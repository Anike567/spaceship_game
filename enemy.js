const getRandomInt = require('./utility/getRandomInt');

class Enemy{
    constructor(){
        this.position = {
            x : getRandomInt(),
            y : 19
        };

        this.health = 5;
    }

    updateHealth(){
        this.health = this.health - 1;
    }

    destroyEnemy(){
        if(this.health > 0){
            return;
        }

    }

}

module.exports = Enemy;