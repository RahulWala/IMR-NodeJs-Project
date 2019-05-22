var express	= require('express');
var app = express();
var dbConn = require("../../dbConnect");
var async  = require("async");

//express router used to define route
var appRouter = express.Router();

module.exports.controllerFunction = function(app){
	appRouter.get("/", function(req, res){
		dbConn.query("SELECT * FROM categories_table", (err, data)=>{
			if(!err)
				res.send(data);
			else
				console.log(err);
		});
	});

	/*appRouter.get("/add/:id", (req, res)=>{
		dbConn.query("SELECT * FROM categories_table WHERE id=", )
	});*/


	/*****************************************/
	/*			Setting Default Route	   	*/
	/***************************************/
	app.use('/usr',appRouter);
}