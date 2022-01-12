import { Event } from './Event';
import { Plugboard } from './Plugboard';
import { Rotor } from './Rotor';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

/**
 * An Enigma machine with all its bits and pieces
 */
export class Machine {
	/**
	 * The rotors in this machine, fast rotor first.
	 */
	public readonly rotors: Rotor[] = [];

	/**
	 * The reflector, aka Umkehrwalze. Without it the machine won't work.
	 */
	public reflector?: Rotor;

	/**
	 * The plugboard on this machine. Any letter that is not plugged will simply encode
	 * as itself.
	 */
	public readonly plugboard: Plugboard = new Plugboard();

	/**
	 * The event that a signal is encoded. Event data is the signal at each point in between the
	 * plugboard, rotors, reflector, rotors and plugboard again.
	 */
	public readonly $encode = new Event<[number[]]>();

	/**
	 * Add a new rotor to the scrambler. Most Enigma machines have 3 rotors, but in this virtual
	 * Enigma you can use as many as you like.
	 */
	addRotor(rotor: Rotor) {
		this.rotors.push(rotor);
	}

	/**
	 * Set the reflector, also known as Umkehrwalze (UKW).
	 */
	setReflector(reflector: Rotor) {
		this.reflector = reflector;
	}

	/**
	 * Turn the first rotor ("fast rotor"), as normally happens at the beginning of a keypress.
	 * Depending on where its notches are, any number of successive rotors may also turn.
	 */
	rotate() {
		this.rotors.reduce(
			(hitNotchOnPreviousRotor, rotor) => (hitNotchOnPreviousRotor ? rotor.rotate() : false),
			true
		);
	}

	/**
	 * Encode one letter from the alphabet into another letter from the alphabet. In order to do so,
	 * the rotors are shifted as well.
	 */
	encode(signal: number, skipRotation?: boolean): number;
	encode(signal: string, skipRotation?: boolean): string;
	encode(signal: string | number, skipRotation?: boolean): string | number {
		if (!this.reflector) {
			throw new Error('You cannot on a machine without reflector');
		}

		const asAlphabet = typeof signal === 'string';
		const trail: number[] = [];

		if (!skipRotation) {
			this.rotate();
		}

		let index = asAlphabet ? alphabet.indexOf(signal.toLowerCase()) : signal;
		trail.push(index);

		index = this.plugboard.encode(index);
		trail.push(index);

		for (let i = 0; i < this.rotors.length; i++) {
			const rotor = this.rotors[i];
			index = rotor.encode(index);
			trail.push(index);
		}

		index = this.reflector.encode(index);
		trail.push(index);

		for (let i = this.rotors.length - 1; i >= 0; i--) {
			const rotor = this.rotors[i];
			index = rotor.decode(index);
			trail.push(index);
		}

		index = this.plugboard.encode(index);
		trail.push(index);

		this.$encode.trigger(trail);
		return asAlphabet ? alphabet[index] : index;
	}
}
