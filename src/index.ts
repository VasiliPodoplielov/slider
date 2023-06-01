import { Options } from './types';
import Counter from './counter';

class Slider {
	private currentIndex = 0;
	private showDots: boolean;
	private showArrows: boolean;
	private autoplaySpeed: number;
	private stopWhenHovered: boolean;
	private counter: Counter;
	private itemsLength: number;
	private selector: Element;
	private list: Element;
	private dots: Element | null;

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

		this.initializeCounter();
		this.initializeSliderPath();
		this.initializeControls();
		this.setActiveSlide(0);
		this.addEventListeners();
	}

	addEventListeners = () => {
		this.dots.addEventListener('click', this.dotsClickHandler);
	};

	dotsClickHandler = (e: any) => {
		const { target } = e;

		if (!target.classList.contains('dot')) return;

		const index = target.dataset.index;

		this.setActiveSlide(index);
	};

	initializeSliderPath = () => {
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

	setActiveSlide = (index: number) => {
		this.list.children[this.currentIndex].classList.remove('active');
		this.dots.children[this.currentIndex].classList.remove('active');
		this.list.children[index].classList.add('active');
		this.dots.children[index].classList.add('active');
		this.currentIndex = index;
	};

	initializeCounter = () => {
		this.counter = new Counter(0, this.itemsLength);
	};

	initializeControls = (): void => {
		if (!this.showDots || !this.showArrows) return;

		const container = document.createElement('div');
		container.className = 'controls-container';

		if (this.showDots) {
			this.dots = this.initializeDots();
			container.appendChild(this.dots);
		}

		if (this.showArrows) {
			container.prepend(this.createArrow('left'));
			container.appendChild(this.createArrow('right'));
		}

		this.selector.appendChild(container);
	};

	initializeDots = (): HTMLElement => {
		const dotsContainer = document.createElement('div');
		dotsContainer.className = 'dots-container';

		for (let i = 0; i <= this.itemsLength - 1; i++) {
			dotsContainer.appendChild(this.createDot(i));
		}

		return dotsContainer;
	};

	createDot = (index: number): HTMLElement => {
		const dot = document.createElement('div');
		dot.className = 'dot';
		dot.setAttribute('data-index', index.toString());

		return dot;
	};

	createArrow = (direction: 'left' | 'right'): HTMLElement => {
		const arrow = document.createElement('button');
		arrow.className = 'arrow-container';

		const icon = document.createElement('span');
		icon.className = `arrow ${direction}`;

		arrow.appendChild(icon);

		return arrow;
	};

	next = () => {
		console.log('next slide');
	};

	prev = () => {
		console.log('prev slide');
	};
}

const sliderContainer = document.querySelector('.slider');
const slider = new Slider(sliderContainer, {
	showDots: true,
	showArrows: true,
});
