export class Event<Args extends unknown[]> {
	private callbacks: ((...args: Args) => void)[] = [];

	on(callback: (...args: Args) => void): () => void {
		this.callbacks.push(callback);

		return () => {
			this.callbacks.splice(this.callbacks.indexOf(callback), 1);
		};
	}

	trigger(...args: Args) {
		this.callbacks.forEach(cb => cb(...args));
	}
}
