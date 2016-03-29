'use strict';

let BaseCipher = require('../base-cipher').BaseCipher;

class SubstitutionCipher extends BaseCipher{
	constructor(openText, alphabet, key) {
		super(openText, alphabet, key);
	}

	encodeText() {
		this.encodedText = this.openText.split('')
			.map((letter, index) => this.alphabet[(this.alphabetMap[letter] + this.key) % this.alphabet.length])
			.join('');
	}

	decodeText() {
		this.decodedText = this.encodedText.split('')
			.map((letter, index) => {
				let newIndex = (this.alphabetMap[letter] - this.key) % this.alphabet.length;
				return !(newIndex < 0) ? this.alphabet[newIndex] : this.alphabet[this.alphabet.length + newIndex];
			})
			.join('');
	}
}

module.exports.SubstitutionCipher = SubstitutionCipher;