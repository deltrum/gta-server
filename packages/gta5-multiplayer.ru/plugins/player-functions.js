"use strict";

const { savePlayerToDb } = require('./api/save.js');

module.exports = function initPlayerFunctions(entity) {
	entity.customFunc.testAuth = function () {
		if (!entity.customData.auth) {
			entity.kick("Вы не вошли в систему!");
			entity.outputChatBox("Вы не вошли в систему!");
			return false;
		}
		return true;
	};

	entity.customFunc.setFloodRep = function () {
		entity.customData.flood.repr++;
		if (entity.customData.flood.repr >= global.game.flood.repr) {
			entity.outputChatBox("Вы были кикнуты с сервера. Причина: Флуд!");
			entity.kick('Флуд!');
		}
	};

	entity.customFunc.testFloodText = function (text) {
		if (entity.customData.flood.text === text) {
			entity.call("alert", "information", "Не флудите в чат");
			entity.customData.flood.timer.text = global.game.flood.text;
			entity.customFunc.setFloodRep();
			return true;
		}
		entity.customData.flood.text = text;
		entity.customData.flood.timer.text = global.game.flood.text;
		return false;
	};

	entity.customFunc.testFloodEvent = function (event) {
		if (entity.customData.flood.event === event) {
			entity.call("alert", "information", "Не флудите");
			entity.customData.flood.timer.event = global.game.flood.event;
			entity.customFunc.setFloodRep();
			return true;
		}
		entity.customData.flood.event = event;
		entity.customData.flood.timer.event = global.game.flood.event;
		return false;
	};

	entity.customFunc.Save = function () {
		savePlayerToDb(entity);
	};

	entity.customFunc.setMenu = function (number, title, arr, data) {
		entity.customData.menu.id = number;
		entity.customData.menu.data = data;
		entity.customData.menu.count = arr.length;
		entity.call("setMenu", title, JSON.stringify(arr));
	};

	entity.customFunc.setWantedLvl = function (wanted) {
		if (isNaN(parseInt(wanted))) return false;
		if (parseInt(wanted) === 0) entity.customData.offense = 0;
		else entity.customData.offense += parseInt(wanted);
		if (entity.customData.offense < 0) entity.customData.offense = 0;
		if (entity.customData.offense > 5) entity.customData.offense = 5;
		entity.call("wantedLevel", entity.customData.offense);
		return true;
	};

	entity.customFunc.setDialog = function (number, title, input, buttonLeft, buttonRigth, focus, text, data) {
		entity.customData.menu.id = number;
		entity.customData.menu.count = 2;
		entity.customData.menu.data = data;
		entity.call("setDialog", title, input, buttonLeft, buttonRigth, focus, text);
	};

	entity.customFunc.setColor = function (color) {
		let _color = entity.customData.color;
		if (color[0] !== _color[0] ||
			color[1] !== _color[1] ||
			color[2] !== _color[2] ||
			color[3] !== _color[3]) {
			entity.customData.color = color;
			game.control.colors[entity.id] = color;
			mp.players.call("updateColorNametags", entity.id, JSON.stringify(entity.customData.color));
		}
	};

	entity.customFunc.setMoney = function (money) {
		if (isNaN(parseInt(money))) return true;
		if (entity.customData.item.money !== undefined) {
			if (entity.customData.item.money + parseInt(money) < 0) return true;
			entity.customData.item.money += parseInt(money);
			entity.call("money", entity.customData.item.money);
			if (entity.customData.item.money === 0) delete entity.customData.item.money;
			return false;
		}
		if (entity.customData.item.money === undefined && parseInt(money) > 0) {
			entity.customData.item.money = parseInt(money);
			entity.call("money", entity.customData.item.money);
			return false;
		}
	};

	entity.customFunc.generate = function () {
		if (entity.customData.auth === false) {
			entity.outputChatBox("Ошибка авторизации!");
			return entity.kick("Ошибка авторизации!");
		}
		if (entity.customData.jail !== 1 && entity.customData.jail !== 0) {
			let [x, y, z] = global.game.jailPos[global.API.getRandomInt(0, 2)];
			entity.spawn(new mp.Vector3(x, y, z));
			entity.model = mp.joaat("U_M_Y_Prisoner_01");
			return;
		}
		let [x, y, z] = game.faction[entity.customData.member].spawn;
		entity.spawn(new mp.Vector3(x, y, z));
		let skin = [mp.joaat("MP_M_Freemode_01"), mp.joaat("MP_F_Freemode_01")];
		let [floor, head, face, more] = entity.customData.personage;
		entity.model = skin[floor];
		entity.setHeadBlend(head[0], head[1], 0, head[0], head[1], 0, head[2], head[3], 0);
		let i = 0;
		face.forEach(function (item) { entity.setFaceFeature(i, item); i++; });
		entity.setClothes(2, more[0], 0, 0);
		entity.setHairColor(more[1], more[2]);
		entity.eyeColour = more[3];
		entity.customFunc.setColor(game.faction[entity.customData.member].color);
		if (entity.customData.member === 0 ||
			game.faction[entity.customData.member].personage === undefined ||
			game.faction[entity.customData.member].personage[floor] === undefined ||
			game.faction[entity.customData.member].personage[floor][entity.customData.rank - 1] === undefined) {
			// No faction clothes to apply
		} else {
			let clothes = game.faction[entity.customData.member].personage[floor][entity.customData.rank - 1].clothes;
			if (clothes !== undefined) {
				clothes.forEach(data => {
					let [component_id, drawable_id, texture_id, palette_id] = data;
					entity.setClothes(component_id, drawable_id, texture_id, palette_id);
				});
			}
			let prop = game.faction[entity.customData.member].personage[floor][entity.customData.rank - 1].prop;
			if (prop !== undefined) {
				prop.forEach(data => {
					let [prop_id, drawable_id, texture_id] = data;
					entity.setProp(prop_id, drawable_id, texture_id);
				});
			}
			if (game.faction[entity.customData.member].defaultWeapons !== undefined) {
				game.faction[entity.customData.member].defaultWeapons.forEach(data => {
					let [weapon, patron] = data;
					entity.giveWeapon(mp.joaat(weapon), patron);
				});
			}
		}
		entity.dimension = 0;
		entity.alpha = 255;
	};
};
