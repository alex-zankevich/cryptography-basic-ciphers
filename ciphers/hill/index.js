'use strict';

let BaseCipher = require('../base-cipher').BaseCipher;

let math = require('mathjs');;

let MathUtils = require('../../thirdparty/math-utils').MathUtils;

let inverseModal = MathUtils.inverseModal;

class HillCipher extends BaseCipher{
	constructor(openText, alphabet, key) {
		super(openText, alphabet);

		this.keySize = key ? key.length : 3;

		if(!key) {
			this.initKey();
		} else {
			this.key = key;
		}
	}

	inverseModulo(matr) {
		let matrLength = matr.length;

		function algebraAdd(iIndex, jIndex) {
			var newMatr = [];
			var alg = [];

			for (var i = 0; i < matr.length; i++) {
				for(var j = 0; j < matrLength; j++) {
					if(i !== iIndex && j !== jIndex) {
						newMatr.push(matr[i][j]);
					}
				}
			}

			while (newMatr.length) alg.push(newMatr.splice(0, matrLength - 1));

			return math.pow(-1, iIndex + jIndex) * math.det(alg);
		}

		return math.multiply(inverseModal(math.det(matr), this.alphabet.length), math.transpose(matr.map((str, iIndex) => 
			str.map((item, jIndex) => algebraAdd(iIndex, jIndex)))));
	}

	encodeText() {
		this.encodedText = (this.openText + (new Array(this.openText.length % this.keySize + 1)
			.fill('A').join('')))
		.match(/.{1,3}/gim)
		.map((chunk) => math.multiply(this.key, chunk.split('')
			.map((letter) => this.alphabetMap[letter]))
			.map((code) => this.alphabet[code % this.alphabet.length])
			.join(''))
		.join('')
		.substring(0, this.openText.length);
	}

	decodeText() {
		this.decodedText = (this.encodedText + (new Array(this.encodedText.length % this.keySize + 1)
			.fill('A').join('')))
		.match(/.{1,3}/gim)
		.map((chunk) => math.multiply(this.inverseModulo(this.key), chunk.split('')
			.map((letter) => this.alphabetMap[letter]))
			.map((code) => this.alphabet[code < 0
				?(this.alphabet.length + (code % this.alphabet.length)) % this.alphabet.length
				: code % this.alphabet.length])
			.join(''))
		.join('')
		.substring(0, this.openText.length);
	}

	initKey() {
		this.key = (new Array(this.keySize))
			.fill(new Array(this.keySize).fill(0))
			.map((str, line) => 
				str.map((item, col) => 
					math.randomInt(this.alphabet.length - 1)));

		this.keySize = this.key.length;

		if(!math.det(this.key)) {
			this.initKey();
		}
	}
}

module.exports.HillCipher = HillCipher;