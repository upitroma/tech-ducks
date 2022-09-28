const express = require('express');
var mysql = require('mysql');
var fs = require('fs');
// const { query } = require('express');

const PORT = 3000;


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
        sqlQuery("CREATE TABLE `names` (`id` varchar(200) NOT NULL,`name` varchar(200) NOT NULL,`originalLocation` varchar(200) DEFAULT NULL,PRIMARY KEY (`id`),UNIQUE KEY `id_UNIQUE` (`id`),UNIQUE KEY `name_UNIQUE` (`name`)) ENGINE=InnoDB DEFAULT CHARSET=ascii;");
        
        // createFoundLog.sql
        sqlQuery("CREATE TABLE `foundLog` (`id` int NOT NULL AUTO_INCREMENT,`duckId` int NOT NULL,`date` datetime NOT NULL,`ip` varchar(20) DEFAULT NULL,PRIMARY KEY (`id`),UNIQUE KEY `id_UNIQUE` (`id`)) ENGINE=InnoDB DEFAULT CHARSET=ascii;");

        // read ducks.txt and insert them into ducks table
        var array = fs.readFileSync('/app/ducks.txt').toString().split("\n");
        for(i in array) {
            sqlQuery("INSERT INTO names (id, name) VALUES (" + i + ", '" + array[i] + "');");
        }

        console.log("ready for requests")
    }

    //check if /var/lib/mysql/DuckDB exists
    fs.access("/var/lib/mysql/DuckDB", function(error) {
        if (error) {
            console.log("Directory does not exist.")
            createDatabase();
        } else {
            console.log("Directory exists.")

            console.log("ready for requests")
        }
    })
});



var app = express();

app.get("/duck/",function(req,res){
    if(!req.query.id){
        res.send("this should redirect to some statistics page");
    }
    else{
        //fix sql injection
        if (req.query.id.match(/^[0-9a-zA-Z]+$/)){
            con.query("SELECT * FROM DuckDB.names WHERE id = '"+req.query.id+"'", function (err, result, fields) {
                if (err) throw err;
                if (result.length==1){
                    duckName=result[0].name

                    //duck exists
                    con.query("SELECT * FROM DuckDB.foundLog WHERE duckID = '"+req.query.id+"'", function (err, result, fields) {
                        if (err) throw err;
                        if (result.length<1){
                            res.send("you're the first person to find "+duckName+"!")

                            date=new Date().toISOString().slice(0, 19).replace('T', ' ')
                            con.query("INSERT INTO DuckDB.foundLog (duckId, date) VALUES ('" + req.query.id + "', '" + date + "');");
                        }
                        else{
                            res.send("You've found "+duckName+"! "+duckName+" has not been found since "+result[result.length-1].date+". So far "+result.length+" other people have found this duck.")

                            date=new Date().toISOString().slice(0, 19).replace('T', ' ')
                            con.query("INSERT INTO DuckDB.foundLog (duckId, date) VALUES ('" + req.query.id + "', '" + date + "');");

                        }
                    });
                    // res.send(duckName);
                }
                else{
                    res.send("invalid duck")
                }
                console.log(result.length)
                
            });
        }
        else{
            res.send("invalid duck")
        }

        // res.send("your id is "+req.query.id);
    }
});


var server = app.listen(PORT, function () {
    console.log("Server is running!")
 })