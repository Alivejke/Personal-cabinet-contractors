'use strict';
 
module.exports = function () {
	var dataUrl = '';
	this.setDataUrl = function (url) {
		dataUrl = url;
	};
	this.$get = ['$http', '$log', '$q', '$timeout', function($http, $log, $q, $timeout){
		var DataService = function () {
			this.data = [];
		};
		DataService.prototype.getContractor = function (id) {
			var deferred = $q.defer();
			$timeout(function () {
				var filtered = this.data.filter(function(value){
					return value.id == id;
				});
				if(filtered.length) {
					deferred.resolve(filtered[0]);
				} else {
					deferred.resolve(undefined);
				}
			}.bind(this))
			return deferred.promise;	
		};		
		DataService.prototype.loadData = function () {
			if(!dataUrl){
				$log.error('Data url was not set');
			};
			var deferred = $q.defer();
			$http.get(dataUrl).then(function (result) {
				this.data = result.data;
				deferred.resolve(this.data);
			}.bind(this), function () {
				this.data = [];
				deferred.resolve(this.data);
			}.bind(this));
			return deferred.promise;
		};
		return new DataService();
	}];	
};