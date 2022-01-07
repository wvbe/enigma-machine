import { Machine } from './src/Machine';
import { UKW_B, I, II, III } from './src/presets';

function createSimpleMachine() {
	const machine = new Machine();
	machine.addRotor(I.clone());
	machine.addRotor(II.clone());
	machine.addRotor(III.clone());
	machine.setReflector(UKW_B.clone());
	return machine;
}

describe('Machine #1, testing signals and notches', () => {
	const machine = createSimpleMachine();
	it('starting position', () => {
		// Assert starting position
		expect(machine.rotors[0].rotation).toBe(0);
		expect(machine.rotors[1].rotation).toBe(0);
	});
	it('first key press', () => {
		expect(machine.encode(0)).toBe(5);
		expect(machine.rotors[0].rotation).toBe(1);
	});
	it('second key press', () => {
		expect(machine.encode(0)).toBe(19);
		expect(machine.rotors[0].rotation).toBe(2);
	});
	it('hitting the notch on rotor 0', () => {
		// Spin the rotor up to rotor 0's notch
		for (let i = 0; i < 14; i++) {
			machine.rotate();
		}
		expect(machine.rotors[0].rotation).toBe(16);
		expect(machine.rotors[1].rotation).toBe(0);
		expect(machine.encode(0)).toBe(9);
		expect(machine.rotors[0].rotation).toBe(17);
		expect(machine.rotors[1].rotation).toBe(1);
	});
	it('hitting the notch on rotor 1', () => {
		// Spin rotor 0 enough times to revolve rotor 1 four times
		for (let i = 0; i < 4 * 26 - 1; i++) {
			machine.rotate();
		}
		expect(machine.rotors[0].rotation % 26).toBe(16);
		expect(machine.rotors[1].rotation % 26).toBe(4);
		expect(machine.rotors[2].rotation % 26).toBe(0);
		expect(machine.encode(0)).toBe(11);
		expect(machine.rotors[0].rotation % 26).toBe(17);
		expect(machine.rotors[1].rotation % 26).toBe(5);
		expect(machine.rotors[2].rotation % 26).toBe(1);
	});
});

describe('Machine #2, testing the encode/decode of a full message', () => {
	const m1 = createSimpleMachine();
	const m2 = createSimpleMachine();
	const stringIn = 'thequickbrownfoxjumpsoverthelazydog';
	const stringOut = 'zptrrateujdawkfeabuuyiiplxxlzijvneh';
	it('encode "quick brown fox"', () => {
		stringIn.split('').forEach((char, i) => {
			expect(m1.encode(char)).toBe(stringOut[i]);
		});
	});
	it('decode "rrate ujdaw kfa"', () => {
		stringOut.split('').forEach((char, i) => {
			expect(m2.encode(char)).toBe(stringIn[i]);
		});
	});
});

describe('Machine #3, testing the plugboard', () => {
	const machine = createSimpleMachine();
	machine.plugboard.plug(0, 1);
	machine.plugboard.plug(14, 16);
	const machineBase = createSimpleMachine();
	it('some IO is switched', () => {
		expect(machine.encode(0, true)).toBe(machineBase.encode(1, true));
		expect(machine.encode(1, true)).toBe(machineBase.encode(0, true));
		expect(machine.encode(2, true)).toBe(machineBase.encode(2, true));

		expect(machine.encode(14, true)).toBe(machineBase.encode(16, true));
		expect(machine.encode(15, true)).toBe(machineBase.encode(15, true));
		expect(machine.encode(16, true)).toBe(machineBase.encode(14, true));
	});
});
