import EventEmitter from '../eventEmitter/eventEmitter';
import { ICounter } from './types';

class Counter implements ICounter {
	index: number;
	length: number;
	eventEmitter: EventEmitter;

	constructor(index: number, length: number, eventEmitter: EventEmitter) {
		this.index = index;
		this.length = length - 1;
		this.eventEmitter = eventEmitter;
	}

	getIndex = (): number => this.index;

	next = (): void => {
		this.index = this.index === this.length ? 0 : ++this.index;

		this.eventEmitter.emit('changeIndex', this.index);
	};

	prev = (): void => {
		this.index = this.index === 0 ? this.length : --this.index;

		this.eventEmitter.emit('changeIndex', this.index);
	};

	setIndex = (index: number): void => {
		this.index = index;

		this.eventEmitter.emit('changeIndex', this.index);
	};
}

export default Counter;
