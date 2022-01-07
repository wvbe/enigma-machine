import Event from './Event';

type RotorDescription = {
	alphabet?: string;
	name?: string;
	model?: string;
	year?: number;
};

const DEFAULT_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

/**
 * One of the rotors that go into an Enigma machine.
 */
export class Rotor implements RotorDescription {
	/**
	 * The wiring that determines how an incoming signal is mapped to another pin.
	 */
	public readonly wiring: number[];

	/**
	 * The indices at which this wheel has a notch, that (when turning) would cause the
	 * next rotor to turn too.
	 */
	public readonly notches: number[];

	/**
	 * The amount of characters the rotor is turned.
	 */
	public rotation = 0;

	/**
	 * The letters on this rotor. Not really relevant so long as signals are regarded as numbers.
	 *
	 * @TODO deprecate, destroy.
	 */
	public readonly alphabet = DEFAULT_ALPHABET;

	public readonly name?: string;
	public readonly model?: string;
	public readonly year?: number;

	/**
	 * The event that this rotor turns by 1/26th of a full turn.
	 */
	public readonly $rotate = new Event<
		[
			// The new position
			number,
			// Wether or not a notch was hit
			boolean
		]
	>();

	constructor(wiring: number[], notches: number[], description: RotorDescription = {}) {
		this.wiring = wiring;
		this.notches = notches;

		Object.assign(this, description);
	}

	/**
	 * Move this rotor's Ringstellung by 1 position. Returns wether or not a turnover notch was hit.
	 */
	public rotate(): boolean {
		this.rotation = this.rotation + 1;
		const hitsNotch =
			this.notches === null
				? false
				: this.notches.includes((this.rotation % this.wiring.length) - 1);
		this.$rotate.trigger(this.rotation, hitsNotch);
		return hitsNotch;
	}

	/**
	 * Signal going from the keypress towards the reflector
	 */
	public encode(index: number) {
		return (
			(this.wiring[(index + this.rotation) % this.wiring.length] +
				this.wiring.length -
				(this.rotation % this.wiring.length)) %
			this.wiring.length
		);
	}

	/**
	 * Signal going from the reflector towards the lamp
	 */
	public decode(index: number) {
		const reverseIndex =
			(this.wiring.indexOf((index + this.rotation) % this.wiring.length) +
				this.wiring.length -
				(this.rotation % this.wiring.length)) %
			this.wiring.length;
		return reverseIndex;
	}

	static fromAlphabet(coding: string, notches: string, description?: RotorDescription) {
		const alphabet = description?.alphabet || DEFAULT_ALPHABET;
		const codingNumbers = coding
			.toLowerCase()
			.split('')
			.map(letter => alphabet.indexOf(letter));
		const notchesNumbers = !notches
			? []
			: notches
					.toLowerCase()
					.split('')
					.map(letter => alphabet.indexOf(letter));
		return new Rotor(codingNumbers, notchesNumbers, description);
	}

	/**
	 * Create a whole new rotor by copying an existing one.
	 */
	clone(position?: string | number) {
		if (typeof position === 'string') {
			position = this.alphabet.indexOf(position.toLowerCase());
		}
		const rotor = new Rotor(this.wiring, this.notches, {
			name: this.name,
			model: this.model,
			year: this.year
		});
		if (position !== undefined) {
			rotor.rotation = position;
		} else {
			rotor.rotation = this.rotation;
		}
		return rotor;
	}
}
