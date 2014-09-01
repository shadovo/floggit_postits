'use strict';

/**
 * @ngdoc filter
 * @name floggitPostitsApp.filter:titlecase
 * @function
 * @description
 * # titlecase
 * Filter in the floggitPostitsApp.
 */
angular.module('floggitPostitsApp')
	.filter('titlecase', function () {
		return function (input) {
			var i, j, words, wordWithHyphen, firstWordWithHyphen,
				secondWordWithHyphen, wholeWord, output = '';

			if (angular.isString(input)) {
				output = input.toLowerCase();
				words = output.split(' ');

				for (i = 0; i < words.length; i++) {
					words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1, words[i].length);
				}

				for (j = 0; j < words.length; j++) {
					if (words[j].indexOf('-') !== -1) {
						wordWithHyphen = words[j].split('-');
						firstWordWithHyphen = wordWithHyphen[0];
						secondWordWithHyphen = wordWithHyphen[1];
						firstWordWithHyphen = firstWordWithHyphen.charAt(0).toUpperCase() + firstWordWithHyphen.substring(1, firstWordWithHyphen.length);
						secondWordWithHyphen = secondWordWithHyphen.charAt(0).toUpperCase() + secondWordWithHyphen.substring(1, secondWordWithHyphen.length);
						wholeWord = firstWordWithHyphen + '-' + secondWordWithHyphen;
						words[j] = wholeWord;
					}
				}
				output = words.join(' ');
				return output;

			} else {
				return input;
			}
		};
	});