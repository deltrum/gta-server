"use strict";

const mysql = require('mysql');

console.log('Preparing mysql pool...');

const pool = mysql.createPool({
	connectionLimit: 10,
	waitForConnections: true,
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'gta5-multiplayer.ru'
});

pool.on('acquire', function (connection) {
	console.log('Connection %d acquired', connection.threadId);
});
pool.on('connection', function (connection) {
	console.log('New connection %d', connection.threadId);
});
pool.on('enqueue', function () {
	console.log('Waiting for available connection slot');
});
pool.on('release', function (connection) {
	console.log('Connection %d released', connection.threadId);
});

module.exports = { pool };

console.log('MySQL pool ready.');
