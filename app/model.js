
//Data model for Backend-Services  ---------------

var mongoose = require('mongoose');

// Create Mongoose schemas
var UserSchema = new mongoose.Schema({ 
  	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	address: { type: String, required: false },
	city: { type: String, required: true },
	county: { type: String, required: false },
	state: { type: String, required: true },
	zip: { type: String, required: true },
	phone: { type: String, required: true },
	age: { type: Number, required: true }
});

var CountrySchema = new mongoose.Schema({ 
  	name: { type: String, required: true },
	code: { type: String, required: true },
	region: { type: String, required: false }
});

var OlympicMedalSchema = new mongoose.Schema({ 
  	athlete: { type: String, required: true },
	age: { type: Number, required: true },
	country: { type: String, required: true },
	year: { type: Number, required: true },
	sport: { type: String, required: true },
	gold: { type: Number, required: true },
	silver: { type: Number, required: true },
	bronze: { type: Number, required: true },
	total: { type: Number, required: true }
});

var WeatherSchema = new mongoose.Schema({ 
  	location: { type: String, required: true },
	year: { type: Number, required: true },
	month: { type: Number, required: true },
	day: { type: Number, required: true },
	time: { type: Date, required: true },
	temperature: { type: Number, required: false },
	relHum: { type: Number, required: false },
	presure: { type: Number, required: false },
	hmdx: { type: Number, required: false }
});

var ExoplanetSchema = new mongoose.Schema({ 
  	name: { type: String, required: true },
	msini: { type: Number, required: false },
	semiMajorAxis: { type: Number, required: false },
	orbitalPeriod: { type: Number, required: false },
	orbitalExcentricity: { type: Number, required: false },
	om: { type: Number, required: false },
	velocity: { type: Number, required: false },
	orbitRef: { type: String, required: false },
	firstRef: { type: String, required: false }
});




//Create full text indexes (experimental)--- 
/*
    UserSchema.index({
    	firstName: 'text',
		lastName: 'text',
		address: 'text',
		city: 'text',
		county: 'text',
		state: 'text',
		zip: 'text',
		phone: 'text'    
    });
    CountrySchema.index({
    	name: 'text',
		code: 'text',
		region: 'text'    
    });
    OlympicMedalSchema.index({
    	athlete: 'text',
		country: 'text',
		sport: 'text'    
    });
    WeatherSchema.index({
    	location: 'text'    
    });
    ExoplanetSchema.index({
    	name: 'text',
		orbitRef: 'text',
		firstRef: 'text'    
    });
*/


// Sample to inject operations into mongoose schemas
//UserSchema.pre('save', function (next) {
//  console.log('A User was saved to MongoDB: %s.', this.get('firstName'));
//  next();
//});
//CountrySchema.pre('save', function (next) {
//  console.log('A Country was saved to MongoDB: %s.', this.get('name'));
//  next();
//});
//OlympicMedalSchema.pre('save', function (next) {
//  console.log('A OlympicMedal was saved to MongoDB: %s.', this.get('athlete'));
//  next();
//});
//WeatherSchema.pre('save', function (next) {
//  console.log('A Weather was saved to MongoDB: %s.', this.get('location'));
//  next();
//});
//ExoplanetSchema.pre('save', function (next) {
//  console.log('A Exoplanet was saved to MongoDB: %s.', this.get('name'));
//  next();
//});


var propertiesForClass = {
	"user" : ['firstName', 'lastName', 'address', 'city', 'county', 'state', 'zip', 'phone', 'age'],
	"country" : ['name', 'code', 'region'],
	"olympicMedal" : ['athlete', 'age', 'country', 'year', 'sport', 'gold', 'silver', 'bronze', 'total'],
	"weather" : ['location', 'year', 'month', 'day', 'time', 'temperature', 'relHum', 'presure', 'hmdx'],
	"exoplanet" : ['name', 'msini', 'semiMajorAxis', 'orbitalPeriod', 'orbitalExcentricity', 'om', 'velocity', 'orbitRef', 'firstRef']  
};


//Models ----
var UserModel = mongoose.model('user', UserSchema);
var CountryModel = mongoose.model('country', CountrySchema);
var OlympicMedalModel = mongoose.model('olympicMedal', OlympicMedalSchema);
var WeatherModel = mongoose.model('weather', WeatherSchema);
var ExoplanetModel = mongoose.model('exoplanet', ExoplanetSchema);
  

function getModelForClass(className) {
  if ('user'==className) {
    return UserModel;
  }
  if ('country'==className) {
    return CountryModel;
  }
  if ('olympicMedal'==className) {
    return OlympicMedalModel;
  }
  if ('weather'==className) {
    return WeatherModel;
  }
  if ('exoplanet'==className) {
    return ExoplanetModel;
  }
  
  return null;
}




function getCsvHeader(className) {
  var res="_id"; prefix=",";
  var props = propertiesForClass[className];
  if (props) {
    for(var index in props) {
      res += prefix + csvEncode(props[index]);
    }
    return res+"\r\n";
  }
  return null;
}
function toCsv(objects, className) {
  var res = getCsvHeader(className);
  var props = propertiesForClass[className];
  if (props) {
    for(var j in objects) {
      var item = objects[j];
      res += item._id;
      var prefix = ",";
      for(var index in props) {
        res += prefix + csvEncode(item[props[index]]);
      }
      res +="\r\n";
    }
  }
  return res;
}
function isObjectId(obj) {
  return (typeof obj === 'object' && obj._bsontype === 'ObjectID');
}
function csvEncode(data) {
  var text;
  if (data == null) {
    return '';
  }
  if (isObjectId(data)) {
    return data.toString();
  }
  text = data.toString();
  
  if ((text.indexOf(',') >= 0) || (text.indexOf('.') >= 0) || (text.indexOf(' ') >= 0)) {
    return '"' + text + '"';
  }   
  return text;
}

function toXml(objects, className) {
  var res = '<?xml version="1.0" encoding="UTF-8"?>\r\n<data>\r\n';
  var props = propertiesForClass[className];
  if (props) {
    for(var j in objects) {
      var item = objects[j];
      res += '  <' + className + '><id>' + item._id + '</id>';
      for(var index in props) {
        var prop = props[index];
        res += '<'+ prop + '>' + xmlEncode(item[prop]) + '</' + prop + '>';
      }
      res +='</' + className + '>\r\n';
    }
  }
  return res + "</data>\r\n";
}
function xmlEncode(data) {
  if (data == null) return '';
  var res = data.toString().replace(/&/g, '&amp;')
                .replace(/'/g, '&apos;')
                .replace(/"/g, '&quot;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
  ;
  return res;
}

function toXlsx(objects, className) {
  var res = "XLSX todo";
  var props = propertiesForClass[className];  
  return res;
}


// Register the schema and export it
module.exports.UserModel    = UserModel;
module.exports.CountryModel    = CountryModel;
module.exports.OlympicMedalModel    = OlympicMedalModel;
module.exports.WeatherModel    = WeatherModel;
module.exports.ExoplanetModel    = ExoplanetModel;

module.exports.getModelForClass = getModelForClass;
module.exports.toCsv = toCsv;
module.exports.toXlsx = toXlsx;
module.exports.toXml = toXml;
