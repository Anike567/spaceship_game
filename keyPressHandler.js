const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data',(key)=>{
    if (key === '\u0003') { // Ctrl + C
        process.exit();
    }
})