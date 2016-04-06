module.exports = function ($scope, dataService, $state, previousState) {
	$scope.$emit('changeLoadState', false);
	dataService.getContractor($state.params.id).then(function (contractor) {
		$scope.contractor = contractor;
		$scope.$emit('changeLoadState', true);
	});
	$scope.gotoBack = function() {
		$state.go(previousState.name, previousState.params);
	};	
};