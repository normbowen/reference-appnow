
'use strict';

angular.module('myApp').controller('DeleteOlympicMedalController', function ($scope, $routeParams, $location, OlympicMedalService) {
	$scope.olympicMedal = {};
	$scope.dataReceived = false;

	if($location.path() !== '/olympicMedal/delete') {
		OlympicMedalService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.olympicMedal = httpResponse.data;
			$scope.dataReceived = true;
		});
	} else {
		$scope.dataReceived = true;
	}

	$scope.delete = function () {
		OlympicMedalService.delete($scope.olympicMedal._id).then(function () {
			$location.path('/olympicMedal/list');
		});
	};

	$scope.cancel = function () {
		$location.path('/olympicMedal/list');
	};

});
