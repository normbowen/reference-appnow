
'use strict';

angular.module('myApp').controller('EditOlympicMedalController', function ($scope, $routeParams, $location, OlympicMedalService) {
	$scope.olympicMedal = {
		athlete : '', 
		age : 0, 
		country : '', 
		year : 0, 
		sport : '', 
		gold : 0, 
		silver : 0, 
		bronze : 0, 
		total : 0 
	
	};
	$scope.dataReceived = false;

	if($location.path() !== '/olympicMedal/add') {
		OlympicMedalService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.olympicMedal = httpResponse.data;
			$scope.dataReceived = true;
		});
	} else {
		$scope.dataReceived = true;
	}

	$scope.save = function () {
		if($location.path() === '/olympicMedal/add') {
			OlympicMedalService.add($scope.olympicMedal).then(function () {
				$location.path('/olympicMedal/list');
			});
		} else {
			OlympicMedalService.update($scope.olympicMedal).then(function () {
				$location.path('/olympicMedal/list');
			});
		}
	};

	$scope.cancel = function () {
		$location.path('/olympicMedal/list');
	};





});
