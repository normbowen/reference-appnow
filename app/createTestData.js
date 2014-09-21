//Create test data for backend services
var mongoose = require('mongoose');

var models = require('./model');

var dbName = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/DemoDb';
mongoose.connect(dbName);


// Clear the database of old data
mongoose.model('user').remove(function (error) {
  if (error) throw error;
});
mongoose.model('country').remove(function (error) {
  if (error) throw error;
});
mongoose.model('olympicMedal').remove(function (error) {
  if (error) throw error;
});
mongoose.model('weather').remove(function (error) {
  if (error) throw error;
});
mongoose.model('exoplanet').remove(function (error) {
  if (error) throw error;
});

console.log('Data deleted on: ' + dbName);

// Put the fresh data in the database
//Data for User ---------------------------
console.log('  Creating data for  User.');

mongoose.model('user').create( {
		firstName: 'FirstName0',
		lastName: 'LastName1',
		address: 'Address2',
		city: 'City3',
		county: 'County4',
		state: 'State5',
		zip: 'Zip6',
		phone: 'Phone7',
		age: 80
	}, function (error) { if (error) throw error; }
);
mongoose.model('user').create( {
		firstName: 'FirstName9',
		lastName: 'LastName10',
		address: 'Address11',
		city: 'City12',
		county: 'County13',
		state: 'State14',
		zip: 'Zip15',
		phone: 'Phone16',
		age: 170
	}, function (error) { if (error) throw error; }
);
mongoose.model('user').create( {
		firstName: 'FirstName18',
		lastName: 'LastName19',
		address: 'Address20',
		city: 'City21',
		county: 'County22',
		state: 'State23',
		zip: 'Zip24',
		phone: 'Phone25',
		age: 260
	}, function (error) { if (error) throw error; }
);
mongoose.model('user').create( {
		firstName: 'FirstName27',
		lastName: 'LastName28',
		address: 'Address29',
		city: 'City30',
		county: 'County31',
		state: 'State32',
		zip: 'Zip33',
		phone: 'Phone34',
		age: 350
	}, function (error) { if (error) throw error; }
);
mongoose.model('user').create( {
		firstName: 'FirstName36',
		lastName: 'LastName37',
		address: 'Address38',
		city: 'City39',
		county: 'County40',
		state: 'State41',
		zip: 'Zip42',
		phone: 'Phone43',
		age: 440
	}, function (error) { if (error) throw error; }
);
//Data for Country ---------------------------
console.log('  Creating data for  Country.');

mongoose.model('country').create( {
		name: 'Name45',
		code: 'Code46',
		region: 'Region47'
	}, function (error) { if (error) throw error; }
);
mongoose.model('country').create( {
		name: 'Name48',
		code: 'Code49',
		region: 'Region50'
	}, function (error) { if (error) throw error; }
);
mongoose.model('country').create( {
		name: 'Name51',
		code: 'Code52',
		region: 'Region53'
	}, function (error) { if (error) throw error; }
);
mongoose.model('country').create( {
		name: 'Name54',
		code: 'Code55',
		region: 'Region56'
	}, function (error) { if (error) throw error; }
);
mongoose.model('country').create( {
		name: 'Name57',
		code: 'Code58',
		region: 'Region59'
	}, function (error) { if (error) throw error; }
);
//Data for OlympicMedal ---------------------------
console.log('  Creating data for  OlympicMedal.');

mongoose.model('olympicMedal').create( {
		athlete: 'Athlete60',
		age: 610,
		country: 'Country62',
		year: 630,
		sport: 'Sport64',
		gold: 650,
		silver: 660,
		bronze: 670,
		total: 680
	}, function (error) { if (error) throw error; }
);
mongoose.model('olympicMedal').create( {
		athlete: 'Athlete69',
		age: 700,
		country: 'Country71',
		year: 720,
		sport: 'Sport73',
		gold: 740,
		silver: 750,
		bronze: 760,
		total: 770
	}, function (error) { if (error) throw error; }
);
mongoose.model('olympicMedal').create( {
		athlete: 'Athlete78',
		age: 790,
		country: 'Country80',
		year: 810,
		sport: 'Sport82',
		gold: 830,
		silver: 840,
		bronze: 850,
		total: 860
	}, function (error) { if (error) throw error; }
);
mongoose.model('olympicMedal').create( {
		athlete: 'Athlete87',
		age: 880,
		country: 'Country89',
		year: 900,
		sport: 'Sport91',
		gold: 920,
		silver: 930,
		bronze: 940,
		total: 950
	}, function (error) { if (error) throw error; }
);
mongoose.model('olympicMedal').create( {
		athlete: 'Athlete96',
		age: 970,
		country: 'Country98',
		year: 990,
		sport: 'Sport100',
		gold: 1010,
		silver: 1020,
		bronze: 1030,
		total: 1040
	}, function (error) { if (error) throw error; }
);
//Data for Weather ---------------------------
console.log('  Creating data for  Weather.');

mongoose.model('weather').create( {
		location: 'Location105',
		year: 1060,
		month: 1070,
		day: 1080,
		time: '16:33:35Z+0200',
		temperature: 1101,
		relHum: 1110,
		presure: 1121,
		hmdx: 1130
	}, function (error) { if (error) throw error; }
);
mongoose.model('weather').create( {
		location: 'Location114',
		year: 1150,
		month: 1160,
		day: 1170,
		time: '16:33:35Z+0200',
		temperature: 1191,
		relHum: 1200,
		presure: 1211,
		hmdx: 1220
	}, function (error) { if (error) throw error; }
);
mongoose.model('weather').create( {
		location: 'Location123',
		year: 1240,
		month: 1250,
		day: 1260,
		time: '16:33:35Z+0200',
		temperature: 1281,
		relHum: 1290,
		presure: 1301,
		hmdx: 1310
	}, function (error) { if (error) throw error; }
);
mongoose.model('weather').create( {
		location: 'Location132',
		year: 1330,
		month: 1340,
		day: 1350,
		time: '16:33:35Z+0200',
		temperature: 1371,
		relHum: 1380,
		presure: 1391,
		hmdx: 1400
	}, function (error) { if (error) throw error; }
);
mongoose.model('weather').create( {
		location: 'Location141',
		year: 1420,
		month: 1430,
		day: 1440,
		time: '16:33:35Z+0200',
		temperature: 1461,
		relHum: 1470,
		presure: 1481,
		hmdx: 1490
	}, function (error) { if (error) throw error; }
);
//Data for Exoplanet ---------------------------
console.log('  Creating data for  Exoplanet.');

mongoose.model('exoplanet').create( {
		name: 'Name150',
		msini: 1511,
		semiMajorAxis: 1521,
		orbitalPeriod: 1531,
		orbitalExcentricity: 1541,
		om: 1551,
		velocity: 1561,
		orbitRef: 'OrbitRef157',
		firstRef: 'FirstRef158'
	}, function (error) { if (error) throw error; }
);
mongoose.model('exoplanet').create( {
		name: 'Name159',
		msini: 1601,
		semiMajorAxis: 1611,
		orbitalPeriod: 1621,
		orbitalExcentricity: 1631,
		om: 1641,
		velocity: 1651,
		orbitRef: 'OrbitRef166',
		firstRef: 'FirstRef167'
	}, function (error) { if (error) throw error; }
);
mongoose.model('exoplanet').create( {
		name: 'Name168',
		msini: 1691,
		semiMajorAxis: 1701,
		orbitalPeriod: 1711,
		orbitalExcentricity: 1721,
		om: 1731,
		velocity: 1741,
		orbitRef: 'OrbitRef175',
		firstRef: 'FirstRef176'
	}, function (error) { if (error) throw error; }
);
mongoose.model('exoplanet').create( {
		name: 'Name177',
		msini: 1781,
		semiMajorAxis: 1791,
		orbitalPeriod: 1801,
		orbitalExcentricity: 1811,
		om: 1821,
		velocity: 1831,
		orbitRef: 'OrbitRef184',
		firstRef: 'FirstRef185'
	}, function (error) { if (error) throw error; }
);
mongoose.model('exoplanet').create( {
		name: 'Name186',
		msini: 1871,
		semiMajorAxis: 1881,
		orbitalPeriod: 1891,
		orbitalExcentricity: 1901,
		om: 1911,
		velocity: 1921,
		orbitRef: 'OrbitRef193',
		firstRef: 'FirstRef194'
	}, function (error) { if (error) throw error; }
);

console.log('Fake Data created on: ' + dbName);
