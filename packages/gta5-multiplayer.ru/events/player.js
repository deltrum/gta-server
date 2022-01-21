module.exports =
{
	"playerJoin" : player =>
	{	
		console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] " + player.name + " join.");
	},
	"playerCreateWaypoint" : (player,position) =>
	{	
		player.outputChatBox("playerCreateWaypoint " + position.x + " " + position.y + " " + position.z);
		console.log("playerCreateWaypoint " + position.x + " " + position.y + " " + position.z);
	},
	"playerReachWaypoint" : player =>
	{	
		console.log("playerReachWaypoint");
		player.outputChatBox("playerReachWaypoint");
	},
	"playerStreamIn" : (player, _player) =>
	{
		player.outputChatBox("playerStreamIn: " + player.name + " - " + _player.name);
		_player.outputChatBox("playerStreamIn: " + player.name + " - " + _player.name);
		console.log("playerStreamIn: " + player.name + " - " + _player.name);
	},
	"playerStreamOut" : (player, _player) =>
	{
		player.outputChatBox("playerStreamOut: " + player.name + " - " + _player.name);
		_player.outputChatBox("playerStreamOut: " + player.name + " - " + _player.name);
		console.log("playerStreamOut: " + player.name + " - " + _player.name);
	},
	"playerDeath" : (player, reason, killer) =>
	{
		if(killer !== null && killer !== undefined)
		{
			if(player.customData.auth === true) 
			{
				killer.customData.kills = killer.customData.kills + 1 || 1;
				player.customData.deaths = player.customData.deaths + 1 || 1;
				if((killer.customData.member === 1 || killer.customData.member === 6) && player.customData.offense > 0 && killer.id !== player.id)
				{
					player.customData.jail = 120 * player.customData.offense;
					player.outputChatBox("<font color='red'><b>Вы были арестованы на: " + String(120 * player.customData.offense) + " секунд. Арестовал: "+ killer.name + ".</b></font>");
					mp.players.forEach(_player => { if(_player.customData.member === 1 || _player.customData.member === 6) _player.outputChatBox("<b><font color='#FF6347'><< Офицер " + killer.name + " арестовал " + player.name +". >></font></b>"); });	
					killer.customFunc.setWantedLvl(0);
				} 
				else if((killer.customData.member !== 1 && killer.customData.member !== 6 && killer.customData.member !== 2) && killer.customData.jail === 0 && killer.id !== player.id)
				{
					if(player.customData.member === 1 || player.customData.member === 6)
					{
						killer.outputChatBox("<font color='red'><b>Вы совершили преступление: Убийство полицейского [+3]</b></font>");
						mp.players.forEach(_player => { if(_player.customData.member === 1 || _player.customData.member === 6) _player.outputChatBox("<b><font color='#FEBC41'>[R] Cообщает: Диспечер. Преступление: Убийство полицейского. Подозреваемый: " + killer.name + "[+3]</font></b>"); });	
						killer.customFunc.setWantedLvl(3);
										
					}
					else
					{
						killer.outputChatBox("<font color='red'><b>Вы совершили преступление: Убийство [+1]</b></font>");
						mp.players.forEach(_player => { if(_player.customData.member === 1 || _player.customData.member === 6) _player.outputChatBox("<b><font color='#FEBC41'>[R] Cообщает: Диспечер. Преступление: Убийство. Подозреваемый: " + killer.name + "[+1]</font></b>"); });	
						killer.customFunc.setWantedLvl(1);					
					}
				}
			}
		}
		player.customData.sleep = 5;
	},
	"playerQuit" : (player, reason, kickReason) =>
	{
		let name = player.name;
		let ip = player.ip;
		if (player.customData.person_summon_cars == 1)
		{
			console.log("1 there");
			mp.vehicles.forEach.forEach(car => { 
				if(car.customData.owner != undefined && car.customData.owner == name)
				{
					console.log("removing");
					car.destroy();
				}
			});	
		}
		switch (reason) 
		{
			case "disconnect":	console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] " + name + " quit.");
								break;
			case "timeout":		console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] " + name + " timeout.");
								break;
				break;
			case "kicked":		console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] " + name + " kicked. Reason: " + reason + ".");
								break;		
		}
		if(player.customData.auth){
			global.pool.query("UPDATE `user` SET `password_hash` = ?, `updated_at` = ?, `ip` = ?, `member` = ?, `rank` = ?, `job` = ?, `admin` = ?, `exp` = ?, `kills` = ?, `deaths` = ?, `phone` = ?, `bank` = ?, `offense` = ?, `mute` = ?, `ban` = ?, `jail` = ?, `dehydration` = ?, `satiety` = ?, `narcomaniac` = ?, `items` = ?, `email` = ?,  `personage` = ? WHERE `username` = ?", [String(player.customData.password), parseInt(Math.round((new Date().getTime())/1000)), String(ip), parseInt(player.customData.member), parseInt(player.customData.rank), parseInt(player.customData.job.id), parseInt(player.customData.admin), parseInt(player.customData.exp), parseInt(player.customData.kills), parseInt(player.customData.deaths), String(JSON.stringify(player.customData.phone)), parseInt(player.customData.bank), parseInt(player.customData.offense), parseInt(player.customData.mute), parseInt(player.customData.ban), parseInt(player.customData.jail), parseInt(player.customData.dehydration), parseInt(player.customData.satiety), parseInt(player.customData.narcomaniac), String(JSON.stringify(player.customData.item)), String(player.customData.email), String(JSON.stringify(player.customData.personage)), String(name)], function (error, rows, fields) { 
				if(error) {
					console.log('Error table "user"');
					throw error;
				}
			});
		}
	},
	"playerChat": (player, text) =>
	{
		if(!player.customFunc.testAuth()) return;
		if((text = API.striptags(text, "<b><s><u><strong>")) === "") return;
		if(player.customFunc.testFloodEvent("playerChat")) return;
		if(player.customFunc.testFloodText(text)) return;
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		let str;
		if(text === ")" || text === "))") 
		{
			str = "<font color='#c2a2da'><b>" + player.name + " улыбается</b></font>";
		}
		else if(text === "xD" || text === "xd" || text === ":В") 
		{
			str = "<font color='#c2a2da'><b>" + player.name + " смеётся</b></font>";
		}
		else if(text === "здравия") 
		{
			str = "<font color='#c2a2da'><b>" + player.name + " отдал(а) честь</b></font>";
		}
		else if(text === "чВ" || text === "хД" || text === "хд" || text === "xdd") 
		{
			str = "<font color='#c2a2da'><b>" + player.name + " валяется от смеха</b></font>";
		}			
		else if(text === "xd" || text === ":D" || text === "xd") 
		{
			str = "<font color='#c2a2da'><b>" + player.name + " хохочет во весь голос</b></font>";
		}
		else if(text === "((" || text === "(") 
		{
			str = "<font color='#c2a2da'><b>" + player.name + " грустит</b></font>";
		} 
		else 
		{
			str = `${player.name}: ${text}`;
		}
		mp.players.broadcastInRange(player.position, 20, str);
	}
};