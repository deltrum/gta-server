const md5 = require("md5");

function testLaunchStage(player) {
	if(global.launchStage.step !== global.launchStage.steps)	{
		player.call("alert", "error", "Сервер еще запускается! Подождите..");
		return true;
	}
	return false;
}

function login(player)
	{
		global.pool.query("SELECT * FROM user WHERE username = ? LIMIT 1", [player.name], function (error, rows, fields) {  
			if(error) {
				console.log('Error table "user"');
				throw error;
			}
			if(rows.length == 1) 
			{
				player.customData.password = String(rows[0].password_hash);
				player.customData.email = String(rows[0].email);
				player.customData.personage = JSON.parse(rows[0].personage);
				if(!isNaN(parseInt(rows[0].id))) player.customData.id = parseInt(rows[0].id);
				if(!isNaN(parseInt(rows[0].member))) player.customData.member = parseInt(rows[0].member);
				if(!isNaN(parseInt(rows[0].job))) player.customData.job.id = parseInt(rows[0].job);
				if(!isNaN(parseInt(rows[0].exp))) player.customData.exp = parseInt(rows[0].exp);
				if(!isNaN(parseInt(rows[0].rank))) player.customData.rank = parseInt(rows[0].rank);
				if(!isNaN(parseInt(rows[0].admin))) player.customData.admin = parseInt(rows[0].admin);
				if(!isNaN(parseInt(rows[0].kills))) player.customData.kills = parseInt(rows[0].kills);
				if(!isNaN(parseInt(rows[0].deaths))) player.customData.deaths = parseInt(rows[0].deaths);
				if(!isNaN(parseInt(rows[0].phone))) player.customData.phone.number = parseInt(rows[0].phone);
				if(!isNaN(parseInt(rows[0].bank))) player.customData.bank = parseInt(rows[0].bank);
				if(!isNaN(parseInt(rows[0].phone))) player.customData.phone.number = parseInt(rows[0].phone);
				if(!isNaN(parseInt(rows[0].offense))) player.customFunc.setWantedLvl(rows[0].offense);
				if(!isNaN(parseInt(rows[0].mute))) player.customData.mute = parseInt(rows[0].mute);
				if(!isNaN(parseInt(rows[0].ban))) player.customData.ban = parseInt(rows[0].ban);
				if(!isNaN(parseInt(rows[0].jail))) player.customData.jail = parseInt(rows[0].jail);
				if(!isNaN(parseInt(rows[0].dehydration))) player.customData.dehydration = parseInt(rows[0].dehydration);
				if(!isNaN(parseInt(rows[0].satiety))) player.customData.satiety = parseInt(rows[0].satiety);
				if(!isNaN(parseInt(rows[0].narcomaniac))) player.customData.narcomaniac = parseInt(rows[0].narcomaniac);
				player.customData.item = rows[0].items == "" ? {} : JSON.parse(rows[0].items)
				player.call("login", player.customData.admin, player.customData.item.money !== undefined ? player.customData.item.money : 0);
				if(player.customData.member === 1 || player.customData.member === 6) {
					player.call("setPoliceWanted", JSON.stringify(API.getWantedList()));
					player.call("setPoliceMembers", player.customData.rank === game.faction[player.customData.member].rank.length ? true : false, JSON.stringify(API.getMemberList(player.customData.member)));
					player.call("setPoliceStat", JSON.stringify(API.getStatList(player.customData.member)));
					player.call("setPoliceCall", JSON.stringify(global.game.callPolice));
				}
				var playerAFK = [];
				player.streamedPlayers.forEach(_player  => {
					if(_player.data.afk !== undefined) playerAFK[_player.id] = _player.data.afk;
				});
				player.call("nametags", JSON.stringify(game.control.colors), JSON.stringify(playerAFK));	
				player.customData.auth = true;				
				player.customFunc.generate();		
				console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] " + player.name + " logged.");
			} 
			else 
			{
				 player.outputChatBox("Вы были кикнуты с сервера. Причина: Ошибка авторизации.");
				 player.kick("Ошибка авторизации.");
			}
		});
	}
	
module.exports =
{
	"reg" : (player, name, password, email, personage) =>
	{
		console.log(name, password, email);
		console.log(personage);
		if(player.customFunc.testFloodEvent("reg")) {
			player.call("setGui", "reg");
			console.log("1 - " + name)
			return;
		}
		if(testLaunchStage(player)) {
			player.call("setGui", "reg");
			console.log("2 - " + name)
			return;
		}
		if(player.customData.auth) return  player.call("alert", "warning", "Вы уже авторизовались.");	
		name = name.replace( /"/g, "'" ).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		if(name.length < 3 || name.length > 30)
		{
			player.call("alert", "error", "Длина игрового имени должна быть не меньше 3 и не больше 32 символов");
			player.call("setGui", "reg");
			return;
		}			
		if(!/^([A-Z][a-z]+_[A-Z][a-z]+)$/.test(name)) {
			player.call("alert", "error", "Некорректное игровое имя. Пример РП никнейма: Tal_Rasha");
			player.call("setGui", "reg");
			return;
		}
		password = password.replace( /"/g, "'" ).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		if(password.length < 6)	{
			player.call("alert", "error", "Длина пароль должна быть не меньше 6 символов");
			player.call("setGui", "reg");
			return;
		}
		email = email.replace( /"/g, "'" ).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		if(email !== "" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
			player.call("alert", "error", "Некорректный адрес электронной почты. Пример: gta5-multiplayer@gmail.com");
			player.call("setGui", "reg");
			return;
		}
		try {	
			personageArr = JSON.parse(personage);
			if(personageArr.length !== 4 || personageArr[1].length !== 4 || personageArr[2].length !== 20 || personageArr[3].length !== 4) {
				player.call("alert", "error", "Вы были кикнуты с сервера. Причина: Некорректная конфигурация персонажа");
				return player.kick("Некорректная конфигурация персонажа!");		
			}
			if(personageArr[0] !== 0 && personageArr[0] !== 1) {
				player.call("alert", "error", "Вы были кикнуты с сервера. Причина: Ошибка выбора пола персонажа!");
				return player.kick("Ошибка выбора пола персонажа!");			
			}
			let face = [
				[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 42, 43, 44], 
				[21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 45]
			];

			if(face[0].indexOf(personageArr[1][0]) == -1 || face[1].indexOf(personageArr[1][1]) == -1) {
				player.call("alert", "error", "Вы были кикнуты с сервера. Причина: Ошибка выбора лица персонажа!");
				return player.kick("Ошибка выбора лица персонажа!");			
			}
			if(personageArr[1][2] < 0 || personageArr[1][2] > 1.0 || personageArr[1][3] < 0 || personageArr[1][3] > 1.0 ){
				player.call("alert", "error", "Вы были кикнуты с сервера. Причина: Ошибка выбора наследсвености персонажа!");
				return player.kick("Ошибка выбора наследсвености персонажа!");			
			}
			personageArr[2].forEach(function(item) { 
				if(item !== -1 && item !== 1 && item !== 0) {
					player.call("alert", "error", "Вы были кикнуты с сервера. Причина: Ошибка выбора характеристик персонажа!");
					return player.kick("Ошибка выбора характеристик персонажа!");			
				}
			});
			let hair = [36, 38];
			if(personageArr[3][0] > hair[personageArr[0]] || personageArr[3][0] < 0 || personageArr[3][1] < 0 || personageArr[3][1] > 63 || personageArr[3][2] < 0 || personageArr[3][2] > 63 || personageArr[3][3] < 0 || personageArr[3][3] > 31) {
					player.call("alert", "error", "Вы были кикнуты с сервера. Причина: Ошибка выбора внешности персонажа!");
					return player.kick("Ошибка выбора внешности персонажа!");				
			}
		}
		catch (e) { 
			player.call("alert", "error", "Вы были кикнуты с сервера. Причина: Ошибка персонализации персонажа!");
			return player.kick("Ошибка персонализации персонажа!");	
		}	
		global.pool.query("SELECT password_hash FROM user WHERE username = ? LIMIT 1", [name], function (error, rows, fields) {  
			if(error) {
				console.log('Error table "user"');
				throw error;
			}
			if(rows.length == 1) {
				player.call("alert", "error", "Игровое имя уже занято");
				player.call("setGui", "reg");
			} else {
				console.log("Регистрация " + name + " Кеш " + md5(password) + ".");
				global.pool.query("INSERT INTO user (username, password_hash, created_at, ip, regip, email, items, personage,auth_key,phone) VALUES (?,?,?,?,?,?,?,?,?,?)", [String(name), md5(password), String(Math.round((new Date().getTime())/1000)), String(player.ip), String(player.ip), String(email), String(""), String(personage), String(""), String("")], function (error, rows, fields) {  
					if (error) {

						console.log('Error on register');
						console.log(error);
						throw error;
					} else {
						console.log('Аккаунт добавлен в базу');
					}
					player.call("alert", "success", "Вы успешно зарегистрировались.");
					player.name = name;
					player.call("setDiscordPresence", name, "Безработный");
					//player.call("setGui", "login");
					login(player);
					//player.spawn(new mp.Vector3(-1037.503906, -2738.813, 13.8));					
				});
			}
		});
	},
	"checkname": (player, name) =>
	{
		global.pool.query("SELECT password_hash FROM user WHERE username = ? LIMIT 1", [name], function (error, rows, fields) {  
			if(error) {
				console.log(error);
				throw error;
			}
			if(rows.length == 1) {
				player.call("alert", "error", "Игровое имя уже занято");
				player.call("setGui", "reg");
			return;
			} else {
				player.call("alert", "success", "Имя свободно");
			}
		});
	},
	"login": (player, name, password) =>
	{
		if(player.customFunc.testFloodEvent("login")) {
			player.call("setGui", "login");
			return;
		}	 	
		if(testLaunchStage(player)) {
			player.call("setGui", "login");
			return;
		}	 	
		if(player.customData.auth) return  player.call("alert", "warning", "Вы уже авторизовались.");
		if(name.length < 3 || name.length > 30)
		{
			player.call("alert", "error", "Длина игрового имени должна быть не меньше 3 и не больше 32 символов");
			player.call("setGui", "login");
			return;
		}			
		if(!/^([A-Z][a-z]+_[A-Z][a-z]+)$/.test(name)) {
			player.call("alert", "error", "Некорректное игровое имя. Пример РП никнейма: John_Dow");
			player.call("setGui", "login");
			return;
		}
		password = password.replace( /"/g, "'" ).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		if(password.length < 6)	{
			player.call("alert", "error", "Длина пароль должна быть не меньше 6 символов");
			player.call("setGui", "login");
			return;
		}		
		if(player.customData.password == undefined || player.name !== String(name)) {
			global.pool.query("SELECT password_hash FROM user WHERE username = ? LIMIT 1", [String(name)], function (error, rows, fields) {  
				if(error) {
					console.log('Error table "user"');
					throw error;
				}
				if(rows.length == 1) 
					{
						player.customData.password = String(rows[0].password_hash);
						player.name = String(name)
						if(player.customData.password !== md5(password)) {
							player.call("setGui", "login");
							player.call("alert", "error", "Вы ввели неправильный пароль.");
						} else {
							login(player);
							player.call("setDiscordPresence", String(name), game.faction[player.customData.member].member);
							player.call("alert", "success", "Вы успешно авторизовались.");
						}
					} 
					else 
					{
						player.call("setGui", "login");
						player.call("alert", "error", "Аккаунт не существует или удален!");

					}			
			});
		} else {
			if(player.customData.password !== md5(password)) {
				player.call("setGui", "login");
				player.call("alert", "error", "Вы ввели неправильный пароль.");
			} else {
				login(player);
				player.call("alert", "success", "Вы успешно авторизовались.");
			}
		}
	}
};