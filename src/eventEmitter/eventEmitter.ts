import { IEventEmitter, Callback } from './types';

export default class EventEmitter implements IEventEmitter {
	events: Record<string, Callback[]> = {};

	on = (name: string, listener: Callback): void => {
		if (!this.events[name]) {
			this.events[name] = [];
		}

		this.events[name].push(listener);
	};

	removeListener = (name: string, listenerToRemove: Callback): void => {
		if (
			this.validateEvent(
				name,
				`Can't remove a listener. Event "${name}" doesn't exits.`
			)
		) {
			return;
		}

		this.events[name] = this.events[name].filter(
			(listener) => listener !== listenerToRemove
		);
	};

	emit = (name: string, data: any): void => {
		if (
			this.validateEvent(
				name,
				`Can't emit an event. Event "${name}" doesn't exits.`
			)
		) {
			return;
		}

		this.events[name].forEach((callback: Callback) => {
			callback(data);
		});
	};

	validateEvent = (name, errorText): boolean => {
		if (this.events[name]) return false;

		throw new Error(errorText);

		return true;
	};
}
