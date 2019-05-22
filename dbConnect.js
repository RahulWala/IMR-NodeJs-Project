var express = require("express");
var app = express();
var mysql = require("mysql");

module.exports.dbConn = function(app){

	/* SQL Connection */
		var sqlConnection = mysql.createConnection({
			host : "localhost",
			user : "root",
			password : '',
			database : 'movie_rating'
		});

		sqlConnection.connect((err)=>{
			if(!err)
				console.log("Database Connected SUccessfully.");
			else
				console.log("Error In Database Connection.",JSON.stringify(err, undefined, 2));
		});
	/*****************/
};