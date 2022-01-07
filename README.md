# @wvbe/enigma-machine

An Enigma machine that encodes string messages, one letter at a time.

Not the most performant, not the most secure. Actually quite a hassle to use. But fun to code,
and maybe interesting to look at.

Comes with a bunch of rotors and reflectors that actually existed.

```ts
import { Machine, I, II, III, UKW_B } from '@wvbe/enigma-machine';

const machine = new Machine();
machine.addRotor(I.clone());
machine.addRotor(II.clone());
machine.addRotor(III.clone());
machine.setReflector(UKW_B.clone());

machine.encode('A'); // "F"
machine.encode('A'); // "T"
```

## Great resources

-   http://www.intelligenia.org/downloads/enigvar2.pdf
-   http://www.mlb.co.jp/linux/science/genigma/enigma-referat/node4.html
-   https://en.wikipedia.org/wiki/Enigma_machine
-   https://en.wikipedia.org/wiki/Enigma_rotor_details
-   https://hackaday.com/wp-content/uploads/2017/08/enigma_keylist_3_rotor.jpg
-   https://piotte13.github.io/enigma-cipher/
-   https://web.stanford.edu/class/cs106j/handouts/36-TheEnigmaMachine.pdf
-   https://www.cryptomuseum.com/crypto/enigma/wiring.htm

## License

Copyright (c) 2022 Wybe Minnebo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.**