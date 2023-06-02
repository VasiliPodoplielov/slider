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

export type Callback = (data: any) => void;
