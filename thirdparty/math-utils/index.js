'use strict';

let MathUtils = {
	gcd: function gcd(a, b) {
	  return b ? gcd(b, a % b) : a;
	},
	getRandomInt: function(min, max) {
	  return Math.floor(Math.random() * (max - min + 1) + min);
	},
	inverseModal: function(m, n) {
		let a = m;
		let b = n;
		let x = 0;
		let d = 1;

		while(a > 0) {
			let q = Math.floor(b / a);
			let y = a;
			a = b % a;
			b = y;
			y = d;
			d = x - q * d;
			x = y;
		}

		x = x % n;

		if(x < 0) {
			x = (x + n) % n;
		}

		if(x === 1) {
			inverseModal(m, n);
		}

		return x;
	},
	eratostheneSieve: function(number) {
		var array = [];
		var upperLimit = Math.sqrt(number);
		var output = [];

	    for (var i = 0; i < number; i++) {
	        array.push(true);
	    }

	    for (var i = 2; i <= upperLimit; i++) {
	        if (array[i]) {
	            for (var j = i * i; j < number; j += i) {
	                array[j] = false;
	            }
	        }
	    }

	    for (var i = 2; i < number; i++) {
	        if(array[i]) {
	            output.push(i);
	        }
	    }

	    return output;
	}
}

module.exports.MathUtils = MathUtils;