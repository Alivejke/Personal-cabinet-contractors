module.exports = function ($scope, officeRoomService, $state) {
	$scope.currentState = $state.current.name;
	$scope.listData = {};
	$scope.listData.searcheCriteria = '';
	$scope.$emit('changeLoadState', false);
	
	officeRoomService.getContractors().then(function(data) {
		$scope.listData.contractors = data;
		$scope.$emit('changeLoadState', true);
	});
	
	$scope.roomHasContractor = function (contractor) {
		return officeRoomService.hasContractor(contractor.id);	
	};
	
	$scope.removeContractorFromRoom = function (contractor) {
		officeRoomService
			.removeContractor(contractor.id)
			.getContractors().then(function(data) {
				$scope.listData.contractors = data;
			});	
	};
	
	$scope.search = function () {
		$scope.listData.searcheCriteria = $scope.listData.searcheCriteriaViewData;
	};
		
}