const getRandomInt = require('./utility/getRandomInt');
const Gunner = require('./gunner');
const Queue = require('./queue');

class Enemy {
    constructor(gunnerPosition) {
        this.position = {
            x: getRandomInt(),
            y: 19
        };

        this.health = 5;
        this.route = this.generateRoute(gunnerPosition);
    }

    generateRoute(gunnerPosition) {
        const gx = gunnerPosition.x;
        const gy = gunnerPosition.y;

        let ex = this.position.x;
        let ey = this.position.y;

        const shortestRoute = new Queue();

        // Move in X direction
        if (gx < ex) {
            while (ex !== gx) {
                ex--;
                shortestRoute.enqueue([ex, ey]);
            }
        } else {
            while (ex !== gx) {
                ex++;
                shortestRoute.enqueue([ex, ey]);
            }
        }

        // Move in Y direction
        if (gy < ey) {
            while (ey !== gy) {
                ey--;
                shortestRoute.enqueue([ex, ey]);
            }
        } else {
            while (ey !== gy) {
                ey++;
                shortestRoute.enqueue([ex, ey]);
            }
        }

        return shortestRoute;
    }

    updateHealth() {
        this.health--;
    }

    destroyEnemy() {
        return this.health <= 0;
    }
}

function main() {
    let gunner = new Gunner();
    let enemy = new Enemy(gunner.position);

    enemy.route.print();
}

module.exports = Enemy;
