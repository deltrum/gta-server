/*		if(player.customData.phone.call !== -1) 
		{
			player.call("phoneHistoryCall", 0);
			mp.players.at(player.customData.phone.call).customData.phone.call("phoneHistoryCall", 0);
			mp.players.at(player.customData.phone.call).customData.phone.call = -1;
			mp.players.at(player.customData.phone.call).customData.phone.talk = 0;
			mp.players.at(player.customData.phone.call).customData.timer.call = 0;
			player.customData.phone.call = -1;				
			player.customData.phone.talk = 0;
			player.customData.timer.call = 0;
		}
		if(player.customData.phone.call !== -1) 
		{
			player.call("phoneHistoryCall", 0);
			mp.players.at(player.customData.phone.call).customData.phone.call("phoneHistoryCall", 0);
			mp.players.at(player.customData.phone.call).customData.phone.call = -1;
			mp.players.at(player.customData.phone.call).customData.phone.talk = 0;
			mp.players.at(player.customData.phone.call).customData.timer.call = 0;
			player.customData.phone.call = -1;				
			player.customData.phone.talk = 0;
			player.customData.timer.call = 0;
		}
		if(player.customData.phone.call !== -1 && player.customData.phone.call) {
			str = player.name + "[Телефон]: " + text;
			mp.players.at(player.customData.phone.call).outputChatBox(str);
			mp.players.broadcastInRange(player.position, 20, str);
		} 
		else
		{
		if(player.customData.timer.call === 0 && player.customData.phone.call !== -1) 
		{
			player.call("phoneHistoryCall", 1);
			mp.players.at(player.customData.phone.call).call("phoneHistoryCall", 1);
			mp.players.at(player.customData.phone.call).customData.phone.call = -1;
			player.customData.phone.call = -1;
		}
		if(player.customData.phone.call !== -1 && (player.customData.phone.not || player.customData.phone.online)) {
			player.call("phoneHistoryCall", 0);
			mp.players.at(player.customData.phone.call).customData.phone.call("phoneHistoryCall", 0);
			mp.players.at(player.customData.phone.call).customData.phone.call = -1;
			mp.players.at(player.customData.phone.call).customData.phone.talk = 0;
			mp.players.at(player.customData.phone.call).customData.timer.call = 0;
			player.customData.phone.call = -1;				
			player.customData.phone.talk = 0;
			player.customData.timer.call = 0;			
		}
		*/
module.exports =
{
	"phoneSignal" : (player) =>
	{
		if(player.customData.phone.online === 1) {
			player.customData.phone.online = 0;
			player.call("alert", "success", "Авиарежим выключен");
			player.call("pSignal", 0);
		} else {
			player.customData.phone.online = 1;
			player.call("alert", "success", "Авиарежим включен");
			player.call("pSignal", 1);
		}
	},
	"phoneSms" : (player, number, text) =>
	{
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(player.customData.phone.not) return player.call("alert", "error" , "У вас нету телефона.");
		if(player.customData.phone.online) return player.call("alert", "error" , "У вас включен авиарежим.");
		if(isNaN(parseInt(number)) || number > 999999) return setAlert("error", "Неправельно набран номер");
		let message = API.striptags(text, "<b><s><u><strong>");
		if(message === "") return setAlert("error", "Вы не можете отправить пустое сообщение");
		if(parseInt(number) === 111)	{
			if(player.customData.phone.balance-game.faction[7].smsPrice < 0) return player.call("alert", "error" , "У вас недостаточно средств на балансе телефона.");
			player.customData.phone.balance -= game.faction[7].smsPrice;
			game.faction[7].balance += game.faction[7].smsPrice;
			let str = "<font color='#FDE640'><b>[Эфир]: " + message +" Отправитель: " + player.name + " Тел.: " + player.customData.phone.number + "</b></font><br>";		
			return player.call("addMessagePhone", 111, game.faction[7].member, "right", message);
		}
		const number_id = API.number(parseInt(number));
		if(number_id === -1) return player.call("alert", "warning" , "Сообщение не доставлено. Абонент недоступен!");
		if(mp.players.at(number_id).customData.phone.not || mp.players.at(number_id).customData.phone.online) player.call("alert", "warning" , "Сообщение не доставлено. Абонент недоступен!");
		//if(player.id === number_id) return player.call("alert", "error" , "Сообщение не доставлено. Вы указали свой номер!");
		if(player.customData.phone.balance-10 < 0) return player.call("alert", "error" , "У вас недостаточно средств на балансе телефона.");
		player.customData.phone.balance -= 10;
		game.faction[4].balance += 10;
		player.call("addMessagePhone", parseInt(number), mp.players.at(number_id).name, "right", message);
		mp.players.at(number_id).call("addMessagePhone", player.customData.phone.number, player.name, "left", message);
	},
	"phoneBalance" : (player) =>
	{
		if(player.customData.phone.not) return player.call("alert", "error" , "У вас нету телефона.");
		if(player.customData.phone.online) return player.call("alert", "error" , "У вас включен авиарежим");
		player.call("pBalance", player.customData.phone.balance);
	},
	"phoneCall" : (player, number) =>
	{
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(player.customData.phone.not) return player.call("alert", "error" , "У вас нету телефона.");
		if(player.customData.phone.online) return player.call("alert", "error" , "У вас включен авиарежим.");
		if(player.customData.phone.call !== -1) return player.call("alert", "warning" , "Линия занята. Вы уже разговаривает!");
		if(isNaN(parseInt(number)) || number > 999999) return setAlert("error", "Неправельно набран номер");
		const number_id = API.number(parseInt(number));
		if(number_id === -1) return player.call("alert", "warning" , "Звонок не удался. Абонент недоступен!");
		if(player.customData.phone.balance-50 < 0) return player.call("alert", "error" , "У вас недостаточно средств на балансе телефона.");
		//if(player.id === number_id) return player.call("alert", "error" , "Вы указали свой номер");
		if(mp.players.at(number_id).customData.phone.not || mp.players.at(number_id).customData.phone.online) player.call("alert", "warning" , "Звонок не удался. Абонент недоступен!");
		if(mp.players.at(number_id).customData.phone.call !== -1) return player.call("alert", "warning" , "Линия занята. Абонент уже разговаривает!");
		player.customData.phone.call = number_id;
		mp.players.at(number_id).customData.phone.call = player.id;
		player.customData.timer.call = 30;
		player.call("pCall", mp.players.at(number_id).customData.phone.number, mp.players.at(number_id).name, 1);
		mp.players.at(number_id).call("pCall", player.customData.phone.number, player.name, 0)
	},
	"phoneCallCancel" : (player) =>	
	{
		if(player.call === -1) return player.call("alert", "error" , "Вы не с кем не разговариваете!");
		player.call("phoneHistoryCall", 2);
		mp.players.at(player.customData.phone.call).call("phoneHistoryCall", 2);
		mp.players.at(player.customData.phone.call).customData.phone.call = -1;
		mp.players.at(player.customData.phone.call).customData.phone.talk = 0;
		mp.players.at(player.customData.phone.call).customData.timer.call = 0;
		player.customData.phone.call = -1;				
		player.customData.phone.talk = 0;
		player.customData.timer.call = 0;
	},
	"phoneCallMake" : (player) =>	
	{
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(player.customData.phone.not) return player.call("alert", "error" , "У вас нету телефона.");
		if(player.customData.phone.online) return player.call("alert", "error" , "У вас включен авиарежим.");		
		if(player.customData.phone.call === -1) return player.call("alert", "error" , "Вам никто не звонит!");
		if(player.customData.phone.talk) return player.call("alert", "error" , "Вы уже разговариваете..");
		if(mp.players.at(player.customData.phone.call).customData.phone.phone.balance-50 > 0) mp.players.at(player.customData.phone.call).customData.phone.phone.balance -= 50;
		game.faction[4].balance += 50;
		player.customData.phone.talk = 1;
		player.customData.timer.call = 0;
		player.call("phoneTalk");
		mp.players.at(player.call).customData.phone.talk = 1;
		mp.players.at(player.customData.phone.call).customData.timer.call = 0;
		mp.players.at(player.customData.phone.call).call("phoneTalk");
	}
};