class Gunner {
    constructor() {
        this.maxHealth = 10;
        this.remainingHealth = this.maxHealth;
        this.position = { x: 0, y: 0 };

        this.keyMap = {
            up: [-1, 0],
            down: [1, 0],
            left: [0, -1],
            right: [0, 1]
        };
    }

    getShooted() {
        this.remainingHealth = Math.max(0, this.remainingHealth - 1);
    }

    updatePosition(pressedKey) {
        const direction = this.keyMap[pressedKey];
        if (!direction) return; 

        this.position = {
            x: this.position.x + direction[0],
            y: this.position.y + direction[1]
        };

        if(this.position.x < 0){
            this.position.x = 0;
        }
        if(this.position.x > 19){
            this.position.x = 19;
        }

        if(this.position.y < 0){
            this.position.x = 0;
        }
        if(this.position.y > 19){
            this.position.x = 19;
        }
    }
}

module.exports = Gunner;
