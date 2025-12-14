class Gunner {
    constructor(width = 20, height = 20) {
        this.maxHealth = 10;
        this.remainingHealth = this.maxHealth;
        this.position = { x: 0, y: 0 };

        this.width = width;
        this.height = height;

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

        this.position.x += direction[0];
        this.position.y += direction[1];

        // clamp X
        this.position.x = Math.max(0, Math.min(this.position.x, this.height - 1));

        // clamp Y
        this.position.y = Math.max(0, Math.min(this.position.y, this.width - 1));
    }
}

module.exports = Gunner;
