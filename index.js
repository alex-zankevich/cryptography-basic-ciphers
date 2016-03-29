'use strict';
 
let fs = require('fs');

let NodeUtils = require('./thirdparty/node-utils').NodeUtils;

let deleteFolderRecursive = NodeUtils.deleteFolderRecursive;

let TranspositionCipher = require('./ciphers/transposition').TranspositionCipher;
let SubstitutionCipher = require('./ciphers/substitution').SubstitutionCipher;
let VigenereCipher = require('./ciphers/vigenere').VigenereCipher;
let AffineCipher = require('./ciphers/affine').AffineCipher;

let openText = '';
let alphabet = '';
let key = '';

let readInputFiles = function() {
	openText = fs.readFileSync('input/sourcetext.txt', { encoding: 'utf-8'});
	alphabet = fs.readFileSync('input/alphabet.txt', { encoding: 'utf-8'});
	key = fs.readFileSync('input/key.txt', { encoding: 'utf-8'});
}

let writeOutputFile = function(cipher) {
	let cipherDir = cipher.constructor.name.toLowerCase();
	
	deleteFolderRecursive(`./output/${cipherDir}`);
	
	if(!fs.existsSync(cipherDir)) {
		fs.mkdir(`output/${cipherDir}`);
	}

	fs.writeFileSync(`output/${cipherDir}/encoded.txt`, cipher.encodedText);
	fs.writeFileSync(`output/${cipherDir}/decoded.txt`, cipher.decodedText);
}

let runCipher = function(Cipher, params) {
	let cipher = new Cipher(params.openText, params.alphabet, params.key);
	
	cipher.encodeText();
	cipher.decodeText();

	writeOutputFile(cipher);
}

readInputFiles();

runCipher(TranspositionCipher, {
	openText: openText,
	alphabet: alphabet,
	key:3
});

runCipher(SubstitutionCipher, {
	openText: openText,
	alphabet: alphabet,
	key: 3
});

runCipher(VigenereCipher, {
	openText: openText,
	alphabet: alphabet,
	key: key
});

runCipher(AffineCipher, {
	openText: openText,
	alphabet: alphabet
});
