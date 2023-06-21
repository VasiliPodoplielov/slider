import EventEmitter from '../eventEmitter/eventEmitter';

export interface ICounter {
	index: number;
	length: number;
	eventEmitter: EventEmitter;

	getIndex: () => number;
	next: () => void;
	prev: () => void;
	setIndex: (index: number) => void;
}
