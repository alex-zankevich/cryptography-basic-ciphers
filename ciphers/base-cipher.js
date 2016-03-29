'use strict';

class BaseCipher {
	constructor(openText, alphabet, key) {
		this.alphabet = alphabet
			.toUpperCase()
			.split('');

		this.alphabetMap = {};
		this.alphabet.forEach((letter, index) => this.alphabetMap[letter] = index);

		this.openText = openText
			.replace(new RegExp(`[^${alphabet}]`, 'gim'), '')
			.toUpperCase();

		if(key) {
			if(isFinite(key)) {
				this.key = key;
			} else {
				this.key = key.toUpperCase();
			}
		} else {
			this.key = '';
		}

		this.encodedText = null;
		this.decodedText = null;
	}
}

module.exports.BaseCipher = BaseCipher;