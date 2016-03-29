'use strict';
let fs = require('fs');

let NodeUtils = {
	deleteFolderRecursive: function(path) {
	  if( fs.existsSync(path) ) {
	    fs.readdirSync(path).forEach(function(file,index){
	      let curPath = path + "/" + file;
	      if(fs.lstatSync(curPath).isDirectory()) {
	        deleteFolderRecursive(curPath);
	      } else {
	        fs.unlinkSync(curPath);
	      }
	    });
	    fs.rmdirSync(path);
	  }
	}
}

module.exports.NodeUtils = NodeUtils;