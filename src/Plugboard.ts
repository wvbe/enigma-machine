export class Plugboard {
	private readonly pairs: { [a: number]: number } = {};

	/**
	 * Add a plug to map one signal to another, and vice versa.
	 */
	public plug(a: number, b: number) {
		if (this.pairs[a] !== undefined) {
			throw new Error(`Signal ${a} is already plugged to ${this.pairs[a]}`);
		}
		if (this.pairs[b] !== undefined) {
			throw new Error(`Signal ${b} is already plugged to ${this.pairs[b]}`);
		}
		this.pairs[a] = b;
		this.pairs[b] = a;
	}

	/**
	 * Remove the plugging of one character to another (and vice versa)
	 */
	public unplug(a: number) {
		const b = this.pairs[a];
		if (b === undefined) {
			throw new Error(`Signal ${a} is not plugged to anything.`);
		}
		delete this.pairs[a];
		delete this.pairs[b];
	}

	/**
	 * Encode a signal according to the (lack of) plugging.
	 */
	public encode(a: number): number {
		const b = this.pairs[a];
		return b === undefined ? a : b;
	}
}
