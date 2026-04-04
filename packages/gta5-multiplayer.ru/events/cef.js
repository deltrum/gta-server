"use strict";

const configure = require('../systems/config.js');
const { pool } = require('../systems/mysql.js');
const shopItems = require('../configs/shop.json');
const houseUtils = require('../systems/house-utils.js');
module.exports =
{
	"busFinish" : (player) => {
		player.customData.job.salary += game.route[player.customData.job.busRoute].price;
		player.call("alert", "success" , "Маршрут успешно пройден! Зарплата: " + game.route[player.customData.job.busRoute].price);
		player.customData.job.busRoute = -1;
		player.customData.job.busId = -1;
		let routeList = API.routeList();
		routeList.push("Аренда автобуса | $500");
		routeList.push("Закрыть");
		player.customFunc.setMenu(2, "Маршруты автобуса", routeList, "");
	},
	"licFinish" : (player) => {
		player.call("alert", "success" , "Маршрут успешно пройден! Вы получили права");
		player.customData.item.lic_car = true
		player.removeFromVehicle()
	},
	"busСancel" : (player) => {
		player.customData.job.busRoute = -1;
		player.customData.job.busId = -1;
		player.call("alert", "error" , "Маршрут провален");
	},	
	"licСancel" : (player) => {
		player.call("alert", "error" , "Маршрут провален");
	},	
	
	"getAFK" : (player, id) => {
		player.call("updateAFK", id, mp.players.at(id).customData.afk);
	},
	"afk": (player, afk) => {
		if(afk) {
			player.customData.afk = 0;
			mp.players.call(player.streamedPlayers, 'updateAFK', player.id, 0);
		} else  {
			player.customData.afk = undefined;
			mp.players.call(player.streamedPlayers, 'updateAFK', player.id, undefined);
		}
	},
	"evalServer": (player, cmd) => {
		if(player.customData.admin < CONST.ADMIN_HEAD) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		// eval() removed for security - remote code execution vulnerability
		player.call("alert", "error", "evalServer отключен по соображениям безопасности");
	},
	"topsAuth": (player, q, qq, qqq) => {
		//var ok = JSON.parse(data);
		//console.log("ok "+ok+" + "+ok[0]+" + "+ok[1]);
		console.log("Clothes "+q+" + "+qq+" + "+qqq);
		player.setClothes(11, q, qq, qqq);
	},
	"buyShop": (player, item) => {
		if (player.customFunc.testFloodEvent("buyShop")) return;
		const shopItem = shopItems[item];
		if (!shopItem) return player.call("alert", "error", "В магазине отсудствует выбраный товар");

		if (player.customFunc.setMoney(-shopItem.price))
			return player.call("alert", "error", "У нас недостаточно наличных");

		if (shopItem.type === "special" && item === "phone") {
			let num = Math.floor(Math.random() * 899999 + 100000);
			player.customData.phone.number = num;
			player.call("messageShop", "Новый номер: " + String(num));
			return;
		}

		player.customData[shopItem.stat] -= shopItem.effect;
		if (player.customData[shopItem.stat] < 0) player.customData[shopItem.stat] = 0;
		const label = shopItem.stat === "satiety" ? "Голод" : "Жажда";
		player.call("messageShop", label + ": " + player.customData[shopItem.stat] + "/100");
	},
	"select" : (player, item, text) => 
	{
		if(player.customFunc.testFloodEvent("select")) return;
		if(player.customData.menu.id === 0) return player.call("alert", "error", "У вас нет открытых меню");
		if(isNaN(parseInt(item))) return player.call("alert", "error", "Ошибка передачи данных.");
		if(parseInt(item) > player.customData.menu.count || parseInt(item) < 0) return player.call("alert", "error", "Ошибка передачи данных");
		let str;
		let data = player.customData.menu.data;
		let menu = player.customData.menu.id;
		item = parseInt(item);
		text = API.striptags(text, "<b><s><u><strong>");
		player.customData.menu.id = 0;
		player.customData.menu.count = 0;
		player.customData.menu.data = null;
		switch (menu) 
		{
			case 1: break;
			case 2:		if(game.route[item] !== undefined) {
							let vehId = player.vehicle.customData.id;
							let spawn = game.vehicles[vehId][1];
							player.customData.job.busId = vehId;
							player.customData.job.busRoute = item;
							player.call("busRoute", item, game.route[item].name, game.route[item].color, spawn);
							player.call("alert", "success" , "Вы выбрали " + game.route[item].name);
						} else if(item === game.route.length) {
							if(player.customFunc.setMoney(-500)) {
								player.call("alert", "error" , "У нас недостаточно наличных");
								return player.removeFromVehicle();
							}
							player.call("alert", "success" , "Вы успешно арендовали автобус!");
						} else {
							player.removeFromVehicle();
						}
						break;
			case 3:		if(item !== 1) return;
						player.customData.member = data;
						player.customData.rank = 1;
						delete player.customData.item.repr;
						player.customData.job.id = 0;
						player.customFunc.generate();
						break;
			case 16:
						if(item !== 1) return;
						game.faction[CONST.FACTION_CITYHALL].balance += data.freePrice;
						player.customData.jail = 0;
						const str = "<b><font color='#FF6347'><< Адвокат " + mp.players.at(data.freeId).name + " вытащил(а) " + player.name +" >></font></b>";
						mp.players.forEach(_player => { if(_player.customData.member === CONST.FACTION_CITYHALL || API.isPoliceFaction(_player.customData.member)) _player.outputChatBox(str); });	
						player.customFunc.generate();
						player.call("alert", "success" , "Вы вышли под залог!");
						break;
			case 17:	if(item !== 1) return;	
						if(player.customFunc.setMoney(-data.healPrice)) return player.call("alert", "error" , "У нас недостаточно наличных");
						game.faction[CONST.FACTION_CITYHALL].balance += data.healPrice; 
						mp.players.broadcastInRange(player.position, 20, "<font color='#c2a2da'><b>"+mp.players.at(data.healId).name +" вылечил(а) " + player.name +"</b></font>");
						player.health = 100;
						break;
			case 18:	switch (item) 
						{
							case 0:	player.customFunc.setDialog(19, "Установить цену на SMS", "Стоймость", "Установить", "Назад", -1, "");
									break;
							case 1:	player.customFunc.setDialog(20, "Установить цену на объявление", "Стоймость", "Установить", "Назад", -1, "");
									break;
							case 2:	let arrNews = [];
									let dataNews = [];
									mp.players.forEach(_player => 
									{ 
										if(_player.customData.ad !== null) 
										{
												arrNews.push(_player.customData.ad);
												dataNews.push(_player.id);
										}
									});
									arrNews.push("Закрыть");
									player.customFunc.setMenu(21, "Объявление", arrNews, dataNews);
									break;
							default: break;
						}
						break;
			case 19:
						if(item !== 1) return player.customFunc.setMenu(18, "Редактор LS News", ["Установить цену на SMS", "Установить цену на объявление", "Работа с объявлениями" , "Закрыть"], "");
						if(isNaN(parseInt(text))) return player.call("alert", "error" , "Некорректная цена");
						if(parseInt(text) < 1 || parseInt(text) > 1000)  return player.call("alert", "error" , "От $1 до $1000");
						game.faction[player.customData.member].smsPrice = parseInt(text);
						player.call("alert", "success" , "Стоймость SMS обновлена!");
						break;
			case 20:
						if(item !== 1) return player.customFunc.setMenu(18, "Редактор LS News", ["Установить цену на SMS", "Установить цену на объявление", "Работа с объявлениями" , "Закрыть"], "");
						if(isNaN(parseInt(text))) return player.call("alert", "error" , "Некорректная цена");
						if(parseInt(text) < 1 || parseInt(text) > 1000)  return player.call("alert", "error" , "От $1 до $1000");
						game.faction[player.customData.member].adPrice = parseInt(text);
						player.call("alert", "success" , "Стоймость объявление обновлена!");		
						break;
			case 21:
						if(data.length+1 === item) return;
						if(mp.players.at(data[item-1]).customData.ad === null) return player.call("alert", "error" , "Объявление уже отправлено в эфир!");
						player.customFunc.setDialog(22, "Обзор объявления", "Объявление", "Отправить", "Отклонить", -1, "Отправитель " + mp.players.at(data[item-1]).name + "<br>" + mp.players.at(data[item-1]).ad, {id: mp.players.at(data[item-1]).id, ad: mp.players.at(data[item-1]).ad});
						mp.players.at(data[item-1]).customData.ad = null;
						break;
			case 22:
						if(item === 1)
						{
							let str1 = "<font color='green'>[Обяъявление]: </font>";
							if(text === "")
							{
								str1 += data.ad + "<br><font color='green'>- Проверил</font> " + player.name + " <font color='green'>Отправил</font> " + mp.players.at(data.id).name + " <font color='green'>Тел.:</font> " + mp.players.at(data.id).customData.phone.number;
							}
							else
							{
								str1 += text + "<br><font color='green'>- Отредактировал</font> " + player.name + " <font color='green'>Отправил </font>" + mp.players.at(data.id).name + " <font color='green'>Тел.: </font>" + mp.players.at(data.id).customData.phone.number;
							
							}
							mp.players.forEach(_player => { _player.outputChatBox(str1); });
							game.faction[CONST.FACTION_LSNEWS].balance += game.faction[CONST.FACTION_LSNEWS].adPrice;
						}
						else
						{
							mp.players.at(data.id).customFunc.setMoney(game.faction[CONST.FACTION_LSNEWS].adPrice);
							mp.players.at(data.id).call("alert", "error" , "Объявление было отклонено!");
						}
						break;
			case 23:
						if(item !== 1) return;
						if(player.customData.ad !== null) return player.call("alert", "error" , "Вы уже отпраляли недавно объявление");
						if(text === "") return player.call("alert", "error" , "Вы не можете отправить пустое объявление");
						if(player.customFunc.setMoney(-game.faction[CONST.FACTION_LSNEWS].adPrice)) return player.call("alert", "error" , "У нас недостаточно наличных");
						player.customData.ad = text;
						mp.players.forEach(_player => { if(_player.customData.member === CONST.FACTION_LSNEWS) _player.outputChatBox("Объявление: " + player.customData.ad + "От: " + player.name); });
						player.call("alert", "success" , "Объявление отправлено на радио!");
						break;
			case 24:	break;
			case 25: 	if(item !== 1) return mp.players.at(data.repairId).call("alert", "error" , "Игрок отклонил ваше предложение на ремонт ТС");
						if(player.customFunc.setMoney(-data.repairPrice)) return player.call("alert", "error" , "У нас недостаточно наличных");
						mp.players.at(data.repairId).customData.job.salary += data.repairPrice;
						mp.players.broadcastInRange(player.position, 20, "<font color='#c2a2da'><b>" + mp.players.at(data.repairId).name + " починил(а) машину " + player.name + "</b></font>");
						player.vehicle.repair();
						break;
			case 26: 	if(item !== 1) return mp.players.at(data.refillId).call("alert", "error" , "Игрок отклонил ваше предложение на заправку ТС");
						if(player.customFunc.setMoney(-data.refillPrice)) return player.call("alert", "error" , "У нас недостаточно наличных");
						mp.players.at(data.refillId).customData.job.salary += data.refillPrice;
						mp.players.broadcastInRange(player.position, 20, "<font color='#c2a2da'><b>" + mp.players.at(data.repairId).name + " заправил(а) машину " + player.name + "</b></font>");
						player.vehicle.fill = 70;
						break;
			case 27:	if(item === 1) return player.removeFromVehicle();
						player.customData.job.id = data;
						player.call("alert", "success" , "Вы устроились на работу " + game.jobs[data].name);
						if(player.customData.job.id === 2) player.customFunc.setDialog(30, "Тариф", "Цена за км", "Отклонить", "Принять", 1, "От $1 до $10", "");
						if(player.customData.job.id === 3) {
					
							let routeList = API.routeList();
							routeList.push("Аренда автобуса | $500");
							routeList.push("Закрыть");
							//console.log(routeList);
							player.customFunc.setMenu(2, "Маршруты автобуса", routeList, "");
						}
						break;	
			case 30:	if(item !== 1) return player.removeFromVehicle();
						if(isNaN(parseInt(text))) return player.call("alert", "error" , "Некорректная стоймость");
						if(parseInt(text) < 1 || parseInt(text) > 10) return player.call("alert", "error" , "Стоймость от $1 до $10");
						if(typeof player.vehicle === "undefined") return player.call("alert", "error" , "Вы не в машине");
						if(!player.vehicle.customData.job || player.vehicle.customData.job !== player.customData.job.id) return player.call("alert", "error" , "Вы не в спец.технике.");
						player.customData.job.taxi = parseInt(text);
						player.call("alert", "success" , "Вы успешно установили тариф.");
						break;
			case 60: 	if(item !== 0) return player.call("alert", "information", "Вы отказались от покупки дома");
						pool.query("SELECT * FROM houses WHERE id = ?", [configure.housesnumber[data]], function(err1, sel_buy_house) {
							if (err1) return console.log(err1);
							if(sel_buy_house[0]) {
								//console.log("-1");
								if(player.customData.item.money >= sel_buy_house[0].coast) {
									console.log("0");
									pool.query("UPDATE `houses` SET owner = ?, state = ? WHERE id = ?", [player.name, 1, configure.housesnumber[data]], function(err, results) {
										if (err1) return console.log(err);
										//console.log("1");
										configure.housesblips[data].color = 1;
										configure.housestate[data] = 1;
										//console.log("2");
										configure.housesowner[data] = player.name;
										//console.log("3");
										player.customFunc.setMoney(-sel_buy_house[0].coast);
										//console.log("4");
										//console.log("Дом #"+sel_buy_house[0]+" на сервере #"+data)
										player.call("alert", "success", "Поздравляем с покупкой дома!");
									});
								} else {
									player.call("alert", "error", "У вас недостаточно средств для покупки недвижимости!");
								}
							} else {
								player.call("alert", "error", "Дом не найден! Обратитесь к разработчикам.");
							}
						});
						break;
			case 61:
					if (item !== 0) return;
					if (configure.housesgarage[data] >= 1) {
						player.customFunc.setDialog(62, "Вход в дом", "", "Дом", "Гараж", 1, "Куда вы желаете зайти?", data);
					} else {
						houseUtils.enterHouse(player, data);
					}
					break;
			case 62:
					if (item == 0) {
						houseUtils.enterHouse(player, data);
					} else {
						houseUtils.enterGarage(player, data);
					}
					break;
					
			default: player.call("alert", "error" , "Меню не найдено!");
		}
	},			
};