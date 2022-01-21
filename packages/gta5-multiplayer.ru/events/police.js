module.exports =
{
	"updatePoliceWanted" : (player) =>
	{
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		player.call("setPoliceWanted", JSON.stringify(API.getWantedList()));
	},	
	"updatePoliceMembers" : (player) =>
	{
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		player.call("setPoliceMembers", player.customData.rank === game.faction[player.customData.member].rank.length ? true : false, JSON.stringify(API.getMemberList(player.customData.member)));
	},	
	"updatePoliceStats" : (player) =>
	{	
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		player.call("setPoliceStat", JSON.stringify(API.getStatList(player.customData.member)));
	},
	"updatePoliceCall" : (player) =>
	{	
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		player.call("setPoliceCall", JSON.stringify(global.game.callPolice));
	},	
	"takePoliceCall" : (player, id) =>
	{	
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		if((_player = mp.players.at(parseInt(id))) === null) return player.call("alert", "error" , "Неверный ID игрока");
		console.log(global.game.callPolice)
		global.game.callPolice[parseInt(id)] = undefined;
		player.call("setPoliceCall", JSON.stringify(global.game.callPolice));
		player.call("alert", "success" , "Вызов принят");
		console.log(global.game.callPolice)
	},	
	"takePoliceCancel" : (player, id) =>
	{	
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		if((_player = mp.players.at(parseInt(id))) === null) return player.call("alert", "error" , "Неверный ID игрока");
		global.game.callPolice[parseInt(id)] = undefined;
		player.call("setPoliceCall", JSON.stringify(global.game.callPolice));
		player.call("alert", "success" , "Вызов отклонен");
	},	
	"policeSu" : (player, id, star, reason) =>
	{
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		if(isNaN(star = parseInt(star))) return player.call("alert", "error" , "Уровень розыска от 1 до 6");
		if(star < 1 || star > 6) return player.call("alert", "error" , "Уровень розыска от 1 до 6");
		if((_player = mp.players.at(parseInt(id))) === null) return player.call("alert", "error" , "Неверный ID игрока");
		//if(player === _player) return player.call("alert", "error" , "Вы указали себя");
		if(_player.customData.jail !== 0) return player.call("alert", "error" , "Уже арестован.");
		//if(_player.customData.member === 1 || _player.customData.member === 2 || _player.customData.member === 4 || _player.customData.member === 5 || _player.customData.member === 6) return player.call("alert", "error" , "Нарушитель состоит в гос.организации"); 
		if((reason = API.striptags(reason, "<b><s><u><strong>")) === "") return player.call("alert", "error" , "Укажите причину");	
		_player.customFunc.setWantedLvl(star);
		_player.outputChatBox("<font color='red'><b>Вы совершили преступление: " + reason + "[+" + star + "]. Сообщает: "+player.name + ".</b></font>");
		mp.players.forEach(_player => { if(_player.customData.member === 1 || _player.customData.member === 6) _player.outputChatBox("<b><font color='#FEBC41'>[R] Cообщает: " + player.name + ". Преступление: " + reason + ". Подозреваемый: " + _player.name + "[+" + star + "]</font></b>"); });	
		player.call("setPoliceWanted", JSON.stringify(API.getWantedList()));
	},
	"policeFine" : (player, id, price, reason) =>
	{
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		if((_player = mp.players.at(parseInt(id))) === null) return player.call("alert", "error" , "Неверный ID игрока");
		//if(player === _player) return player.call("alert", "error" , "Вы указали свой себя");
		if(isNaN(price = parseInt(price)) || price < 100 || price > 10000) return player.call("alert", "error" , "Укажите число от $100 до $10000");
        if((reason = API.striptags(reason, "<b><s><u><strong>")) === "") return player.call("alert", "error" , "Укажите причину");	
		_player.customData.police.fine.push([new Date().getTime(), price, reason]);
		player.call("alert", "suc" , "Вы выписали штраф " + _player.name);
		_player.outputChatBox("<font color='red'><b>" + player.name + " выписал вам штраф на сумму: $" + price + ". По причине: " + reason  + "</b></font>");
	},
	"policeInfo" : (player, id) =>
	{
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		if((_player = mp.players.at(parseInt(id))) === null) return player.call("alert", "error" , "Неверный ID игрока");
		player.customData.police.info = id;
		player.call("setPoliceInfo", _player.name, _player.customData.offense, JSON.stringify(_player.customData.police.fine));
	},
	"policeFineCancel" : (player, id) =>
	{
		if(player.customData.police.info === -1) return player.call("alert", "error" , "Данные некорректные.");
		if((_player = mp.players.at(parseInt(player.customData.police.info))) === null) return player.call("alert", "error" , "Неверный ID игрока");
		//if(player === _player) return player.call("alert", "error" , "Вы указали себя");
		if(isNaN(id = parseInt(id))) return player.call("alert", "error" , "Штраф не найден");
		if(_player.customData.police.fine[player.customData.police.info] === undefined ) return player.call("alert", "error" , "Штраф не найден");
		_player.customData.police.fine.splice(id, 1);
		player.call("setPoliceInfo", _player.name, _player.customData.offense, JSON.stringify(_player.customData.police.fine));
		player.call("alert", "success" , "Штраф успешно отменен");
	},
	"policeSearch" : (player, id) =>
	{
		player.call("alert", "warning" , "Функция policeSearch отключена");
	},
	"policeClear" : (player, id) =>
	{
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		if(player.vehicle === undefined) return player.call("alert", "error" , "Вы не в машине");  
		if(player.vehicle.customData.faction !== player.customData.member) return player.call("alert", "error" , "Вы не в служебной машине"); 
		if((_player = mp.players.at(parseInt(id))) === null) return player.call("alert", "error" , "Неверный ID игрока");
		mp.players.broadcastInRange(player.position, 20, "<font color='#c2a2da'><b>"+player.name +" снял(а) розыск " + _player.name + "</b></font>");		
		mp.players.forEach(__player => { if(__player.customData.member === 1 || __player.customData.member === 6) __player.outputChatBox("<b><font color='#FF6347'><< Офицер " + player.name + " отменил(а) розыск у " + _player.name +". >></font></b>"); });	
		_player.customFunc.setWantedLvl(0);
		player.call("setPoliceWanted", JSON.stringify(API.getWantedList()));
	},
	"policeUpRank" : (player, id) =>
	{
		player.call("alert", "warning" , "Функция policeUpRank отключена");
	},	
	"policeDownRank" : (player, id) =>
	{
		player.call("alert", "warning" , "Функция policeDownRank отключена");
	},	
	"policeRemove" : (player, id) =>
	{
		player.call("alert", "warning" , "Функция policeRemove отключена");
	},
};