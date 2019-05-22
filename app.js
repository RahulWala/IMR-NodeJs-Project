var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger 		 = 	require('morgan');
var fs = require("fs");

//used to get the path of our view files in our system
var path 		 = require('path');

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser('_method'));
app.use(bodyParser.json());

app.use(session({
	name	: 	'myFirstCookie',
	secret	: 	'R@W@1209348756',
	resave	: 	 true,
	httpOnly: 	 true,
	saveUninitialized : true,
	cookie 	: 	{ secure : false}
}));

//it will log or keep track of all the request that are made to the app
app.use(logger('dev'));

//setting the templating engine
app.set("view engine",'jade');

//set the view folder
app.set('views',path.join(__dirname+'/app/views'));


var mysql = require("./dbConnect");

/*****************************************/
/*			Model And View files  		*/
/***************************************/
fs.readdirSync('./app/controller').forEach(function(file){
	if(file.indexOf('.js')){
		var control = require('./app/controller/'+file);

		control.controllerFunction(app);
	}
});


/* Error Handling */
app.get('*',function(request, response, next){
	response.status = 404 ;
	//similar to next(err) i.e calling error
	next("Error in path");
});

/*****************************************/
/*			Listening Ports		  		*/
/***************************************/
app.listen(3000,function(){
	console.log("App started listening on port 3000.....");
});
