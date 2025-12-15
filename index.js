const Enemy = require("./enemy");
const Gunner = require("./gunner");

const WIDTH = 20;
const HEIGHT = 10;
const ENEMY = 3;
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
const gunner = new Gunner();
let score = 0;


stdin.on('data', (key) => {

    switch (key) {
        case '\u001b[A': // up
            gunner.updatePosition("up");
            break;
        case '\u001b[B': // down
            gunner.updatePosition("down");
            break;
        case '\u001b[C': // right
            gunner.updatePosition("right");
            break;
        case '\u001b[D': // left
            gunner.updatePosition("left");
            break;
        case '\u0003':
            process.exit();
    }
});

const screen = Array.from({ length: HEIGHT }, () =>
    Array(WIDTH).fill(0)
);

function detectCollision(){
    
}


function clearAndResetCursor() {
    console.clear();
    process.stdout.write("\x1b[2J");
    process.stdout.write("\x1b[0f");
}

// move bullets to the right

function updateTheScreen() {
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = WIDTH; j >= 0; j--) {
            if (screen[i][j] === 1) {
                if (j + 1 < WIDTH) {
                    screen[i][j + 1] = 1;
                }
                screen[i][j] = 0;

            }
        }
    }

    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            if (screen[i][j] === ENEMY) {
                screen[i][j] = 0;
                if (j - 1 >= 0) screen[i][j - 1] = ENEMY;
            }
        }
    }

    console.log(score);
}

function fireBullets() {
    screen[gunner.position.x][gunner.position.y + 1] = 1;
}

function rerender() {
    let output = "";

    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            if (screen[i][j] === 2) {
                output += screen[i][j] = "A";
            }
            if (screen[i][j] === 3) {
                output += ")";
            }
            else {
                output += screen[i][j] === 1 ? "-" : ".";
            }

        }
        output += "\n";
    }

    clearAndResetCursor();
    process.stdout.write(output);
}


/**
 *  1 is bullet position in 2D matrix
 *  2 is gunner position in matrix
 *  3 is enemy position in matrix
 */

setInterval(() => {
    updateTheScreen();
    screen[gunner.position.x][gunner.position.y] = 2;
    fireBullets();
    rerender();
}, 100);

setInterval(() => {
    let enemy = new Enemy();
    enemy.nextPoint(gunner);
    screen[enemy.position.x][enemy.position.y] = 3;
}, 200)