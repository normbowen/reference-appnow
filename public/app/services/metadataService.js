'use strict';

angular.module('myApp').service('MetadataService', function () {
	var MetadataService = {};


	var metaData = {
		"user" 		: 	["firstName","lastName","address","city","county","state","zip","phone","age"],
		"country" 		: 	["name","code","region"],
		"olympicMedal" 		: 	["athlete","age","country","year","sport","gold","silver","bronze","total"],
		"weather" 		: 	["location","year","month","day","time","temperature","relHum","presure","hmdx"],
		"exoplanet" 		: 	["name","msini","semiMajorAxis","orbitalPeriod","orbitalExcentricity","om","velocity","orbitRef","firstRef"]
	};

	MetadataService.getPropertiesFor = function (className) {
		return (metaData[className] || [] ).slice(0);
	};

	return MetadataService;

});

