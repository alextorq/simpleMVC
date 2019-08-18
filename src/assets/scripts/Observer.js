class Observer {
    constructor () {
        this.subscriber = {};
        this.count = 0;
    }

    /**
     * @param {Object} item 
     * @return {Number} id for unsubscribing
     */
    addItem(item) {
        this.count++;
        this.subscriber[this.count] = item;

        return this.count;
    }

    /**
     * unsubscribing by id
     * @param {Number} id 
     */
    removeItem(id) {
        delete this.subscribe[id]
    }

    /**
     * 
     * @param {any} value 
     */
    fireEvent(value) {
        for (const iterator in this.subscriber) {
            this.subscriber[iterator].update(value);
        }
    }
}


export default Observer;