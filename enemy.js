const getRandomInt = require('./utility/getRandomInt');

class Enemy {
    constructor() {
        this.position = {
            x: getRandomInt(),
            y: 19
        };

        this.health = 5;
    }
    nextPoint(gunner) {
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        const visited = Array.from({ length: 20 }, () => Array(20).fill(false));
        const queue = [];

        queue.push({ ...this.position, path: [] });
        visited[this.position.y][this.position.x] = true;

        while (queue.length) {
            const cur = queue.shift();

            if (cur.x === gunner.position.x && cur.y === gunner.position.y) {
                const [nx, ny] = cur.path[0];
                this.position.x = nx;
                this.position.y = ny;
                return;
            }

            for (const [dx, dy] of dirs) {
                const nx = cur.x + dx;
                const ny = cur.y + dy;

                if (
                    nx >= 0 && nx < 20 &&
                    ny >= 0 && ny < 20 &&
                    !visited[ny][nx]
                ) {
                    visited[ny][nx] = true;
                    queue.push({
                        x: nx,
                        y: ny,
                        path: cur.path.length ? cur.path : [[nx, ny]]
                    });
                }
            }
        }
    }

    updateHealth() {
        this.health = this.health - 1;
    }

    destroyEnemy() {
        if (this.health > 0) {
            return;
        }

    }

}

module.exports = Enemy;