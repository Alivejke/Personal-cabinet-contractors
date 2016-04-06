require('angular');
require('angular-ui-router');
var app = angular.module('contractor', ['ui.router']);
//constants	
app.constant('constants', require('./constants/constants'));
//filters
app.filter('phoneNumberFilter', require('./filters/phoneNumberFilter'));
app.filter('emptyValueFilter', ['constants', require('./filters/emptyValueFilter')]);
//providers
app.provider('dataService', require('./services/dataService'));
//services
app.service('officeRoomService', ['$q', '$timeout', require('./services/officeRoomService')]);
//directives
app.directive('toggleActive', require('./directives/toggleActive'));
//controllers
app.controller('applicationController', ['$scope', require('./controllers/applicationController')]);
app.controller('contractorsListController', ['$scope', 'dataService', 'officeRoomService', '$state', require('./controllers/contractorsListController')]);
app.controller('contractorsRoomController', ['$scope', 'officeRoomService', '$state', require('./controllers/contractorsRoomController')]);
app.controller('contractorsInfoController', ['$scope', 'dataService', '$state', 'previousState', require('./controllers/contractorsInfoController')]);
//config/run stage
app.config(['constants', 'dataServiceProvider', '$stateProvider', '$locationProvider', function (constants, dataServiceProvider, $stateProvider, $locationProvider) {
	//configuring dataServiceProvider
	dataServiceProvider.setDataUrl(constants.DATA_URL);
	//configuring application states
	if(constants.routes && typeof(constants) == 'object') {
		angular.forEach(constants.routes, function (currentState) {
			var views = {};
			angular.forEach(currentState.views, function (currentView) {
				views[currentView.id] = {
					templateUrl : currentView.templateUrl,
					controller : currentView.controller
				};
			});
			$stateProvider
				.state(currentState.id, {
					url : currentState.url,
					views : views,
					resolve: {
						previousState: [
							"$state",
							function ($state) {
								var currentStateData = {
									name: $state.current.name,
									params: $state.params,
									url: $state.href($state.current.name, $state.params)
								};
								return currentStateData;
							}
						]
					},
				});	
		});
		$locationProvider.html5Mode(true);
	}
}]);