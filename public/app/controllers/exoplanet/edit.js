
'use strict';

angular.module('myApp').controller('EditExoplanetController', function ($scope, $routeParams, $location, ExoplanetService) {
	$scope.exoplanet = {
		name : '', 
		msini : 0, 
		semiMajorAxis : 0, 
		orbitalPeriod : 0, 
		orbitalExcentricity : 0, 
		om : 0, 
		velocity : 0, 
		orbitRef : '', 
		firstRef : '' 
	
	};
	$scope.dataReceived = false;

	if($location.path() !== '/exoplanet/add') {
		ExoplanetService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.exoplanet = httpResponse.data;
			$scope.dataReceived = true;
		});
	} else {
		$scope.dataReceived = true;
	}

	$scope.save = function () {
		if($location.path() === '/exoplanet/add') {
			ExoplanetService.add($scope.exoplanet).then(function () {
				$location.path('/exoplanet/list');
			});
		} else {
			ExoplanetService.update($scope.exoplanet).then(function () {
				$location.path('/exoplanet/list');
			});
		}
	};

	$scope.cancel = function () {
		$location.path('/exoplanet/list');
	};





});
