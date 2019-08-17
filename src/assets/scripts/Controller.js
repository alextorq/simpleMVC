import axios from 'axios';
import api from './api'


class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.loadItems();

        this.view.dispatch.addListener('editViewItem', (event) => {
            this.model.editItem(event);
        });
        this.view.dispatch.addListener('addViewItem', (event) => {
            this.model.addItem(event.text);
        });
        this.view.dispatch.addListener('deleteViewItem', (event) => {
            this.model.deleteItem(event.id);
        });

        
        this.model.dispatch.addListener('editModelItem', (modelItem) => {
            this.editItem(modelItem)
        });
        this.model.dispatch.addListener('deleteModelItem', (modelItem) => {
            this.view.deleteItem(modelItem.id);
            this.deleteItem(modelItem)
        });
        this.model.dispatch.addListener('loadModelItems', (modelItem) => {
            this.view.loadItems(modelItem);
            this.view.togglePreloader()
        });
        this.model.dispatch.addListener('addModelItem', (modelItem) => {
            this.view.createItem(modelItem);
            this.saveItem(modelItem);
        });
    }

    /**
     * Load items from server
     * @return {void}
     */
    loadItems() {
        this.view.togglePreloader();
        axios.get(api.prefix +  api.todo.all)
            .then((response) => {
                this.model.loadItems(response.data)
            })
            .catch((err) => console.error(err))
    }

    /**
     * @param {Object} modelItem 
     * @return {void}
     */
    editItem(modelItem) {
        axios.patch(api.prefix + api.todo.edit, modelItem)
            .then((response) => {})
            .catch((err) => console.error(err))
    }

    /**
     * @param {Object} modelItem 
     * @return {void}
     */
    saveItem(modelItem) {
        axios.post(api.prefix + api.todo.add, modelItem)
            .then((response) => {console.log(response)})
            .catch((err) => console.error(err))
    }
    /**
     * @param {Object} modelItem 
     * @return {void}
     */
    deleteItem(modelItem) {
        axios.delete(api.prefix + api.todo.delete, modelItem)
            .then((response) => {console.log(response)})
            .catch((err) => console.error(err))
    }
}

export default Controller;