export interface IEventEmitter {
	events: Record<string, Callback[]>;
	on: (name: string, listener: Callback) => void;
	removeListener: (name: string, listenerToRemove: Callback) => void;
	emit: (name: string, data: any) => void;
	validateEvent: (name, errorText) => boolean;
}

export type Callback = (data: any) => void;
