import PublisherSubscriber from './PubSub.js';

/**
 * Model for todo
 */
class Model {
    constructor() {
      this.todos = [];
      this.dispatch = new PublisherSubscriber();
    }
    /**
     * Create new node 
     * @param {String} text item description
     * @return {Object} node
     */
    createItem(text) {
      let node = {
        id: Date.now(),
        text,
        complete: false,
        dateCreate: new Date()
      }
      return node;
    }
  
    /**
     * Push new node in storage
     * @param {String} item 
     * @return {void}
     */
    addItem(item) {
      let itemModel = this.createItem(item);
      this.todos.push(itemModel);
      this.dispatch.fireEvent('addModelItem', itemModel);
    }
  
    /**
     * @param {Array} items from server
     */
    loadItems(items) {
      this.todos.push(...items);
      this.dispatch.fireEvent('loadModelItems', items);
    }

    /**
     * @param {Number} id 
     * @return {Object}
     */
    _findItemIndex(id) {
      return this.todos.findIndex((item) => item.id === id);
    }
  
    /**
     * Delete item
     * @param {Number} id for delete
     * @return {void}
     */
    deleteItem(id) {
      this.todos.splice(this._findItemIndex(id), 1)
      this.dispatch.fireEvent('deleteModelItem', {id});
    }
  
    /** 
     * @param {Object} item 
     * @return {void}
     */
    editItem(item) {
      let index = this._findItemIndex(item.id);
      this.todos[index] = Object.assign({}, this.todos[index], item);
      this.dispatch.fireEvent('editModelItem', this.todos[index]);
    }
  
  }


  export default Model;