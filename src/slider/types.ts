import { Counter } from '../counter';
import { EventEmitter } from '../eventEmitter';

export interface Options {
	showDots?: boolean;
	showArrows?: boolean;
	stopWhenHovered?: boolean;
	autoplaySpeed?: number;
}

export interface Arrows {
	left: Element | null;
	right: Element | null;
}

export enum DIRECTION {
	LEFT = 'left',
	RIGHT = 'right',
}

export interface ISlider {
	currentIndex: number;
	// autoplaySpeed: number;
	// stopWhenHovered: boolean;
	counter: Counter;
	selector: Element;
	list: Element;
	dots: Element | null;
	arrows: Arrows;
	readonly showDots: boolean;
	readonly showArrows: boolean;
	readonly itemsLength: number;
	readonly eventEmitter: EventEmitter;
}
