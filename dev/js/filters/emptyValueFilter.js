'use strict';

module.exports = function(constants) {
	return function(input) {
		if(!input) {
			return constants.STR_EMPTY_VALUE;
		} else {
			return input;
		}
	}
}