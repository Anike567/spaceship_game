const Enemy = require("./enemy");
const Gunner = require("./gunner");

const WIDTH = 20;
const HEIGHT = 10;

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");

const gunner = new Gunner();
let enemies = new Map();
let score = 0;

/**
 *  0 → empty
 *  1 → bullet
 *  2 → gunner
 *  3 → enemy
 */

const screen = Array.from({ length: HEIGHT }, () =>
    Array(WIDTH).fill(0)
);

/* -------------------- INPUT -------------------- */

stdin.on("data", (key) => {
    switch (key) {
        case "\u001b[A": gunner.updatePosition("up"); break;
        case "\u001b[B": gunner.updatePosition("down"); break;
        case "\u001b[C": gunner.updatePosition("right"); break;
        case "\u001b[D": gunner.updatePosition("left"); break;
        case "\u0003": process.exit();
    }
});

/* -------------------- COLLISION -------------------- */

function detectCollision() {
    // bullet vs enemy
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH - 1; j++) {
            if (screen[i][j] === 1 && screen[i][j + 1] === 3) {
                screen[i][j] = 0;
                screen[i][j+1] = 0;
                score++;
            }
        }
    }

    // enemy vs gunner
    for (const [en] of enemies) {
        const { x, y } = en.position;
        if (x === gunner.position.x && y === gunner.position.y) {

            gunner.updateHealth();
            enemies.delete(en);
        }
    }
}

/* -------------------- SCREEN UTILS -------------------- */

function clearAndResetCursor() {
    console.clear();
    process.stdout.write("\x1b[2J");
    process.stdout.write("\x1b[0f");
}

/* -------------------- UPDATE SCREEN -------------------- */

function updateTheScreen() {
    // move bullets + clear enemies
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = WIDTH - 1; j >= 0; j--) {
            if (screen[i][j] === 1) {
                if (j + 1 < WIDTH) screen[i][j + 1] = 1;
                screen[i][j] = 0;
            }
            if (screen[i][j] === 3) {
                screen[i][j] = 0;
            }
        }
    }

    // move enemies
    for (const [en] of enemies) {
        if (!en.route.empty()) {
            const [x, y] = en.route.dequeue();
            en.position.x = x;
            en.position.y = y;
            screen[x][y] = 3;
        } else {
            enemies.delete(en);
        }
    }
}

/* -------------------- BULLETS -------------------- */

function fireBullets() {
    const x = gunner.position.x;
    const y = gunner.position.y + 1;
    if (y < WIDTH) screen[x][y] = 1;
}

/* -------------------- RENDER -------------------- */

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
    output += `\nScore: ${score}  Health: ${gunner.getHealth()}`;
    clearAndResetCursor();
    process.stdout.write(output);
}

/* -------------------- GAME LOOP -------------------- */

setInterval(() => {
    if (gunner.getHealth() > 0) {
        updateTheScreen();
        detectCollision();
        screen[gunner.position.x][gunner.position.y] = 2;
        
        rerender();
    } else {
        clearAndResetCursor();
        console.log("GAME OVER");
        console.log("Final Score:", score);
        process.exit();
    }
}, 100);

/* -------------------- ENEMY SPAWN -------------------- */

setInterval(() => {
    const enemy = new Enemy(gunner.position);
    enemies.set(enemy, enemy);
    screen[enemy.position.x][enemy.position.y] = 3;
    fireBullets();
}, 400);
