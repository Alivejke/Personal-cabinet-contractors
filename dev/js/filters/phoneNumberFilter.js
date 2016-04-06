'use strict';

module.exports = function(){
	return function(input) {
		if (input && typeof(input) == 'string') 
			input = input.replace(/\[|\]/ig,''); 
		return input;
	}
}