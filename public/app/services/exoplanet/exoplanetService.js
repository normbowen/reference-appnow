'use strict';

angular.module('myApp').service('ExoplanetService', function ($http, $q, UrlService, baseApi) {

	var ExoplanetService = {};

	var resourceUrl;
	var docUrl;
	var docUrlReceived;
	var resourceUrlReceived;

	// Getting the exoplanet API documentation URL and a promise to know when it's loaded.
	docUrlReceived = UrlService.exoplanetUrl.then(function (url) {
		docUrl = url;
	});

	// When the documentation is received, getting the exoplanets resource URL and a promise to know when it's loaded.
	docUrlReceived.then(function () {
		resourceUrlReceived = $http.get(docUrl).success(function (response) {
			resourceUrl = baseApi + '/' + response.resourcePath;
		});
	});

	// Function wrapper verifying URL is available before any API call.
	var safeCall = function (functionToCall) {
		return function () {
			var args = Array.prototype.slice.call(arguments);
			var deferred = $q.defer();

			// When the doc URL is available.
			docUrlReceived.then(function () {
				// When the resource URL is available.
				resourceUrlReceived.then(function () {
					deferred.resolve(functionToCall.apply(this, args));
				});
			});

			return deferred.promise;
		};
	};

	function buildBaucisQuery(opts) {
		var q ='?';
		var prefix='';
		if (opts.page == null && opts.blockSize == null) {			
		}
		else {
			opts.page = opts.page || 1;
			opts.pageSize = opts.pageSize || 20;
			
			var skip =  (opts.page-1)*opts.pageSize;
			if(skip > 0) {
				q += prefix + 'skip=' + skip;
				prefix='&';			
			}
			q += prefix + '&limit=' + opts.pageSize;
			prefix='&';
		}
		if (opts.sort) {
			q += prefix + 'sort=' + encodeURIComponent(opts.sort) + '';
			prefix='&';
		}			
		if (opts.criteria) {
			q += prefix + 'conditions={' + encodeURIComponent(opts.criteria) + '}';
			prefix='&';
		}
		if (opts.select) {
			q += prefix + 'select={' + encodeURIComponent(opts.select) + '}';
			prefix='&';
		}
		if (opts.populate) {
			q += prefix + 'populate={' + encodeURIComponent(opts.populate) + '}';
			prefix='&';
		}
		if (opts.hint) {
			q += prefix + 'hint={' + encodeURIComponent(opts.hint) + '}';
			prefix='&';
		}
		if (opts.count == true) {
			q += prefix + 'count=true';
			prefix='&';
		}
		if (opts.searchText && opts.searchText!='') {
			//Do a custom like query
			var likeQuery = buildLikeQuery(opts.searchText);   
			q += prefix + 'conditions={' + encodeURIComponent(likeQuery) + '}';
			prefix='&';
		}
		return q;
	}

	function buildLikeQuery(searchText) {
		var res='"$or":[';
		//add string fields
		var clauses = [];
		var clause = null;

//Process each property

		clause = addStringLike('name', searchText);

		if (clause != null)
			clauses.push(clause);

		if (clause != null)
			clauses.push(clause);

		if (clause != null)
			clauses.push(clause);

		if (clause != null)
			clauses.push(clause);

		if (clause != null)
			clauses.push(clause);

		if (clause != null)
			clauses.push(clause);

		if (clause != null)
			clauses.push(clause);

		clause = addStringLike('orbitRef', searchText);

		if (clause != null)
			clauses.push(clause);

		clause = addStringLike('firstRef', searchText);

		if (clause != null)
			clauses.push(clause);


		var prefix='';
		clauses.forEach(function(item) {
			res+=prefix+item;
			prefix=',';
		});
		res += ']'

		if (clauses.length>0) 
			return res;

		return '';
	}

	function addStringLike(property, searchValue) {
		if (searchValue == null)
			return null;
		return '{"'+ property +'":{"$regex":"' + escapeForRegex(searchValue) + '","$options":"i"}}';
	}
	function addNumberLike(property, searchValue) {
		if (!isNumber(searchValue)) 
			return null;
		var num = Number(searchValue);
		return '{"'+ property +'":' +  num + '}';
	}
	function addBooleanLike(property, searchValue) {
		var boolValue = strToBool(searchValue);
		if (boolValue == null) 
			return null;
		return '{"'+ property +'":' +  boolValue + '}';			
	}
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	function escapeForRegex(candidate) {
		//escape values for regex
		return candidate;
	}
	var boolValues = {
		"true"	: "true",
		"yes" 	: "true",
		"false"	: "false",
		"no"	: "false"
	};
	function strToBool(candidate) {
		var value = candidate.toLowerCase();
		var boolVal = boolValues[value];

		if (boolVal == null) return null;
		return boolVal;
	}


	function buildMongooseQuery(opts) {
		var q = '';
		if (opts.searchText && opts.searchText!='') {
			var likeQuery = buildMoongooseLikeQuery(opts.searchText);   
			var q = '{' + likeQuery + '}';			
		}
		return q;
	}

	function buildMoongooseLikeQuery(searchText) {
		var res='"$or":[';
		//add string fields
		var clauses = [];
		var clause = null;

		//Process each property
		
				clause = addStringLike('name', searchText);
		
				if (clause != null)
					clauses.push(clause);
		
				if (clause != null)
					clauses.push(clause);
		
				if (clause != null)
					clauses.push(clause);
		
				if (clause != null)
					clauses.push(clause);
		
				if (clause != null)
					clauses.push(clause);
		
				if (clause != null)
					clauses.push(clause);
		
				if (clause != null)
					clauses.push(clause);
		
				clause = addStringLike('orbitRef', searchText);
		
				if (clause != null)
					clauses.push(clause);
		
				clause = addStringLike('firstRef', searchText);
		
				if (clause != null)
					clauses.push(clause);
		

		var prefix='';
		clauses.forEach(function(item) {
			res+=prefix+item;
			prefix=',';
		});
		res += ']'

		if (clauses.length>0) 
			return res;

		return '';
	}




	//-- Public API -----

	ExoplanetService.getCount =  safeCall(function (opts) {
		opts = opts || {};
		opts.count = true;		
		var q = buildBaucisQuery(opts);
		return $http.get(resourceUrl + q);
	});
	
	ExoplanetService.getList = safeCall(function (opts) {
		opts = opts || {};
		var q = buildBaucisQuery(opts);
		return $http.get(resourceUrl + q);
	});

	ExoplanetService.getListAsCsv = safeCall(function () {
		return $http({
			method: 'GET', 
			url: resourceUrl, 
			headers: {'Accept': 'text/csv'} 
		});
	});	

	ExoplanetService.getFileAsCsv = safeCall(function () {
		return $http({
			method: 'GET', 
			url: resourceUrl + '/download/csv/', 
			headers: {'Accept': 'text/csv'} 
		});
	});	
	ExoplanetService.getFileAsXml = safeCall(function () {
		return $http({
			method: 'GET', 
			url: resourceUrl + '/download/xml/', 
			headers: {'Accept': 'text/xml'} 
		});
	});		
	ExoplanetService.getFileAsXlsx = safeCall(function () {
		return $http({
			method: 'GET', 
			url: resourceUrl + '/download/xlsx/', 
			headers: {'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'} 
		});
	});		
	
	ExoplanetService.getToEdit = safeCall(function (id) {
		return ExoplanetService.get(resourceUrl + '/' + id );
	});

	ExoplanetService.get = function (link) {
		return $http.get(link);
	};

	ExoplanetService.add = safeCall(function (item) {
		return $http.post(resourceUrl, JSON.stringify(item));
	});

	ExoplanetService.update = function (item) {
		return $http.put(resourceUrl + '/' + item._id, JSON.stringify(item));
	};

	ExoplanetService.delete = safeCall(function (id) {
		return $http.delete(resourceUrl + '/' + id);
	});

	ExoplanetService.deleteMany = safeCall(function (ids) {
		var msg = { 
			'className' : 'exoplanet',
			'ids'		: ids
		};	
		return $http.post(baseApi + '/delete', JSON.stringify(msg));
	});	

	ExoplanetService.deleteAll = safeCall(function (opts) {
		var msg = { 
			'className' : 'exoplanet',
			'conditions' : buildMongooseQuery(opts)
		};	
		return $http.post(baseApi + '/deleteAll', JSON.stringify(msg));
	});	

	return ExoplanetService;

});
