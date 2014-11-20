
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by AppNow (http://appnow.radarconline.com) 
//     Code-gen engine version: 4.4.2.19133 
//     MEAN generator version:  0.2.5.3
//     at:                      9/21/2014 4:32:50 PM UTC
// </auto-generated>
//------------------------------------------------------------------------------

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var baucis = require('baucis');
var Swagger = require('baucis-swagger');
var models = require('./model');
var auth = require('./conf/auth');
var imp = require('./import');

if(process.env.VCAP_SERVICES){
  var services = JSON.parse(process.env.VCAP_SERVICES);
  var dbcreds = services['mongodb'][0].credentials;
}

if(dbcreds){
  console.log(dbcreds);
  mongoose.connect(dbcreds.host, dbcreds.db, dbcreds.port, {user: dbcreds.username, pass: dbcreds.password});
}else{
  mongoose.connect("localhost", "DemoDb", 27017);
}

var csvSupport = require('./baucis-csv.js');
csvSupport.apply(baucis);

// Create the express app 
var app = express();
app.use(morgan('dev'));
var swagger = new Swagger(baucis);

// Pluralize and set resources names
models.UserModel.plural('users');
models.CountryModel.plural('countries');
models.OlympicMedalModel.plural('olympicMedals');
models.WeatherModel.plural('weathers');
models.ExoplanetModel.plural('exoplanets');

// Create the API routes & controllers
var userController = baucis.rest('user', models.UserModel);
var countryController = baucis.rest('country', models.CountryModel);
var olympicMedalController = baucis.rest('olympicMedal', models.OlympicMedalModel);
var weatherController = baucis.rest('weather', models.WeatherModel);
var exoplanetController = baucis.rest('exoplanet', models.ExoplanetModel);

//Add export functionality
userController.get('/download/csv', function(req,res,done){
  models.UserModel.where().exec(function (err, objects) {
    res.status(200) 
       .set('Content-Type', 'text/csv')
       .set('Content-Disposition', 'attachment; filename="users.csv"')
       .send(models.toCsv(objects, 'user'));  
    done();
  });
});
userController.get('/download/xlsx', function(req,res,done){
  models.UserModel.where().exec(function (err, objects) {
    res.status(200);
    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.set('Content-Disposition', 'attachment; filename="users.xlsx"');
    res.send(models.toXlsx(objects, 'user')); 
    //done();
  });
});
userController.get('/download/xml/', function(req,res,done){
  models.UserModel.where().exec(function (err, objects) {
    res.status(200);
    res.set('Content-Type', 'text/xml');
    res.set('Content-Disposition', 'attachment; filename="users.xml"');
    res.send(models.toXml(objects, 'user'));  
    //done();
  });
});

countryController.get('/download/csv', function(req,res,done){
  models.CountryModel.where().exec(function (err, objects) {
    res.status(200) 
       .set('Content-Type', 'text/csv')
       .set('Content-Disposition', 'attachment; filename="countries.csv"')
       .send(models.toCsv(objects, 'country'));  
    done();
  });
});
countryController.get('/download/xlsx', function(req,res,done){
  models.CountryModel.where().exec(function (err, objects) {
    res.status(200);
    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.set('Content-Disposition', 'attachment; filename="countries.xlsx"');
    res.send(models.toXlsx(objects, 'country')); 
    //done();
  });
});
countryController.get('/download/xml/', function(req,res,done){
  models.CountryModel.where().exec(function (err, objects) {
    res.status(200);
    res.set('Content-Type', 'text/xml');
    res.set('Content-Disposition', 'attachment; filename="countries.xml"');
    res.send(models.toXml(objects, 'country'));  
    //done();
  });
});

olympicMedalController.get('/download/csv', function(req,res,done){
  models.OlympicMedalModel.where().exec(function (err, objects) {
    res.status(200) 
       .set('Content-Type', 'text/csv')
       .set('Content-Disposition', 'attachment; filename="olympicMedals.csv"')
       .send(models.toCsv(objects, 'olympicMedal'));  
    done();
  });
});
olympicMedalController.get('/download/xlsx', function(req,res,done){
  models.OlympicMedalModel.where().exec(function (err, objects) {
    res.status(200);
    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.set('Content-Disposition', 'attachment; filename="olympicMedals.xlsx"');
    res.send(models.toXlsx(objects, 'olympicMedal')); 
    //done();
  });
});
olympicMedalController.get('/download/xml/', function(req,res,done){
  models.OlympicMedalModel.where().exec(function (err, objects) {
    res.status(200);
    res.set('Content-Type', 'text/xml');
    res.set('Content-Disposition', 'attachment; filename="olympicMedals.xml"');
    res.send(models.toXml(objects, 'olympicMedal'));  
    //done();
  });
});

weatherController.get('/download/csv', function(req,res,done){
  models.WeatherModel.where().exec(function (err, objects) {
    res.status(200) 
       .set('Content-Type', 'text/csv')
       .set('Content-Disposition', 'attachment; filename="weathers.csv"')
       .send(models.toCsv(objects, 'weather'));  
    done();
  });
});
weatherController.get('/download/xlsx', function(req,res,done){
  models.WeatherModel.where().exec(function (err, objects) {
    res.status(200);
    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.set('Content-Disposition', 'attachment; filename="weathers.xlsx"');
    res.send(models.toXlsx(objects, 'weather')); 
    //done();
  });
});
weatherController.get('/download/xml/', function(req,res,done){
  models.WeatherModel.where().exec(function (err, objects) {
    res.status(200);
    res.set('Content-Type', 'text/xml');
    res.set('Content-Disposition', 'attachment; filename="weathers.xml"');
    res.send(models.toXml(objects, 'weather'));  
    //done();
  });
});

exoplanetController.get('/download/csv', function(req,res,done){
  models.ExoplanetModel.where().exec(function (err, objects) {
    res.status(200) 
       .set('Content-Type', 'text/csv')
       .set('Content-Disposition', 'attachment; filename="exoplanets.csv"')
       .send(models.toCsv(objects, 'exoplanet'));  
    done();
  });
});
exoplanetController.get('/download/xlsx', function(req,res,done){
  models.ExoplanetModel.where().exec(function (err, objects) {
    res.status(200);
    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.set('Content-Disposition', 'attachment; filename="exoplanets.xlsx"');
    res.send(models.toXlsx(objects, 'exoplanet')); 
    //done();
  });
});
exoplanetController.get('/download/xml/', function(req,res,done){
  models.ExoplanetModel.where().exec(function (err, objects) {
    res.status(200);
    res.set('Content-Type', 'text/xml');
    res.set('Content-Disposition', 'attachment; filename="exoplanets.xml"');
    res.send(models.toXml(objects, 'exoplanet'));  
    //done();
  });
});





app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(cookieParser());
app.use(session({ 
	secret: auth.security.apiKey,
	resave: true,
	saveUninitialized: true
}));


//Simple Portal ApiKey based auth ------
app.post('/weblogin', function(req, res) {
	if (req.body.apikey == auth.security.apiKey) {
		res.cookie('apikey', req.body.apikey);
		res.status(200).send('{"id": 0, "user": {"id":0, "role": "admin"} }');
	}
	else {
		res.cookie('apikey', null);
		res.status(401).send('Unauthorized.');
	}
});

app.post('/webLogout', function(req, res) {
  res.clearCookie('apikey')
  res.status(200).send('OK');
});

app.post('/api/import', function(req, res) {
  return imp.importData(req, res);
});

//Add extra functionality
app.post('/api/delete', function(req,res){
  var className = req.body.className;
  var ids = req.body.ids;
  var model = models.getModelForClass(className);
  for(var index in ids) {
    var idItem = ids[index];
    model.findOneAndRemove( {'_id': idItem}, function(err){
      if (err) {
        console.error(err);
      }
    });
  }    
  res.status(200)
     .set('Content-Type', 'text/json')
     .send('');
});

app.post('/api/deleteAll', function(req,res){
  try {
    var className = req.body.className;
    var model = models.getModelForClass(className);
    console.log("DeleteAll: " + req.body.conditions);
    var criteria = "";
    if (req.body.conditions != null && req.body.conditions !="") {
      criteria = JSON.parse(req.body.conditions);
      model.remove(criteria).exec();
    } else {
      //delete all
      model.remove().exec();    
    }

        
    res.status(200)
       .set('Content-Type', 'text/json')
       .send('{}');
  }
  catch (e) {
    res.status(401)
       .set('Content-Type', 'text/json')
       .send('{ "error" : "Invalid query"}');
  }
});

//Error handler
app.use(function(err, req, res, next) {
  console.error(req.query);
  console.error(err.stack);
});


//CORS enabled for allowing 3rd party web-apps to consume Swagger metadata and backend. 
//Disable it commenting this block if you don not need it. ----------
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");  //Change * to your host domain
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	res.header("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
    next();
});


//Auth ----------
app.all('*', function(req, res, next) {
	if (req.url.substr(0,5) != '/api/'){
		return next();
	}
	return isLoggedIn(req, res, next);
});

function isLoggedIn(req, res, next) {
	var incomingKey = getHeaderOrParam(req, 'apikey');
	if (incomingKey == auth.security.apiKey){
		return next();
	}
	incomingKey = getHeaderOrParam(req, 'api_key');
	if (incomingKey == auth.security.apiKey){
		return next();
	}	
	res.status(401).send('Unathorized.');
}

function getHeaderOrParam(req, key){
	var cookie = req.cookies[key];
	if (cookie != undefined) return cookie;
	var header = req.headers[key];
	if (header != undefined) return header;
	return req.query[key];
}

app.use('/api', baucis());
app.use('/', express.static(__dirname + '/../public'));

var port = Number(process.env.PORT || 5000);
app.listen(port);

swagger.finalize(app);

console.log('SampleBackend Backend - Server listening on port '+ port +'.');
console.log('\tResource User                           on   /api/users');
console.log('\tResource Country                        on   /api/countries');
console.log('\tResource OlympicMedal                   on   /api/olympicMedals');
console.log('\tResource Weather                        on   /api/weathers');
console.log('\tResource Exoplanet                      on   /api/exoplanets');
console.log('\tSwagger docs                            on   /api/api-docs');
console.log('\tAngularJS admin web-client              on   /');
