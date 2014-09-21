
'use strict';

angular.module('myApp').controller('EditWeatherController', function ($scope, $routeParams, $location, WeatherService) {
	$scope.weather = {
		location : '', 
		year : 0, 
		month : 0, 
		day : 0, 
		time : new Date(0), 
		temperature : 0, 
		relHum : 0, 
		presure : 0, 
		hmdx : 0 
	
	};
	$scope.dataReceived = false;

	if($location.path() !== '/weather/add') {
		WeatherService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.weather = httpResponse.data;
			$scope.dataReceived = true;
		});
	} else {
		$scope.dataReceived = true;
	}

	$scope.save = function () {
		if($location.path() === '/weather/add') {
			WeatherService.add($scope.weather).then(function () {
				$location.path('/weather/list');
			});
		} else {
			WeatherService.update($scope.weather).then(function () {
				$location.path('/weather/list');
			});
		}
	};

	$scope.cancel = function () {
		$location.path('/weather/list');
	};





});
