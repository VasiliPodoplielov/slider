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

export interface ISlider {
	currentIndex: number;
	autoplaySpeed?: number;
	stopWhenHovered: boolean;
	counter: Counter;
	sliderContainer: Element;
	list: Element;
	dots: Element | null;
	arrows: Arrows;
	autoPlayInterval: ReturnType<typeof setInterval>;
	readonly showDots: boolean;
	readonly showArrows: boolean;
	readonly itemsLength: number;
	readonly eventEmitter: EventEmitter;
}
