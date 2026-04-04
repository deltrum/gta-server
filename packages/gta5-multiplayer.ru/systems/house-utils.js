"use strict";

const configure = require('./config.js');

module.exports = {
	getInteriorPosition: function (data) {
		const rare = configure.housesrare[data];
		const interior = configure.housesinterior[data];

		if (rare == 0) {
			if (interior == 0) return configure.housesinterior_rare0_pos0;
			if (interior >= 1) return configure.housesinterior_rare0_pos1;
		} else if (rare >= 1) {
			if (interior == 0) return configure.housesinterior_rare2_pos0;
			if (interior == 1) return configure.housesinterior_rare2_pos1;
			if (interior >= 2) return configure.housesinterior_rare2_pos2;
		}
		return null;
	},

	enterHouse: function (player, data) {
		player.customData.enter_house = configure.housesnumber[data];
		player.customData.enter_garage = -1;
		player.dimension = 10000 + configure.housesnumber[data];
		player.position = module.exports.getInteriorPosition(data);
		player.call("alert", "success", "Вы вошли в дом! Для выхода из дома используйте команду (( /exit ))");
		player.call("alert", "success", "Похоже это дом под номером #" + configure.housesnumber[data]);
		player.customData.enter_limit = 1;
	},

	enterGarage: function (player, data) {
		player.customData.enter_house = -1;
		player.customData.enter_garage = configure.housesnumber[data];
		player.dimension = 10000 + configure.housesnumber[data];
		const garagePositions = {
			1: new mp.Vector3(173.2903, -1003.6, -99.65707),
			2: new mp.Vector3(197.8153, -1002.293, -99.65749),
			3: new mp.Vector3(240.1851806640625, -1004.7271728515625, -98.99993896484375)
		};
		player.position = garagePositions[configure.housesgarage[data]];
		player.call("alert", "success", "Вы вошли в гараж! Для выхода из гаража используйте команду (( /exit ))");
		player.customData.enter_limit = 1;
	}
};
