import { Arrows, DIRECTION, ISlider, Options } from './types';
import { Counter } from '../counter';
import { EventEmitter } from '../eventEmitter';
import { createDot, createDots } from './templates/dots';
import { createArrow } from './templates/arrow';
import { getControlsContainer } from './templates/controls';

class Slider implements ISlider {
	currentIndex = 0;
	autoplaySpeed: number;
	stopWhenHovered: boolean;
	counter: Counter;
	selector: Element;
	list: Element;
	dots: Element | null;
	arrows: Arrows;
	readonly showDots: boolean;
	readonly showArrows: boolean;
	readonly itemsLength: number;
	readonly eventEmitter: EventEmitter;

	constructor(
		selector: Element,
		{
			showArrows = true,
			showDots = false,
			stopWhenHovered = false,
			autoplaySpeed = 3000,
		}: Options
	) {
		this.showDots = showDots;
		this.showArrows = showArrows;
		this.stopWhenHovered = stopWhenHovered;
		this.autoplaySpeed = autoplaySpeed;
		this.itemsLength = selector.children.length;
		this.selector = selector;

		this.eventEmitter = new EventEmitter();
		this.counter = new Counter(0, this.itemsLength, this.eventEmitter);
		this.initializeBaseElements();
		this.initializeSliderSelectors();

		this.setActiveSlide(0);
		this.addEventListeners();
	}

	private initializeBaseElements = (): void => {
		this.initializeSliderPath();
		this.initializeControls();
	};

	private initializeSliderSelectors = (): void => {
		this.dots = this.selector.querySelector('.dots-container');
		this.arrows = {
			left: this.selector.querySelector('.left'),
			right: this.selector.querySelector('.right'),
		};
	};

	private addEventListeners = (): void => {
		this.dots?.addEventListener('click', this.dotsClickHandler);
		this.arrows?.left?.addEventListener('click', this.counter.prev);
		this.arrows?.right?.addEventListener('click', this.counter.next);

		this.eventEmitter.on('changeIndex', this.setActiveSlide);
	};

	private dotsClickHandler = (e: Event): void => {
		const target = e.target as HTMLElement;

		if (!target.classList.contains('dot')) return;

		const index = +target.dataset.index;

		this.counter.setIndex(index);
	};

	private initializeSliderPath = (): void => {
		const container = document.createElement('div');
		container.className = 'slider-list';

		const children = this.selector.children;

		while (children.length) {
			const child = children[0];

			child.classList.add('item');
			container.appendChild(children[0]);
		}

		this.list = container;
		this.selector.appendChild(container);
	};

	private initializeControls = (): void => {
		if (!this.showDots && !this.showArrows) return;

		const dots = this.getDots();
		const arrows = this.getArrows();

		const container = getControlsContainer(arrows + dots);

		this.selector.insertAdjacentHTML('beforeend', container);
	};

	private getDots = (): string => {
		if (!this.showDots) return '';

		const items: string = Array.from(Array(this.itemsLength).keys())
			.map((index) => createDot(index))
			.join('');

		return createDots(items);
	};

	private getArrows = (): string => {
		if (!this.showArrows) return '';

		return createArrow(DIRECTION.LEFT) + createArrow(DIRECTION.RIGHT);
	};

	setActiveSlide = (index: number): void => {
		this.list.children[this.currentIndex].classList.remove('active');
		this.dots?.children[this.currentIndex].classList.remove('active');
		this.list.children[index].classList.add('active');
		this.dots?.children[index].classList.add('active');
		this.currentIndex = index;
	};

	destroy = (): void => {
		this.dots?.removeEventListener('click', this.dotsClickHandler);
		this.arrows?.left.removeEventListener('click', this.counter.prev);
		this.arrows?.right.removeEventListener('click', this.counter.next);

		this.eventEmitter.removeListener('changeIndex', this.setActiveSlide);
	};
}

export default Slider;
