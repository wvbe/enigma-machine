import { Machine } from './src/Machine';
import { UKW_B, I, II, III, UKW_C, V, VIII, VI, Beta } from './src/presets';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

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

// https://www.cryptomuseum.com/crypto/enigma/msg/p1030681.htm#break
xit('the Dönitz message', () => {
	// Walzenlage + ringstellung
	const fastRotor = VIII.clone(alphabet.indexOf('l'));
	const middleRotor = VI.clone(alphabet.indexOf('e'));
	const slowRotor = V.clone(alphabet.indexOf('p'));
	const greekRotor = Beta.clone(alphabet.indexOf('e'));
	const reflector = UKW_C.clone();

	// Grundstellung
	fastRotor.rotation = alphabet.indexOf('z');
	middleRotor.rotation = alphabet.indexOf('s');
	slowRotor.rotation = alphabet.indexOf('d');
	greekRotor.rotation = alphabet.indexOf('c');

	const m = new Machine();
	m.addRotor(fastRotor);
	m.addRotor(middleRotor);
	m.addRotor(slowRotor);
	m.addRotor(greekRotor);
	m.setReflector(reflector);

	// Steckern
	m.plugboard.plug(alphabet.indexOf('a'), alphabet.indexOf('e'));
	m.plugboard.plug(alphabet.indexOf('b'), alphabet.indexOf('f'));
	m.plugboard.plug(alphabet.indexOf('c'), alphabet.indexOf('m'));
	m.plugboard.plug(alphabet.indexOf('d'), alphabet.indexOf('q'));
	m.plugboard.plug(alphabet.indexOf('h'), alphabet.indexOf('u'));
	m.plugboard.plug(alphabet.indexOf('j'), alphabet.indexOf('n'));
	m.plugboard.plug(alphabet.indexOf('l'), alphabet.indexOf('x'));
	m.plugboard.plug(alphabet.indexOf('p'), alphabet.indexOf('r'));
	m.plugboard.plug(alphabet.indexOf('s'), alphabet.indexOf('z'));
	m.plugboard.plug(alphabet.indexOf('v'), alphabet.indexOf('w'));

	const cypherText = `
			DUHF TETO LANO TCTO UARB BFPM HPHG CZXT DYGA HGUF XGEW KBLK GJWL QXXT
			GPJJ AVTO CKZF SLPP QIHZ FXOE BWII EKFZ LCLO AQJU LJOY HSSM BBGW HZAN
			VOII PYRB RTDJ QDJJ OQKC XWDN BBTY VXLY TAPG VEAT XSON PNYN QFUD BBHH
			VWEP YEYD OHNL XKZD NWRH DUWU JUMW WVII WZXI VIUQ DRHY MNCY EFUA PNHO
			TKHK GDNP SAKN UAGH JZSM JBMH VTRE QEDG XHLZ WIFU SKDQ VELN MIMI THBH
			DBWV HDFY HJOQ IHOR TDJD BWXE MEAY XGYQ XOHF DMYU XXNO JAZR SGHP LWML
			RECW WUTL RTTV LBHY OORG LGOW UXNX HMHY FAAC QEKT HSJW DUHF TETO
		`
		.replace(/\s/g, '')
		.toLowerCase()
		.slice(8, -8);

	const plainText = cypherText
		.split('')
		.map(letter => m.encode(letter))
		.join('');

	expect(plainText).toBe(
		`
				KRKRALLEXXFOLGENDESISTSOFORTBEKANNTZUGEBENXXICHHABEFOLGELNBEBEFEHLERH
				ALTENXXJANSTERLEDESBISHERIGXNREICHSMARSCHALLSJGOERINGJSETZTDERFUEHRER
				SIEYHVRRGRZSSADMIRALYALSSEINENNACHFOLGEREINXSCHRIFTLSCHEVOLLMACHTUNTE
				RWEGSXABSOFORTSOLLENSIESAEMTLICHEMASSNAHMENVERFUEGENYDIESICHAUSDERGEG
				ENWAERTIGENLAGEERGEBENXGEZXREICHSLEITEIKKTULPEKKJBORMANNJXXOBXDXMMMDU
				RNHFKSTXKOMXADMXUUUBOOIEXKP
			`
			.replace(/\s/g, '')
			.toLowerCase()
	);
});
