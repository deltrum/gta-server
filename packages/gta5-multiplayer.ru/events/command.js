var fs = require('fs'), path = require('path'); 

var registeredCommands = {};

setTimeout(() =>
{	
	console.log('\nLoading commands:'); 
	fs.readdirSync(path.resolve(__dirname, '../commands')).forEach(src =>
	{
		process.stdout.write('\t\"' + src + '\"');
		Object.assign(registeredCommands, require('../commands/' + src)); 
		console.log(" - OK");
	});
}, 0);

module.exports =
{
	"playerCommand": (player, cmdtext) =>
	{
		let arr = cmdtext.split(" ");
		arr[0] = arr[0].toLowerCase();
		if(player.customFunc.testFloodEvent("playerCommand")) return;
		let cmd = registeredCommands[arr[0]];
	
		if(cmd === undefined) return player.call("alert", "warning" , "Команда не найдена");
		if(player.customFunc.testAuth()) {
			cmd(player, arr, cmdtext);
			player.customData.flood.timer.cmd = global.game.flood.cmd;
		}
	}
};