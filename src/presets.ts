import { Rotor } from './Rotor';

// Terms:
//   ETW - Eintrittzwalze - Entry disk
//   UKW - Umkehrwalze    - Reflector

// Sources:
//   https://piotte13.github.io/enigma-cipher/
//   https://www.cryptomuseum.com/crypto/enigma/wiring.htm
//
// Rotors I-V were used by the Heer, Luftwaffe, and Kriegsmarine. The
// Kriegsmarine added rotors VI-VIII to the M3 model, and added Beta & Gamma to
// the M4 model (used with thin reflectors only). Note that Beta & Gamma rotors
// did not rotate.

// Wehrmacht, Luftwaffe, Kriegsmarine
export const I = Rotor.fromAlphabet('EKMFLGDQVZNTOWYHXUSPAIBRCJ', 'Q', {
	name: 'I',
	model: 'Enigma I',
	year: 1930
});

// Wehrmacht, Luftwaffe, Kriegsmarine
export const II = Rotor.fromAlphabet('AJDKSIRUXBLHWTMCQGZNPYFVOE', 'E', {
	name: 'II',
	model: 'Enigma I',
	year: 1930
});

// Wehrmacht, Luftwaffe, Kriegsmarine
export const III = Rotor.fromAlphabet('BDFHJLCPRTXVZNYEIWGAKMUSQO', 'V', {
	name: 'III',
	model: 'Enigma I',
	year: 1930
});

// Wehrmacht, Luftwaffe, Kriegsmarine
export const IV = Rotor.fromAlphabet('ESOVPZJAYQUIRHXLNFTGKDCMWB', 'J', {
	name: 'IV',
	model: 'M3 Army',
	year: 1938
});

// Wehrmacht, Luftwaffe, Kriegsmarine
export const V = Rotor.fromAlphabet('VZBRGITYUPSDNHLXAWMJQOFECK', 'Z', {
	name: 'V',
	model: 'M3 Army',
	year: 1938
});

// Kriegsmarine
export const VI = Rotor.fromAlphabet('JPGVOUMFYQBENHZRDKASXLICTW', 'ZM', {
	name: 'VI',
	model: 'M3 & M4 Naval (FEB 1942)',
	year: 1939
});

// Kriegsmarine
export const VII = Rotor.fromAlphabet('NZJHGRCXMYSWBOUFAIVLPEKQDT', 'ZM', {
	name: 'VII',
	model: 'M3 & M4 Naval (FEB 1942)',
	year: 1939
});

// Kriegsmarine
export const VIII = Rotor.fromAlphabet('FKQHTLXOCBJSPDZRAMEWNIUYGV', 'ZM', {
	name: 'VIII',
	model: 'M3 & M4 Naval (FEB 1942)',
	year: 1939
});

// Kriegsmarine (U-boat division only)
// This rotor does not rotate!
export const Beta = Rotor.fromAlphabet('LEYJVCNIXWPBQMDRTAKZGFUHOS', '', {
	name: 'Beta',
	model: 'U-boat Enigma M4 R2',
	year: 1941
});

// Kriegsmarine (U-boat division only)
// This rotor does not rotate!
export const Gamma = Rotor.fromAlphabet('FSOKANUERHMBTIYCWLQPZXVGJD', '', {
	name: 'Gamma',
	model: 'U-boat EnigmaM4 R2',
	year: 1942
});

// Wehrmacht, Luftwaffe
export const UKW_A = Rotor.fromAlphabet('EJMZALYXVBWFCRQUONTSPIKHGD', '', {
	name: 'UKW A'
});

// Wehrmacht, Luftwaffe, Kriegsmarine (but not U-boat division)
export const UKW_B = Rotor.fromAlphabet('YRUHQSLDPXNGOKMIEBFZCWVJAT', '', {
	name: 'UKW B'
});

// Kriegsmarine (U-boat division only)
export const UKW_B_U = Rotor.fromAlphabet('ENKQAUYWJICOPBLMDXZVFTHRGS', '', {
	name: 'UKW B'
});

// Wehrmacht, Luftwaffe, Kriegsmarine (but not U-boat division)
export const UKW_C = Rotor.fromAlphabet('FVPJIAOYEDRZXWGCTKUQSBNMHL', '', {
	name: 'UKW C'
});

// Kriegsmarine (U-boat division only)
export const UKW_C_U = Rotor.fromAlphabet('RDOBJNTKVEHMLFCWZAXGYIPSUQ', '', {
	name: 'UKW C'
});

// Commercial Enigma A26, aka. Enigma D
// ETW: QWERTZUIOASDFGHJKPYXCVBNML
export const A26_I = Rotor.fromAlphabet('LPGSZMHAEOQKVXRFYBUTNICJDW', 'Y', {
	name: 'I',
	model: 'Commercial Enigma A26',
	year: 1926
});
export const A26_II = Rotor.fromAlphabet('SLVGBTFXJQOHEWIRZYAMKPCNDU', 'E', {
	name: 'II',
	model: 'Commercial Enigma A26',
	year: 1926
});
export const A26_III = Rotor.fromAlphabet('CJGDPSHKTURAWZXFMYNQOBVLIE', 'N', {
	name: 'III',
	model: 'Commercial Enigma A26',
	year: 1926
});
export const A26_UKW = Rotor.fromAlphabet('IMETCGFRAYSQBZXWLHKDVUPOJN', '', {
	name: 'UKW',
	model: 'Commercial Enigma A26',
	year: 1926
});

// Swiss Enigma K, also known as Swiss-K
// ETW: QWERTZUIOASDFGHJKPYXCVBNML
export const SwissI = Rotor.fromAlphabet('PEZUOHXSCVFMTBGLRINQJWAYDK', 'Y', {
	name: 'I',
	model: 'Swiss Enigma K variant'
});
export const SwissII = Rotor.fromAlphabet('ZOUESYDKFWPCIQXHMVBLGNJRAT', 'E', {
	name: 'II',
	model: 'Swiss Enigma K variant'
});
export const SwissIII = Rotor.fromAlphabet('EHRVXGAOBQUSIMZFLYNWKTPDJC', 'N', {
	name: 'III',
	model: 'Swiss Enigma K variant'
});
export const SwissUKW = Rotor.fromAlphabet('IMETCGFRAYSQBZXWLHKDVUPOJN', '', {
	name: 'UKW',
	model: 'Swiss Enigma K variant'
});

// Enigma G, aka. Zählwerk Enigma A28 and G31
// ETW: QWERTZUIOASDFGHJKPYXCVBNML
export const Zahlwerk_I = Rotor.fromAlphabet('LPGSZMHAEOQKVXRFYBUTNICJDW', 'SUVWZABCEFGIKLOPQ', {
	name: 'I',
	model: 'Zählwerk Enigma A28 & G31'
});
export const Zahlwerk_II = Rotor.fromAlphabet('SLVGBTFXJQOHEWIRZYAMKPCNDU', 'STVYZACDFGHKMNQ', {
	name: 'II',
	model: 'Zählwerk Enigma A28 & G31'
});
export const Zahlwerk_III = Rotor.fromAlphabet('CJGDPSHKTURAWZXFMYNQOBVLIE', 'UWXAEFHKMNR', {
	name: 'III',
	model: 'Zählwerk Enigma A28 & G31'
});
export const Zahlwerk_UKW = Rotor.fromAlphabet('IMETCGFRAYSQBZXWLHKDVUPOJN', '', {
	name: 'UKW',
	model: 'Zählwerk Enigma A28 & G31'
});

// Enigma T, Tirpitz, Japanese Enigma
// ETW: KZROUQHYAIGBLWVSTDXFPNMCJE
export const Tirpitz_I = Rotor.fromAlphabet('KPTYUELOCVGRFQDANJMBSWHZXI', 'WZEKQ', {
	name: 'I',
	model: 'Tirpitz'
});
export const Tirpitz_II = Rotor.fromAlphabet('UPHZLWEQMTDJXCAKSOIGVBYFNR', 'WZFLR', {
	name: 'II',
	model: 'Tirpitz'
});
export const Tirpitz_III = Rotor.fromAlphabet('QUDLYRFEKONVZAXWHMGPJBSICT', 'WZEKQ', {
	name: 'III',
	model: 'Tirpitz'
});
export const Tirpitz_IV = Rotor.fromAlphabet('CIWTBKXNRESPFLYDAGVHQUOJZM', 'WZFLR', {
	name: 'IV',
	model: 'Tirpitz'
});
export const Tirpitz_V = Rotor.fromAlphabet('UAXGISNJBVERDYLFZWTPCKOHMQ', 'YCFKR', {
	name: 'V',
	model: 'Tirpitz'
});
export const Tirpitz_VI = Rotor.fromAlphabet('XFUZGALVHCNYSEWQTDMRBKPIOJ', 'XEIMQ', {
	name: 'VI',
	model: 'Tirpitz'
});
export const Tirpitz_VII = Rotor.fromAlphabet('BJVFTXPLNAYOZIKWGDQERUCHSM', 'YCFKR', {
	name: 'VII',
	model: 'Tirpitz'
});
export const Tirpitz_VIII = Rotor.fromAlphabet('YMTPNZHWKODAJXELUQVGCBISFR', 'XEIMQ', {
	name: 'VIII',
	model: 'Tirpitz'
});
export const Tirpitz_UKW = Rotor.fromAlphabet('GEKPBTAUMOCNILJDXZYFHWVQSR', '', {
	name: 'UKW',
	model: 'Tirpitz'
});
