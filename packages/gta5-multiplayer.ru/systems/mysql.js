"use strict";

let mysql = module.exports;

console.log('Prepare mysql connect to base...');

const mysql2 = require('mysql');

mysql.connection = mysql2.createConnection({
	host            : 'localhost',
	user            : 'root',
	password        : '',
	database        : 'gta5-multiplayer.ru'
});

mysql.connection.connect(function(err) {
	console.log(err);
    if(err) {
      console.log("Error connecting to the database...");
      throw err;
    } else {
      console.log('Database connected!');
    }
  });

console.log('Loaded mysql data...');