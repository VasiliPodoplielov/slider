export const createDot = (index: number): string =>
	`<div class='dot' data-index='${index.toString()}'></div>`;

export const createDots = (items: string) =>
	`<div class="dots-container">${items}</div>`;
