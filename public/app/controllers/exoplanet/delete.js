
'use strict';

angular.module('myApp').controller('DeleteExoplanetController', function ($scope, $routeParams, $location, ExoplanetService) {
	$scope.exoplanet = {};
	$scope.dataReceived = false;

	if($location.path() !== '/exoplanet/delete') {
		ExoplanetService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.exoplanet = httpResponse.data;
			$scope.dataReceived = true;
		});
	} else {
		$scope.dataReceived = true;
	}

	$scope.delete = function () {
		ExoplanetService.delete($scope.exoplanet._id).then(function () {
			$location.path('/exoplanet/list');
		});
	};

	$scope.cancel = function () {
		$location.path('/exoplanet/list');
	};

});
