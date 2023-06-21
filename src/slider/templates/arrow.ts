import { DIRECTION } from '../types';

export const createArrow = (direction: DIRECTION) =>
	`<button class="arrow-container ${direction}"><span class="arrow"></span></button>`;
