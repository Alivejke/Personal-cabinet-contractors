 module.exports = function ($scope) {
	 $scope.loaded = true;
	 $scope.$on('changeLoadState', function (event, data) {
		 $scope.loaded = data;
	 })
 }