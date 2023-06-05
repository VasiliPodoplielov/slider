import { Arrows, Options } from './types';
import Counter from './counter';
import EventEmitter from './eventEmitter';

// todo: need interface for class it's help to avoid type in main class;

class Slider {
	private currentIndex = 0;
	private autoplaySpeed: number;
	private stopWhenHovered: boolean;
	private counter: Counter;
	private selector: Element;
	private list: Element;
	private dots: Element | null;
	private arrows: Arrows;
	private readonly showDots: boolean;
	private readonly showArrows: boolean;
	private readonly itemsLength: number;
	private readonly eventEmitter: EventEmitter;

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
		// todo: better to create method for initialize all base fields.
		this.initializeSliderPath();
		this.initializeControls();
		this.setActiveSlide(0);
		this.addEventListeners();
	}

	// todo: type which return method. Need to recheck for all methods.
	private addEventListeners = () => {
		// todo: it's works without bind?
		this.dots?.addEventListener('click', this.dotsClickHandler);
		this.arrows?.left.addEventListener('click', this.counter.prev);
		this.arrows?.right.addEventListener('click', this.counter.next);

		this.eventEmitter.on('changeIndex', this.setActiveSlide);
	};

	private dotsClickHandler = (e: Event) => {
		const target = e.target as HTMLElement;

		if (!target.classList.contains('dot')) return;

		const index = +target.dataset.index;

		this.counter.setIndex(index);
	};

	private initializeSliderPath = () => {
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
		// todo: You violated the single responsibility split for the dots and arrows method.
		if (!this.showDots && !this.showArrows) return;

		const container = document.createElement('div');
		container.className = 'controls-container';

		if (this.showDots) {
			this.dots = this.initializeDots();
			container.appendChild(this.dots);
		}

		if (this.showArrows) {
			this.arrows = {
				left: this.createArrow('left'),
				right: this.createArrow('right'),
			};

			container.prepend(this.arrows.left);
			container.appendChild(this.arrows.right);
		}

		this.selector.appendChild(container);
	};

	private initializeDots = (): HTMLElement => {
		const dotsContainer = document.createElement('div');
		dotsContainer.className = 'dots-container';

		for (let i = 0; i <= this.itemsLength - 1; i++) {
			dotsContainer.appendChild(this.createDot(i));
		}

		return dotsContainer;
	};

	private createDot = (index: number): HTMLElement => {
		const dot = document.createElement('div');
		dot.className = 'dot';
		dot.setAttribute('data-index', index.toString());

		return dot;
	};

	// todo: Enum for left ot right
	private createArrow = (direction: 'left' | 'right'): HTMLElement => {
		const arrow = document.createElement('button');
		arrow.className = 'arrow-container';

		const icon = document.createElement('span');
		icon.className = `arrow ${direction}`;

		arrow.appendChild(icon);

		return arrow;
	};

	setActiveSlide = (index: number) => {
		this.list.children[this.currentIndex].classList.remove('active');
		this.dots?.children[this.currentIndex].classList.remove('active');
		this.list.children[index].classList.add('active');
		this.dots?.children[index].classList.add('active');
		this.currentIndex = index;
	};

	destroy = () => {
		this.dots?.removeEventListener('click', this.dotsClickHandler);
		this.arrows?.left.removeEventListener('click', this.counter.prev);
		this.arrows?.right.removeEventListener('click', this.counter.next);

		this.eventEmitter.removeListener('changeIndex', this.setActiveSlide);
	};
}
// todo: better to pass as arguments class not HTMLElement
const slider1 = new Slider(document.querySelector('.slider1'), {
	showDots: true,
	showArrows: true,
});

const slider2 = new Slider(document.querySelector('.slider2'), {
	showArrows: true,
});
const slider3 = new Slider(document.querySelector('.slider3'), {
	showArrows: false,
	showDots: true,
});
