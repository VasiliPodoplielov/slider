// todo: better to pass as arguments class not HTMLElement
import { Slider } from './slider';

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
