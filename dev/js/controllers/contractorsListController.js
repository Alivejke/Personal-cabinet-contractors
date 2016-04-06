'use strict';

module.exports = function ($scope, dataService, officeRoomService, $state) {
	$scope.$emit('changeLoadState', false);
		
	$scope.currentState = $state.current.name;
	$scope.listData = {};
	$scope.listData.searcheCriteriaViewData = '';
	$scope.listData.searcheCriteria = '';
		
	dataService.loadData().then(function(data) {
		$scope.listData.contractors = data;
		$scope.$emit('changeLoadState', true);
	});
	
	$scope.addContractorToRoom = function (contractor) {
		officeRoomService.addContractor(contractor.id, contractor);	
	};
	
	$scope.removeContractorFromRoom = function (contractor) {
		officeRoomService.removeContractor(contractor.id);
	};
	
	$scope.roomHasContractor = function (contractor) {
		return officeRoomService.hasContractor(contractor.id);	
	};
	
	$scope.search = function () {
		$scope.listData.searcheCriteria = $scope.listData.searcheCriteriaViewData;
	};
};