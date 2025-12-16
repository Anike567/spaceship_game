class Queue extends Array {
    constructor() {
        super(); // Initializes 'this' as an array
        this.front = 0;
    }

    empty(){
        if (this.front >= this.length) {
            return true;
        }
        return false;
    }

    // Renaming 'pop' to 'dequeue' is standard for Queues
    // to avoid confusion with Array.prototype.pop()
    dequeue() {
        if (this.front >= this.length) {
            return new Error("No element");
        }
        let val = this[this.front];
        this.front++;
        return val;
    }

    // Overriding push to ensure it uses the inherited Array.push
    enqueue(val) {
        super.push(val); 
    }

    print(){
        console.log(this);
    }
}

module.exports = Queue;