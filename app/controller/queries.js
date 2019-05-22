var express	= require('express');
var app = express();
var dbConn = require("../../dbConnect");
var async  = require("async");

//express router used to define route
var appRouter = express.Router();

module.exports.controllerFunction = function(app){

	/*
		req.body = To getting Parameter value from FORM
		req.params .id = Getting Value From URL
	*/

	/* For Showing Movie Page */
	appRouter.get('/',function(req,res){
		res.render('index');
	});

	/* Getting All Details OF Movie */
		/* For Showing Detail Of MOvie */
		appRouter.get('/all', (req,res)=>{
			dbConn.query("SELECT * FROM movies_table", (err, rows, fiedls)=>{
				if(!err){
					res.render("movies");
				}else{
					res.render("error");
				}
			});
		});
		/* For Showing Detail Review Of Movie */
		appRouter.get('/all', (req,res)=>{
			dbConn.query("SELECT * FROM reviews_table", (err, rows, fiedls)=>{
				if(!err){
					res.render("review");
				}else{
					res.render("error");
				}
			});
		});
	/*-----------------------------------*/

	/* Insert Starts From Here */
		/* Inserting In Categories Table */
		appRouter.post("/cat", (req, res)=>{
			let category = req.body;
			var sql = "INSERT INTO categories_table (name) VALUES (?);";
			dbConn.query(sql, [category.name], (err, rows, fields)=>{
				if(!err){
					if((rows.affectedRows)>=0)
						res.send("Data Inserted Successfully.");
				}else{
					res.send(err);
				}
			});
		});

		/* Inserting Into Movies_table */
		appRouter.post("/mvTbl", (req, res)=>{
			let movie = req.body;
			var sql = "INSERT INTO movies_table (name, description, image, rating, category) VALUES (?, ?, ?, ?, ?);";
			dbConn.query(sql, [movie.id, movie.name], (err, rows, fields)=>{
				if(!err){
					if((rows.affectedRows)>=1)
						res.send(rows);
				}else{
					res.send(err);
				}
			});
		});

		/* Inserting Into Reviews_table */
		appRouter.post("/rvw", (req, res)=>{
			let review = req.body;
			var sql = "INSERT INTO reviews_table (userIDKey, movieIDKey, rating, comment) VALUES (?, ?, ?, ?);";
			dbConn.query(sql, [review.id, review.name], (err, rows, fields)=>{
				if(!err){
					if((rows.affectedRows)>=1)
						res.send(rows);
				}else{
					res.send(err);
				}
			});
		});

		/* Inserting Into Users_table */
		appRouter.post("/usrTbl", (req, res)=>{
			let user = req.body;
			var sql = "INSERT INTO users_table (user_name, email, password, flag) VALUES (?, ?, ?, 'N');";
			dbConn.query(sql, [user.user_name, user.email, user.password], (err, rows, fields)=>{
				if(!err){
					if((rows.affectedRows)>=1)
						res.send(rows);
				}else{
					res.send(err);
				}
			});
		});
	/*-------------------------------*/

	/* UPDATE STARTS FROM HERE */
		/* Updating Category Details */
		appRouter.post("/updtCat/:id", (req, res)=>{
			let cat = req.body;
			var sql = "UPDATE categories_table SET name=? WHERE id=?";
			dbConn.query(sql, [cat.name, req.params.id], (err, rows, fields)=>{
				if(!err){
					if((rows.affectedRows)>=1)
						res.send(rows);
				}else{
					res.send(err);
				}
			});
		});

		/* Updating Movies Details */
		appRouter.post("/updtMve/:id/:name", (req, res)=>{
			let movie = req.body;
			var sql = "UPDATE movies_table SET name=?, description=?, image=?, rating=?, category=? WHERE id=? AND name?";
			dbConn.query(sql, [movie.name, movie.description, movie.image, movie.rating, movie.category, req.params.id, req.params.name], (err, rows, fields)=>{
				if(!err){
					if((rows.affectedRows)>=1)
						res.send(rows);
				}else{
					res.send(err);
				}
			});
		});

		/* Updating Review Details */
		appRouter.post("/updtRvw/:u_id/:m_id", (req, res)=>{
			let review = req.body;
			var sql = "UPDATE reviews_table SET userIDKey=?, movieIDKey=?, rating=?, comment=? WHERE userIDKey=? AND movieIDKey=?";
			dbConn.query(sql, [review.userId, review.movieId, review.rating, review.comment, req.params.u_id, req.params.m_id], (err, rows, fields)=>{
				if(!err){
					if((rows.affectedRows)>=1)
						res.send(rows);
				}else{
					res.send(err);
				}
			});
		});

		/* Updating User Details */
		appRouter.post("/updtUsr/:id", (req, res)=>{
			let user = req.body;
			var sql = "UPDATE users_table SET user_name=?, email=?, password=? WHERE id=? AND flag='N'";
			dbConn.query(sql, [user.user_name, user.email, user.password, req.params.id], (err, rows, fields)=>{
				if(!err){
					if((rows.affectedRows)>=1)
						res.send(rows);
				}else{
					res.send(err);
				}
			});
		});
	/*----------------------------------*/


	/* Delete Starts From Here */
		/* Deleting Category */
		appRouter.post("/dltCat/:id", (req, res)=>{
			var sql = "DELETE FROM categories_table WHERE id=?";
			dbConn.query(sql, [req.params.id], (err, rows, fields)=>{
				if(!err){
					if((rows.affectedRows)>=1)
						res.send(rows);
				}else{
					res.send(err);
				}
			});
		});

		/* Deleting From Movies Table */
		appRouter.post("/dltMve/:id", (req, res)=>{
			var sql = "DELETE FROM movies_table WHERE id=?";
			dbConn.query(sql, [req.params.id], (err, rows, fields)=>{
				if(!err){
					if((rows.affectedRows)>=1)
						res.send(rows);
				}else{
					res.send(err);
				}
			});
		});

		/* Deleting From Review Table */
		appRouter.post("/dltRvw/:id", (req, res)=>{
			var sql = "DELETE FROM reviews_table WHERE id=?";
			dbConn.query(sql, [req.params.id], (err, rows, fields)=>{
				if(!err){
					if((rows.affectedRows)>=1)
						res.send(rows);
				}else{
					res.send(err);
				}
			});
		});

		/* Deleting From Movies Table */
		appRouter.post("/dltUsr/:id", (req, res)=>{
			var sql = "DELETE FROM users_table WHERE id=?";
			dbConn.query(sql, [req.params.id], (err, rows, fields)=>{
				if(!err){
					if((rows.affectedRows)>=1)
						res.send(rows);
				}else{
					res.send(err);
				}
			});
		});
	/*----------------------------------*/

	/*****************************************/
	/*			Setting Default Route	   	*/
	/***************************************/
	app.use('/usr',appRouter);
}