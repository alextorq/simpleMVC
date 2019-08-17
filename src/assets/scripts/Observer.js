class Observer {
    constructor () {
        this.subscriber = {};
        this.count = 0;
    }

    addItem(item) {
        this.count++;
        this.subscriber[this.count] = item;

        return this.count;
    }

    removeItem(id) {
        delete this.subscribe[id]
    }

    fireEvent(value) {
        for (const iterator in this.subscriber) {
            this.subscriber[iterator].update(value);
        }
    }
}


export default Observer;