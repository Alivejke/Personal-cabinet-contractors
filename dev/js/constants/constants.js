'use strict';

module.exports = {
	// different URLs for remote data access
	DATA_URL : 'data/data.json',
	// inner route states
	routes : [
		{
			id : 'contractors',
			url : '/',
			views : [{
				id : 'contractors-layout',
				templateUrl : 'templates/contractors_list.htm',
				controller : 'contractorsListController'
			}]				
		}, {
			id : 'room',
			url : '/room',
			views : [{
				id : 'contractors-layout',
				templateUrl : 'templates/contractors_list.htm',
				controller : 'contractorsRoomController'
			}]				
		}, {
			id : 'info',
			url : '/info?id',
			views : [{
				id : 'contractors-layout',
				templateUrl : 'templates/contractors_info.htm',
				controller : 'contractorsInfoController'
			}]				
		}	
	],
	// string contants
	STR_EMPTY_VALUE : 'NOT_SET'
}