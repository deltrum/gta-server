"use strict";

let mysql = module.exports;

console.log('Prepare mysql connect to base...');

var mysql2 = require('mysql');

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

/*

setInterval(function() {
    mysql.connection.query('select 1', function(err, results) {

    });
}, 10000);


mp.events.addCommand('makeadmin', (player, id) =>  {
  if(player.admin < 1) return player.outputChatBox("Вы не являетесь !{red}Администратором.");
  let target = mp.players.at(id);
  gm.mysql.handle.query('UPDATE accounts SET admin = 1 WHERE username = ?', [1, target.name], function(err, res, row){
      if(err) console.log(err);
  });
  target.admin = 1;
  player.outputChatBox("Вы !{dodgerblue}назначили"+target.name+"админом.");
  target.outputChatBox("Вас !{dodgerblue} назначили админом.");
});
*/