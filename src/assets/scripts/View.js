import PublisherSubscriber from './PubSub.js';
import Observer from './Observer';

/**
 * 
 * @param {String} str 
 */
function createFragmentFromString(str){
	var template = document.createElement("template");
	template.innerHTML = str;
	return template.content;
}

class View {
	constructor(rootEl) {
		this.rootEl = rootEl;
		this.createForm();
		this.createList();
		this.addHandlers();
		this._temporaryText = '';
		this.dispatch = new PublisherSubscriber();
		this.observer = new Observer();
	}
	/**
	 * Create markdown for items form 
	 * @return {void}
	 */
	createForm() {
		var fragment = createFragmentFromString(this.templateForm())
		this.rootEl.appendChild(fragment);
		this.inputTODO = document.getElementById('form-text');
	}

	/**
	 * Create markdown for items wrapper
	 * @return {void}
	 */
	createList() {
		var fragment = createFragmentFromString(this.templateList())
		this.rootEl.appendChild(fragment);

		this.todoList = document.getElementById('todo__list');
	}

	/**
	 * 
	 * @param {Object} node 
	 * @return {void}
	 */
	createItem(node) {
		let wrapper = document.createElement('li');
		let classPrefix = node.complete ? ' complete' : '';
		wrapper.classList = 'todo__item left-transform' + classPrefix;
		wrapper.id = `todo__id_${node.id}`;

		let label = document.createElement('label');
		let inputCheck = document.createElement('input');
		inputCheck.setAttribute('type' , 'checkbox');
		inputCheck.classList = 'todo__item-check';
		
		inputCheck.checked = node.complete;
		inputCheck.update = function (value) {
			if (value && !this.checked) {
				this.click();
			}
			if (!value && this.checked) {
				this.click();
			}
		}
		this.observer.addItem(inputCheck)

		let span = document.createElement('span')
		label.appendChild(inputCheck);
		label.appendChild(span);
		wrapper.appendChild(label);


		let input = document.createElement('input');
		input.classList = 'form-control';
		
		input.setAttribute('type' , 'text');
		input.value = node.text;
		wrapper.appendChild(input);

		let button = document.createElement('button');
		button.innerText = 'Delete';
		button.classList = 'btn btn-primary';
		wrapper.appendChild(button);

		
     
		this.todoList.appendChild(wrapper);
		// Animate appearance item
		setTimeout(() => {wrapper.classList.remove('left-transform')}, 20)

	}
	/**
	 * Loading items
	 * @param {Array} items 
	 */
	loadItems(items) {
		for (let item of items) {
			this.createItem(item)
		}
	}
	/**
	 * Animate preloader
	 * @return {void}
	 */
	togglePreloader() {
		this.rootEl.querySelector('.preloader').classList.toggle('active')
	}

	/**
	 * Add handlers 
	 * @return {void}
	 */
	addHandlers() {
		this.rootEl.addEventListener('submit', (event) => {
			event.preventDefault();
			if (!this._temporaryText) {return};
			this.dispatch.fireEvent('addViewItem', {text: this._temporaryText});
			this.clearForm();
		});
		
		this.inputTODO.addEventListener('change', (event) => {
			this._temporaryText = event.target.value;
		});

		this.todoList.addEventListener('change', (event) => {
			let target = event.target;
			let parent = target.closest('.todo__item');
			
			let id = +parent.id.replace('todo__id_', '');
			let text = parent.querySelector('.form-control').value;
			let complete = parent.querySelector('label input').checked;

			let classPrefix = complete ? ' complete' : '';
			parent.classList = 'todo__item' + classPrefix;
			this.dispatch.fireEvent('editViewItem', {id, text, complete});
		});
		
		this.todoList.addEventListener('click', (event) => {
			let target = event.target;
			let button = target.closest('.btn');
			if(!button) {return}
			let parent = target.closest('.todo__item');
			let id = +parent.id.replace('todo__id_', '');
			this.dispatch.fireEvent('deleteViewItem', {id});
		});


		document.getElementById('select-all').addEventListener('change', (event) => {
			let status = event.target.checked;
			this.observer.fireEvent(status);
		})
	}

	/**
	 * setTimeout for animate delete item
	 * @param {Number} id 
	 * @return {void}
	 */
	deleteItem(id) {
		let parent = document.getElementById('todo__id_' + id)
		parent.classList.add('left-transform');
		setTimeout(() => {parent.remove()}, 400)
	}

	/**
	 * Clear temporary data after create new item
	 * @return {void}
	 */
	clearForm() {
		this.inputTODO.value = '';
		this._temporaryText = '';
	}

	/**
	 * @return {String} string for html insert
	 */
	templateList() {
		return	`<div class="list-wrapper">
					<div class="preloader">
						<span class="lds-dual-ring"></span>
					</div>
					<ul class="todo__list" id="todo__list"></ul>
				</div>`
	}

	/**
	 * @return {String} string for html insert
	 */
	templateForm() {
		return `
			<div class="app-wrapper">
				<form method="POST" action="/create">
					<h1>TODO</h1>
					<div class="form-group">
						<label for="form-text">Enter todo</label>
						<input type="text" class="form-control" id="form-text" placeholder="type">
					</div>
					<button type="submit" class="btn btn-primary">Create</button>
				</form>	
				
				<label class="select-all"><input id="select-all" type="checkbox" class="todo__item-check">
					<span></span>
					Complete all
				</label>		
			</div>

		`;	
	}
}


export default View;