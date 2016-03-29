'use strict';

let BaseCipher = require('../base-cipher').BaseCipher;

class VigenereCipher extends BaseCipher{
	constructor(openText, alphabet, key) {
		super(openText, alphabet, key);

		this.keyArray = this.key.split('');

		this.keyMap = {};
		this.keyArray.forEach((letter, index) => this.keyMap[letter] = this.alphabetMap[letter]);

		this.tableSize = this.alphabet.length;
		this.vigenereTable = (new Array(this.tableSize))
			.fill(this.alphabet)
			.map((str, index) =>  str.map((letter) => this.alphabet[(this.alphabetMap[letter] + index) % this.alphabet.length]));
	}

	encodeText() {
		this.encodedText = this.openText
			.split('')
			.map((letter, index) => this.vigenereTable[this.alphabetMap[this.keyArray[index % this.key.length]]][this.alphabetMap[letter]])
			.join('');
	}

	decodeText() {
		this.decodedText = this.encodedText
			.split('')
			.map((letter, index) => this.alphabet[this.vigenereTable[this.alphabetMap[this.keyArray[index % this.key.length]]].findIndex((el) => el === letter)])
			.join('');
	}
}

module.exports.VigenereCipher = VigenereCipher;