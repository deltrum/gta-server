const md5 = require("md5");


module.exports =
{
	"getDataControl" : (player) =>
	{
		if(player.customFunc.testFloodEvent("getDataControl")) return;
		if(player.customData.timer.control === 0) {
			let profile = {
				floor: player.customData.personage[0],
				name: player.name,
				exp: player.customData.exp,
				deaths: player.customData.deaths,
				kills: player.customData.kills,
				offense: player.customData.offense,
				faction: game.faction[player.customData.member].member,
				rank: (game.faction[player.customData.member] != 0 && game.faction[player.customData.member].rank[player.customData.rank-1] || "Отсутствует"),
				job: player.customData.job.id,
				dehydration: player.customData.dehydration,
				satiety: player.customData.satiety
			}		
			player.call("setDataControl", JSON.stringify(profile), JSON.stringify(player.customData.item), JSON.stringify(API.getPings()));
			player.customData.timer.control = 15;
		}
	},
	"updatePasswordControl" : (player, password) =>
	{
		if(player.customFunc.testFloodEvent("updatePasswordControl")) return;
		password = password.replace( /"/g, "'" ).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		if(password.length < 6) return player.call("alert", "error" , "Длина пароль должна быть не меньше 6 символов");
		player.customData.password = md5(password);
		player.call("alert", "success" , "Пароль успешно изменен.");		
	},
	"updateNameControl" : (player, name) =>
	{
		if(player.customFunc.testFloodEvent("updateNameControl")) return;
		player.call("alert", "error" , "Временно отключено!");
	},
	"updateEmailControl" : (player, email) =>
	{
		if(player.customFunc.testFloodEvent("updateEmailControl")) return;
        email = email.replace( /"/g, "'" ).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return window.setAlert("error", "Некорректный адрес электронной почты. Пример: admin@ren-play.ru");
		player.customData.email = email;
		player.call("alert", "success" , "Почта успешно изменен.");
	},	
	"supportControl": (player, message) =>
	{
		if(player.customFunc.testFloodEvent("supportControl")) return;
		global.discordAPI.send("Игровое имя: " + player.name + "\nКатегория: Техподдержка\n```" + message + "```");
		player.call("alert", "success" , "Ваша проблема успешна отправлена.");
	},
	"helperControl": (player, message) =>
	{
		if(player.customFunc.testFloodEvent("helperControl")) return;
		message = message.replace( /"/g, "'" ).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		if(message === "") return player.call("alert", "error" , "Вы не можете отправить пустую строку");
		player.outputChatBox("<font color='#F5DEB3'><b>Жалоба: </font>" + message + "<br><font color='#F5DEB3'>Ваша жалоба была отправлена администрации сервера</b></font>");
		mp.players.forEach(_player => { if(_player.customData.admin > 0) { _player.outputChatBox("<font color='#F5DEB3'><b>Жалоба от " + player.name + " [" + player.id + "]:</font> " + message + "</b>"); } });	
	},
	"wishesControl": (player, message) =>
	{
		if(player.customFunc.testFloodEvent("wishesControl")) return;
		global.discordAPI.send("Игровое имя: " + player.name + "\nКатегория: Предложения и пожелания\n```" + message + "```");
		player.call("alert", "success" , "Ваше предложение успешно отправлено.");
	}
};