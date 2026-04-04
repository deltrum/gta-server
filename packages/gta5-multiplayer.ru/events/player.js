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
				if(API.isPoliceFaction(killer.customData.member) && player.customData.offense > 0 && killer.id !== player.id)
				{
					player.customData.jail = CONST.JAIL_TIME_MULTIPLIER * player.customData.offense;
					player.outputChatBox("<font color='red'><b>Вы были арестованы на: " + String(CONST.JAIL_TIME_MULTIPLIER * player.customData.offense) + " секунд. Арестовал: "+ killer.name + ".</b></font>");
					mp.players.forEach(_player => { if(API.isPoliceFaction(_player.customData.member)) _player.outputChatBox("<b><font color='#FF6347'><< Офицер " + killer.name + " арестовал " + player.name +". >></font></b>"); });
					killer.customFunc.setWantedLvl(0);
				}
				else if(!API.isPoliceFaction(killer.customData.member) && killer.customData.member !== CONST.FACTION_ARMY && killer.customData.jail === 0 && killer.id !== player.id)
				{
					if(API.isPoliceFaction(player.customData.member))
					{
						killer.outputChatBox("<font color='red'><b>Вы совершили преступление: Убийство полицейского [+3]</b></font>");
						mp.players.forEach(_player => { if(API.isPoliceFaction(_player.customData.member)) _player.outputChatBox("<b><font color='#FEBC41'>[R] Cообщает: Диспечер. Преступление: Убийство полицейского. Подозреваемый: " + killer.name + "[+3]</font></b>"); });
						killer.customFunc.setWantedLvl(3);

					}
					else
					{
						killer.outputChatBox("<font color='red'><b>Вы совершили преступление: Убийство [+1]</b></font>");
						mp.players.forEach(_player => { if(API.isPoliceFaction(_player.customData.member)) _player.outputChatBox("<b><font color='#FEBC41'>[R] Cообщает: Диспечер. Преступление: Убийство. Подозреваемый: " + killer.name + "[+1]</font></b>"); });
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
			mp.vehicles.forEach(car => {
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
			case "kicked":		console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] " + name + " kicked. Reason: " + reason + ".");
								break;		
		}
		API.savePlayerToDb(player);
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
		mp.players.broadcastInRange(player.position, CONST.RANGE_CHAT, str);
	}
};