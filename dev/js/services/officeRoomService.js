'use strict';

module.exports = function ($q, $timeout) {
	
	var contractors = {};
	
	this.addContractor = function (id, contractor) {
		this.removeContractor(id);
		contractors[id] = contractor;
	};
	
	this.removeContractor = function (id) {
		if(contractors.hasOwnProperty(id)) {
			delete contractors[id]
		};
		return this;
	};
	
	this.hasContractor = function (id) {
		return contractors.hasOwnProperty(id);		
	};
					
	this.getContractors = function () {
		var result = [],
			deferred = $q.defer();
		$timeout(function () {
			angular.forEach(contractors, function(value, key) {
				result.push(value);			
			});
			deferred.resolve(result);	
		})
		return deferred.promise;			
	};
}