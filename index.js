const Gunner = require("./gunner");

const WIDTH = 20;
const HEIGHT = 20;
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
const gunner = new Gunner();


stdin.on('data', (key) => {

    switch (key) {
        case '\u001b[A': // up
            gunner.updatePosition("up");
            screen[gunner.position.x][gunner.position.y] = 1;
            break;
        case '\u001b[B': // down
            gunner.updatePosition("down");
            screen[gunner.position.x][gunner.position.y] = 1;
            break;
        case '\u001b[C': // right
            gunner.updatePosition("right");
            gunner.position
            break;
        case '\u001b[D': // left
            gunner.updatePosition("left");
            screen[gunner.position.x][gunner.position.y] = 1;
            break;
        case '\u0003':
            process.exit();

        
    }
});

const screen = Array.from({ length: HEIGHT }, () =>
    Array(WIDTH).fill(0)
);



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
                if(j+1 < WIDTH) {
                    screen[i][j + 1] = 1;
                }
                screen[i][j] = 0;
                break;
            }
        }
    }
}

function fireBullets(){
    screen[gunner.position.x ][gunner.position.y + 1] = 1;
}

function rerender() {
    let output = "";

    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            if(screen[i][j] === 2){
                output += screen[i][j] = "A";
            }
            else{
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
