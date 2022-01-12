import { Rotor, Trivia } from './Rotor';

function createRotorFromAlphabet(
	coding: string,
	notches: string,
	trivia: Trivia,
	alphabet: string = 'abcdefghijklmnopqrstuvwxyz'
) {
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
	return new Rotor(codingNumbers, notchesNumbers, 0, { alphabet, ...trivia });
}

// Terms:
//   ETW - Eintrittzwalze                 - Entry disk
//   UKW - Umkehrwalze                    - Reflector
//         Zusatzwalze, Griechenwalzen    - Greek wheel
//         Walzenlage                     - Wheel order
//         Ringstellung                   - Ring setting
//         Grundstellung                  - Start position
//         Steckern                       - Plugs
//

// Sources:
//   https://piotte13.github.io/enigma-cipher/
//   https://www.cryptomuseum.com/crypto/enigma/wiring.htm
//
// Rotors I-V were used by the Heer, Luftwaffe, and Kriegsmarine. The
// Kriegsmarine added rotors VI-VIII to the M3 model, and added Beta & Gamma to
// the M4 model (used with thin reflectors only). Note that Beta & Gamma rotors
// did not rotate.

// Wehrmacht, Luftwaffe, Kriegsmarine
export const I = createRotorFromAlphabet('EKMFLGDQVZNTOWYHXUSPAIBRCJ', 'Q', {
	name: 'I',
	model: 'Enigma I',
	year: 1930
});

// Wehrmacht, Luftwaffe, Kriegsmarine
export const II = createRotorFromAlphabet('AJDKSIRUXBLHWTMCQGZNPYFVOE', 'E', {
	name: 'II',
	model: 'Enigma I',
	year: 1930
});

// Wehrmacht, Luftwaffe, Kriegsmarine
export const III = createRotorFromAlphabet('BDFHJLCPRTXVZNYEIWGAKMUSQO', 'V', {
	name: 'III',
	model: 'Enigma I',
	year: 1930
});

// Wehrmacht, Luftwaffe, Kriegsmarine
export const IV = createRotorFromAlphabet('ESOVPZJAYQUIRHXLNFTGKDCMWB', 'J', {
	name: 'IV',
	model: 'M3 Army',
	year: 1938
});

// Wehrmacht, Luftwaffe, Kriegsmarine
export const V = createRotorFromAlphabet('VZBRGITYUPSDNHLXAWMJQOFECK', 'Z', {
	name: 'V',
	model: 'M3 Army',
	year: 1938
});

// Kriegsmarine
export const VI = createRotorFromAlphabet('JPGVOUMFYQBENHZRDKASXLICTW', 'ZM', {
	name: 'VI',
	model: 'M3 & M4 Naval (FEB 1942)',
	year: 1939
});

// Kriegsmarine
export const VII = createRotorFromAlphabet('NZJHGRCXMYSWBOUFAIVLPEKQDT', 'ZM', {
	name: 'VII',
	model: 'M3 & M4 Naval (FEB 1942)',
	year: 1939
});

// Kriegsmarine
export const VIII = createRotorFromAlphabet('FKQHTLXOCBJSPDZRAMEWNIUYGV', 'ZM', {
	name: 'VIII',
	model: 'M3 & M4 Naval (FEB 1942)',
	year: 1939
});

// Kriegsmarine (U-boat division only)
// This rotor does not rotate!
export const Beta = createRotorFromAlphabet('LEYJVCNIXWPBQMDRTAKZGFUHOS', '', {
	name: 'Beta',
	model: 'U-boat Enigma M4 R2',
	year: 1941
});

// Kriegsmarine (U-boat division only)
// This rotor does not rotate!
export const Gamma = createRotorFromAlphabet('FSOKANUERHMBTIYCWLQPZXVGJD', '', {
	name: 'Gamma',
	model: 'U-boat EnigmaM4 R2',
	year: 1942
});

// Wehrmacht, Luftwaffe
export const UKW_A = createRotorFromAlphabet('EJMZALYXVBWFCRQUONTSPIKHGD', '', {
	name: 'UKW A'
});

// Wehrmacht, Luftwaffe, Kriegsmarine (but not U-boat division)
export const UKW_B = createRotorFromAlphabet('YRUHQSLDPXNGOKMIEBFZCWVJAT', '', {
	name: 'UKW B'
});

// Kriegsmarine (U-boat division only)
export const UKW_B_U = createRotorFromAlphabet('ENKQAUYWJICOPBLMDXZVFTHRGS', '', {
	name: 'UKW B'
});

// Wehrmacht, Luftwaffe, Kriegsmarine (but not U-boat division)
export const UKW_C = createRotorFromAlphabet('FVPJIAOYEDRZXWGCTKUQSBNMHL', '', {
	name: 'UKW C'
});

// Kriegsmarine (U-boat division only)
export const UKW_C_U = createRotorFromAlphabet('RDOBJNTKVEHMLFCWZAXGYIPSUQ', '', {
	name: 'UKW C'
});

// Commercial Enigma A26, aka. Enigma D
// ETW: QWERTZUIOASDFGHJKPYXCVBNML
export const A26_I = createRotorFromAlphabet('LPGSZMHAEOQKVXRFYBUTNICJDW', 'Y', {
	name: 'I',
	model: 'Commercial Enigma A26',
	year: 1926
});
export const A26_II = createRotorFromAlphabet('SLVGBTFXJQOHEWIRZYAMKPCNDU', 'E', {
	name: 'II',
	model: 'Commercial Enigma A26',
	year: 1926
});
export const A26_III = createRotorFromAlphabet('CJGDPSHKTURAWZXFMYNQOBVLIE', 'N', {
	name: 'III',
	model: 'Commercial Enigma A26',
	year: 1926
});
export const A26_UKW = createRotorFromAlphabet('IMETCGFRAYSQBZXWLHKDVUPOJN', '', {
	name: 'UKW',
	model: 'Commercial Enigma A26',
	year: 1926
});

// Swiss Enigma K, also known as Swiss-K
// ETW: QWERTZUIOASDFGHJKPYXCVBNML
export const SwissI = createRotorFromAlphabet('PEZUOHXSCVFMTBGLRINQJWAYDK', 'Y', {
	name: 'I',
	model: 'Swiss Enigma K variant'
});
export const SwissII = createRotorFromAlphabet('ZOUESYDKFWPCIQXHMVBLGNJRAT', 'E', {
	name: 'II',
	model: 'Swiss Enigma K variant'
});
export const SwissIII = createRotorFromAlphabet('EHRVXGAOBQUSIMZFLYNWKTPDJC', 'N', {
	name: 'III',
	model: 'Swiss Enigma K variant'
});
export const SwissUKW = createRotorFromAlphabet('IMETCGFRAYSQBZXWLHKDVUPOJN', '', {
	name: 'UKW',
	model: 'Swiss Enigma K variant'
});

// Enigma G, aka. Zählwerk Enigma A28 and G31
// ETW: QWERTZUIOASDFGHJKPYXCVBNML
export const Zahlwerk_I = createRotorFromAlphabet(
	'LPGSZMHAEOQKVXRFYBUTNICJDW',
	'SUVWZABCEFGIKLOPQ',
	{
		name: 'I',
		model: 'Zählwerk Enigma A28 & G31'
	}
);
export const Zahlwerk_II = createRotorFromAlphabet(
	'SLVGBTFXJQOHEWIRZYAMKPCNDU',
	'STVYZACDFGHKMNQ',
	{
		name: 'II',
		model: 'Zählwerk Enigma A28 & G31'
	}
);
export const Zahlwerk_III = createRotorFromAlphabet('CJGDPSHKTURAWZXFMYNQOBVLIE', 'UWXAEFHKMNR', {
	name: 'III',
	model: 'Zählwerk Enigma A28 & G31'
});
export const Zahlwerk_UKW = createRotorFromAlphabet('IMETCGFRAYSQBZXWLHKDVUPOJN', '', {
	name: 'UKW',
	model: 'Zählwerk Enigma A28 & G31'
});

// Enigma T, Tirpitz, Japanese Enigma
// ETW: KZROUQHYAIGBLWVSTDXFPNMCJE
export const Tirpitz_I = createRotorFromAlphabet('KPTYUELOCVGRFQDANJMBSWHZXI', 'WZEKQ', {
	name: 'I',
	model: 'Tirpitz'
});
export const Tirpitz_II = createRotorFromAlphabet('UPHZLWEQMTDJXCAKSOIGVBYFNR', 'WZFLR', {
	name: 'II',
	model: 'Tirpitz'
});
export const Tirpitz_III = createRotorFromAlphabet('QUDLYRFEKONVZAXWHMGPJBSICT', 'WZEKQ', {
	name: 'III',
	model: 'Tirpitz'
});
export const Tirpitz_IV = createRotorFromAlphabet('CIWTBKXNRESPFLYDAGVHQUOJZM', 'WZFLR', {
	name: 'IV',
	model: 'Tirpitz'
});
export const Tirpitz_V = createRotorFromAlphabet('UAXGISNJBVERDYLFZWTPCKOHMQ', 'YCFKR', {
	name: 'V',
	model: 'Tirpitz'
});
export const Tirpitz_VI = createRotorFromAlphabet('XFUZGALVHCNYSEWQTDMRBKPIOJ', 'XEIMQ', {
	name: 'VI',
	model: 'Tirpitz'
});
export const Tirpitz_VII = createRotorFromAlphabet('BJVFTXPLNAYOZIKWGDQERUCHSM', 'YCFKR', {
	name: 'VII',
	model: 'Tirpitz'
});
export const Tirpitz_VIII = createRotorFromAlphabet('YMTPNZHWKODAJXELUQVGCBISFR', 'XEIMQ', {
	name: 'VIII',
	model: 'Tirpitz'
});
export const Tirpitz_UKW = createRotorFromAlphabet('GEKPBTAUMOCNILJDXZYFHWVQSR', '', {
	name: 'UKW',
	model: 'Tirpitz'
});
