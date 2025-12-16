const getRandomInt = require('./utility/getRandomInt');
const Gunner = require('./gunner');
const Queue = require('./queue');

class Enemy {
    constructor(gunnerPosition) {
        this.position = {
            x: getRandomInt(),
            y: 19
        };
        this.route = this.generateRoute(gunnerPosition);
        this.health = 5;
        // this.route.print();

    }
    generateRoute(gunnerPosition) {
        const gx = gunnerPosition.x;
        const gy = gunnerPosition.y;
        const ex = this.position.x;
        const ey = this.position.y;

        const q = new Queue();
        const visited = new Set();
        const parentMap = new Map(); // Stores childKey -> parentCoord

        const startKey = `${ex},${ey}`;
        q.enqueue([ex, ey]);
        visited.add(startKey);

        let foundTarget = null;
        const dirs = [[0, -1], [1, 0], [-1, 0], [0, 1]];

        // 1. Breadth-First Search to find the goal
        while (!q.empty()) {
            const [currX, currY] = q.dequeue();

            if (currX === gx && currY === gy) {
                foundTarget = [currX, currY];
                break;
            }

            for (const [dx, dy] of dirs) {
                const nextX = currX + dx;
                const nextY = currY + dy;
                const nextKey = `${nextX},${nextY}`;

                // Boundary and visited check
                if (nextX >= 0 && nextX < 20 && nextY >= 0 && nextY < 20 && !visited.has(nextKey)) {
                    visited.add(nextKey);
                    parentMap.set(nextKey, [currX, currY]); 
                    q.enqueue([nextX, nextY]);
                }
            }
        }


        const shortestRoute = new Queue();
        if (foundTarget) {
            let curr = foundTarget;
            const tempPath = [];

            while (curr) {
                tempPath.push(curr);
                const currKey = `${curr[0]},${curr[1]}`;
                curr = parentMap.get(currKey); // Move to parent
            }

            // reverse it to go from Start -> End
            tempPath.reverse().forEach(coord => shortestRoute.enqueue(coord));
        }

        return shortestRoute;
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