class PublisherSubscriber {
	constructor() {
		this.eventDispatch = {};
	}
	/**
	 * @param {String} eventName 
	 * @param {Function} userFunction 
	 * @return {void}
	 */
	addListener(eventName, userFunction) {
		this.eventDispatch[eventName] = this.eventDispatch[eventName] || [];
		this.eventDispatch[eventName].push(userFunction);
	}
		
	/**
	 * @param {String} eventName 
	 * @param {Function} userFunction 
	 * @return {void}
	 */
	removeListener(eventName, userFunction) {
		if (!this.eventDispatch[eventName]) {return}
		let index = this.eventDispatch[eventName].findIndex((func) => func === userFunction);
		this.eventDispatch[eventName].splice(index, 1)
	}
		
	/**
	 * @param {String} eventName 
	 * @param {Object} event 
	 * @return {void}
	 */
	fireEvent(eventName, event) {
		if (!this.eventDispatch[eventName]) {
			return
		}

		for (let subscriber of this.eventDispatch[eventName]) {
			subscriber(event);
		}
	}
}

export default PublisherSubscriber;