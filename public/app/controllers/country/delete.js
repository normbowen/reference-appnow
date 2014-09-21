
'use strict';

angular.module('myApp').controller('DeleteCountryController', function ($scope, $routeParams, $location, CountryService) {
	$scope.country = {};
	$scope.dataReceived = false;

	if($location.path() !== '/country/delete') {
		CountryService.getToEdit($routeParams.id).then(function (httpResponse) {
			$scope.country = httpResponse.data;
			$scope.dataReceived = true;
		});
	} else {
		$scope.dataReceived = true;
	}

	$scope.delete = function () {
		CountryService.delete($scope.country._id).then(function () {
			$location.path('/country/list');
		});
	};

	$scope.cancel = function () {
		$location.path('/country/list');
	};

});
