'use strict';

let BaseCipher = require('../base-cipher').BaseCipher;

class TranspositionCipher extends BaseCipher{
	constructor(openText, alphabet, key) {
		super(openText, alphabet, key);
		this.matrixSize = key;
		this.codeMatrix = (new Array(Math.ceil(this.openText.length / this.matrixSize))
				.fill((new Array(this.matrixSize)).fill('A')));
	}

	encodeText() {
		this.codeMatrix = this.codeMatrix.map((str, line) => str.map((el, collumn) => {
				if(this.openText.split('')[line * this.matrixSize + collumn]) {
					return this.openText.split('')[line * this.matrixSize + collumn];
				} else {
					return el;
				}
			}));

		this.encodedText = [];

		for(let i = 0; i < this.matrixSize; i++) {
			for(let j = 0; j < this.codeMatrix.length; j++) {
				if(this.codeMatrix[j][i]) {
					this.encodedText.push(this.codeMatrix[j][i]);
				}
			}
		}

		this.encodedText = this.encodedText.join('');
	}

	decodeText() {
		for(let i = 0; i < this.matrixSize; i++) {
			for(let j = 0; j < this.codeMatrix.length; j++) {
				this.codeMatrix[j][i] = this.encodedText.split('')[this.codeMatrix.length * i + j];
			}
		}

		this.decodedText = this.codeMatrix
			.map((str) => str.join(''))
			.join('');
	}
}

module.exports.TranspositionCipher = TranspositionCipher;