var express = require("express");
var app = express();
var mysql = require("mysql");

/* SQL Connection */
var sqlConnection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : 'Developer@1',
	database : 'movie_rating'
});
sqlConnection.connect((err)=>{
	if(!err)
		console.log("Database Connected SUccessfully.");
	else
		console.log("Error In Database Connection.",JSON.stringify(err, undefined, 2));
});
/*****************/
module.exports = sqlConnection;