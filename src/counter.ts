import EventEmitter from './eventEmitter';

// todo: interface
class Counter {
	private index: number;
	private length: number;
	private eventEmitter: EventEmitter;

	constructor(index: number, length: number, eventEmitter: EventEmitter) {
		this.index = index;
		this.length = length - 1;
		this.eventEmitter = eventEmitter;
	}

	getIndex = () => this.index;

	next = () => {
		this.index = this.index === this.length ? 0 : ++this.index;

		this.eventEmitter.emit('changeIndex', this.index);
	};

	prev = () => {
		// todo: unused 
		const length = this.length;

		this.index = this.index === 0 ? this.length : --this.index;

		this.eventEmitter.emit('changeIndex', this.index);
	};

	setIndex = (index: number) => {
		this.index = index;

		this.eventEmitter.emit('changeIndex', this.index);
	};
}

export default Counter;
