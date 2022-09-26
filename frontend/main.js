const express = require('express');

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "db",
    user: "root",
    password: "P@ssw0rd"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});


const PORT = 3000;

var app = express();

app.get("/duck/",function(req,res){
    if(!req.query.id){
        res.send("this should redirect to some statistics page");
    }
    else{
        res.send("your id is "+req.query.id);
    }
});


var server = app.listen(PORT, function () {
    console.log("Server is running!")
 })