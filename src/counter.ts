class Counter {
	private index: number;
	private length: number;

	constructor(index: number, length: number) {
		this.index = index;
		this.length = length - 1;
	}

	getIndex = () => this.index;

	next = () => {
		this.index = this.index === this.length ? 0 : ++this.index;
	};

	prev = () => {
		this.index = this.index === 0 ? --this.length : --this.index;
	};
}

export default Counter;
