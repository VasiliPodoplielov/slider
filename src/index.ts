// todo: better to pass as arguments class not HTMLElement
import { Slider } from './slider';

const slider1 = new Slider('.slider1', {
	showDots: true,
	showArrows: true,
});

const slider2 = new Slider('.slider2', {
	showArrows: true,
});
const slider3 = new Slider('.slider3', {
	showArrows: false,
	showDots: true,
	autoplaySpeed: 2000,
});

setTimeout(() => {
	slider2.destroy();
}, 6000);
