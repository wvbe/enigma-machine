import { Event } from './Event';

export type Trivia = {
	alphabet?: string;
	name?: string;
	model?: string;
	year?: number;
};

/**
 * One of the rotors that go into an Enigma machine.
 */
export class Rotor {
	/**
	 * The wiring that determines how an incoming signal is mapped to another pin.
	 */
	public readonly wiring: number[];

	/**
	 * The amount of letters on this rotor.
	 */
	public readonly size: number;

	/**
	 * The grundstellung. Like the rotation it affects the signal encoding. Unlike the rotation
	 * it does not affect notches, and it doesn't change during operation.
	 */
	private readonly ringSetting: number;

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
	 * Facts about this rotor for shits and giggles, but not useful for algorithms.
	 */
	public readonly trivia: Trivia;

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

	constructor(wiring: number[], notches: number[], ringSetting: number, trivia: Trivia = {}) {
		this.wiring = wiring;
		this.notches = notches;
		this.size = this.wiring.length;
		this.trivia = trivia;
		this.ringSetting = ringSetting;
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
			(this.wiring[(index + this.ringSetting + this.rotation) % this.wiring.length] +
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
			(this.wiring.indexOf((index + this.ringSetting + this.rotation) % this.wiring.length) +
				this.wiring.length -
				(this.rotation % this.wiring.length)) %
			this.wiring.length;
		return reverseIndex;
	}

	/**
	 * Create a whole new rotor by copying an existing one.
	 */
	clone(ringSetting: number = this.ringSetting) {
		const rotor = new Rotor(this.wiring, this.notches, ringSetting, { ...this.trivia });
		return rotor;
	}
}
