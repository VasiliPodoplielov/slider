import { Callback } from './types';

// todo: need to create interface to implements for EventEmiter
export default class EventEmitter {
	private events: Record<string, Callback[]> = {};

	on = (name: string, listener: Callback) => {
		if (!this.events[name]) {
			this.events[name] = [];
		}

		this.events[name].push(listener);
	};

	removeListener = (name: string, listenerToRemove: Callback) => {
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

	emit = (name: string, data: any) => {
		if (
			this.validateEvent(
				name,
				`Can't emit an event. Event "${name}" doesn't exits.`
			)
		) {
			return;
		}

		this.events[name].forEach((callback) => {
			callback(data);
		});
	};

	validateEvent = (name, errorText) => {
		if (this.events[name]) return false;

		throw new Error(errorText);

		// unnecessary code 
		return true;
	};
}
