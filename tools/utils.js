/* eslint-disable */
'use strict';

const fs = require('fs'),
	  path = require('path');

module.exports = {
	/**
	 * get html files automatically
	 * @param  {String} srcPath [directory contains html files]
	 * @return {Array}          [array of html files path]
	 */
	getHtmlFile: function(srcPath) {
		// read html filename from
		let srcFiles = fs.readdirSync(srcPath);

		srcFiles = srcFiles.filter((item, index) => {
		    return !!~item.indexOf('.html');
		});

		srcFiles = srcFiles.map((item, index) => {
		    return item.replace('.html', '');
		});

		return srcFiles;
	},
	/**
	 *  get js files automatically
	 * @param  {String} srcPath [directory contains js files]
	 * @param  {String} jsDirectory [js directory]
	 * @param  {String} fileName    [js filename]
	 * @param  {Array} extensions   [possiable js extension]
	 * @return {Object}             [Object of js files path]
	 */
	getJsFile: function(srcPath, jsDirectory, fileName, extensions) {
		let jsFileArray = {};
		//read js filename
		let srcFiles = fs.readdirSync(path.join(srcPath, jsDirectory));
		console.log(srcFiles)

		srcFiles = srcFiles.filter((item, index) => {
		    return item !== 'common';
		});

		srcFiles.map((item, index) => {
			let p = path.join(srcPath, jsDirectory, item);
			if (fs.statSync(p).isDirectory()) {
				let allFiles = fs.readdirSync(path.join(srcPath, jsDirectory, item));
				allFiles.map((f) => {
					let jsPath = path.join(srcPath, jsDirectory, item, f);
					let regx=/^main(-(\w*))?.(jsx|js)$/i
					let match = f.match(regx)
					if (fs.statSync(jsPath).isFile() && match) {
						let part = match[2]
						if (part) {
							jsFileArray[item + '-' + part] = [jsPath];
						}else{
							jsFileArray[item] = [jsPath];
						}
					}
				})
			}
		});
		return jsFileArray;
	}
};
