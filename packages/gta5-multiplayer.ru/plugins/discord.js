const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('\nDiscord bot started!');
}); 
 
 
global.discordAPI = {
	send: function(text) {
		const channel = client.channels.find('name', 'server-log');
		if(channel) channel.send(text);
	}
}
 
client.on('message', message => {
  if (message.content.toLowerCase() === '!банки' || message.content.toLowerCase() === '!banks') {
	let banks = "```";
	game.faction.forEach(_faction => {
		if(_faction.balance)
		{
			banks += _faction.member + ": $" +  _faction.balance + ".\n";
		}
	})
	banks += "```";
	message.reply(banks);
  } else if (message.content.toLowerCase() === '!online' || message.content === '!онлайн') {
	let players = 0;
	let online = "``` ";
	mp.players.forEach(_player => {
		players++;
		online += _player.name + "\n";
	});
	if(players === 0) online += "Сервер пустой!";
	online += "```";
	message.reply(online);
  } else if (message.content === '!warehouses' || message.content === '!склады') {
	let warehouses = "```";
	game.faction.forEach(_faction => {
		if(_faction.warehouse)
		{
			warehouses += _faction.member + ": " +  _faction.warehouse + " матов\n";
		}		
	})
	warehouses += "```";
	message.reply(warehouses);
  } else if (message.content() === '!save') {
		if (message.author.id === "213949252701782016")
		{
			console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] Discord " + message.author.username + " from Save");
			api.save();
			//api.saveUser();
			message.reply("Сервер сохранен");		
		}
		else
		{
			message.reply(":poop:");		
		}
  } else if (message.content === '!ip' || message.content === '!айпи') {
	  message.reply("Наш IP-адрес: 37.230.228.114"); //ip
  } else if (message.content === '!сайт' || message.content === '!site') {
	  message.reply("Наш сайт: http://unionrp.info");
  }  
});
 
client.login('NDk4ODQ4NjAwNTM3Njk0MjI4.Dp0YUw.1Nb30B9p_e1yGoOgdVj1GgsIu-k');
