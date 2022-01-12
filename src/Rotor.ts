import { Event } from './Event';

export type Trivia = {
	alphabet?: string;
	name?: string;
	model?: string;
	year?: number;
};

function inRangeOf(num: number, modulo: number) {
	const res = num % modulo;
	return res < 0 ? res + modulo : res;
}

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
	 * The indices at which this wheel has a notch, that (when turning) would cause the
	 * next rotor to turn too.
	 */
	public readonly notches: number[];

	/**
	 * The amount of characters the rotor is turned. Changing it will change how the next letter
	 * (even if it is the same letter) is encoded, and affects the notches as well -- sometimes
	 * causing an adjacent rotor to turn as well.
	 */
	public rotation = 0;

	/**
	 * The ring setting. Like the rotation it affects the signal encoding, changing it will associate
	 * a letter with different wiring. Unlike the rotation it does not affect notches, and it doesn't
	 * change during operation.
	 */
	private readonly setting: number;

	/**
	 * Facts about this rotor for shits and giggles, but not useful for algorithms.
	 */
	public readonly trivia: Trivia;

	/**
	 * The event that this rotor turns by 1/26th (or however many letters there are in your
	 * alphabet) of a full turn.
	 */
	public readonly $rotate = new Event<
		[
			// The new position
			number,
			// Wether or not a notch was hit
			boolean
		]
	>();

	constructor(wiring: number[], notches: number[], setting: number, trivia: Trivia = {}) {
		this.wiring = wiring;
		this.notches = notches;
		this.setting = setting;
		this.trivia = trivia;

		this.size = this.wiring.length;
	}

	/**
	 * Move this rotor's Ringstellung by 1 position. Returns wether or not a turnover notch was hit.
	 */
	public rotate(): boolean {
		this.rotation = this.rotation + 1;

		const hitsNotch =
			this.notches === null
				? false
				: // @TODO Is there a bug here if the notch is on index 0?
				  this.notches.includes(inRangeOf(this.rotation, this.size) - 1);

		this.$rotate.trigger(this.rotation, hitsNotch);

		return hitsNotch;
	}

	/**
	 * Signal going from the keypress towards the reflector
	 */
	public encode(index: number) {
		const encoded = this.wiring[inRangeOf(index + this.rotation + this.setting, this.size)];
		const correctedForRotation = encoded - this.rotation;
		return inRangeOf(correctedForRotation, this.size);
	}

	/**
	 * Signal going from the reflector towards the lamp
	 */
	public decode(index: number) {
		const encoded = this.wiring.indexOf(
			inRangeOf(index + this.rotation + this.setting, this.size)
		);
		const correctedForRotation = encoded - this.rotation;
		return inRangeOf(correctedForRotation, this.size);
	}

	/**
	 * Create a whole new rotor by copying an existing one.
	 */
	clone(ringSetting: number = this.setting) {
		return new Rotor(this.wiring, this.notches, ringSetting, { ...this.trivia });
	}
}
