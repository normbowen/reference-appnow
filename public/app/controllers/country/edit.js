
'use strict';

angular.module('myApp').controller('EditCountryController', function ($scope, $routeParams, $location, CountryService) {
	$scope.country = {
		name : '', 
		code : '', 
		region : '' 
	
	};
	$scope.dataReceived = false;

	if($location.path() !== '/country/add') {
		CountryService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.country = httpResponse.data;
			$scope.dataReceived = true;
		});
	} else {
		$scope.dataReceived = true;
	}

	$scope.save = function () {
		if($location.path() === '/country/add') {
			CountryService.add($scope.country).then(function () {
				$location.path('/country/list');
			});
		} else {
			CountryService.update($scope.country).then(function () {
				$location.path('/country/list');
			});
		}
	};

	$scope.cancel = function () {
		$location.path('/country/list');
	};





});
