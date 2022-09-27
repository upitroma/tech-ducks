const express = require('express');

var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: "db",
    user: "root",
    password: "P@ssw0rd"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");


    function sqlQuery(sql) {
        con.query(sql, function (err, result) {
            if (err){
                throw err;
            } 
            return result;
        });
    }

    function createDatabase(){

        console.log("Creating database")

        sqlQuery("CREATE DATABASE DuckDB");

        sqlQuery("USE DuckDB");

        // createDuckTable.sql
        sqlQuery("CREATE TABLE `names` (`id` int NOT NULL,`name` varchar(200) NOT NULL,`originalLocation` varchar(200) DEFAULT NULL,PRIMARY KEY (`id`),UNIQUE KEY `id_UNIQUE` (`id`),UNIQUE KEY `name_UNIQUE` (`name`)) ENGINE=InnoDB DEFAULT CHARSET=ascii;");
        
        // createFoundLog.sql
        sqlQuery("CREATE TABLE `foundLog` (`id` int NOT NULL AUTO_INCREMENT,`duckId` int NOT NULL,`date` datetime NOT NULL,`ip` varchar(20) DEFAULT NULL,PRIMARY KEY (`id`),UNIQUE KEY `id_UNIQUE` (`id`)) ENGINE=InnoDB DEFAULT CHARSET=ascii;");

        // read ducks.txt and insert them into ducks table
        
        var array = fs.readFileSync('/app/ducks.txt').toString().split("\n");
        for(i in array) {
            sqlQuery("INSERT INTO names (id, name) VALUES (" + i + ", '" + array[i] + "');");
        }
    }

    




    //check if /var/lib/mysql/DuckDB exists
    fs.access("/var/lib/mysql/DuckDB", function(error) {
        if (error) {
            console.log("Directory does not exist.")
            createDatabase();
        } else {
            console.log("Directory exists.")
            // sqlQuery("USE DuckDB");
            // ducks = (sqlQuery("SELECT name FROM names"));
            // console.log(ducks);


            con.query("SELECT name FROM DuckDB.names", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
            });
        }
    })

   

});


const PORT = 3000;

var app = express();

app.get("/duck/",function(req,res){
    if(!req.query.id){
        res.send("this should redirect to some statistics page");
    }
    else{
        con.query("SELECT name FROM names", function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
        // res.send("your id is "+req.query.id);
    }
});


var server = app.listen(PORT, function () {
    console.log("Server is running!")
 })