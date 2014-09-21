
'use strict';

angular.module('myApp').controller('DeleteWeatherController', function ($scope, $routeParams, $location, WeatherService) {
	$scope.weather = {};
	$scope.dataReceived = false;

	if($location.path() !== '/weather/delete') {
		WeatherService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.weather = httpResponse.data;
			$scope.dataReceived = true;
		});
	} else {
		$scope.dataReceived = true;
	}

	$scope.delete = function () {
		WeatherService.delete($scope.weather._id).then(function () {
			$location.path('/weather/list');
		});
	};

	$scope.cancel = function () {
		$location.path('/weather/list');
	};

});
