'use strict';

let BaseCipher = require('../base-cipher').BaseCipher;

let MathUtils = require('../../thirdparty/math-utils').MathUtils;

let gcd = MathUtils.gcd;
let inverseModal = MathUtils.inverseModal;
let getRandomInt = MathUtils.getRandomInt;
let eratostheneSieve = MathUtils.eratostheneSieve;

class AffineCipher extends BaseCipher{
	constructor(openText, alphabet, key) {
		super(openText, alphabet);
		if(!key) {
			this.initKey();
		}

	}

	encodeText() {
		this.encodedText = this.openText.split('')
			.map((letter, index) => this.alphabet[this.encodingFunction(this.alphabetMap[letter])])
			.join('');
	}

	decodeText() {
		this.decodedText = this.encodedText.split('')
			.map((letter, index) => {
				let newIndex = this.decodingFunction(this.alphabetMap[letter]);
				return !(newIndex < 0) ? this.alphabet[newIndex] : this.alphabet[this.alphabet.length + newIndex];
			})
			.join('');
	}

	initKey() {
		let primes = eratostheneSieve(this.alphabet.length - 1);
		let aIndex = getRandomInt(0, Math.ceil(primes.length / 2) - 1);
		let bIndex = getRandomInt(Math.ceil(primes.length / 2), primes.length - 1);

		if(gcd(primes[aIndex], this.alphabet.length) !== 1) {
			this.initKey();
		} else {
			this.key =  {
				a: primes[aIndex],
				b: primes[bIndex],
				m: this.alphabet.length,
				aOpposite: inverseModal(primes[aIndex], this.alphabet.length)
			}
		}
	}

	encodingFunction(x) {
		return (this.key.a * x + this.key.b) % this.key.m;
	}

	decodingFunction(x) {
		return (this.key.aOpposite * (x - this.key.b)) % this.key.m;
	}
}

module.exports.AffineCipher = AffineCipher;