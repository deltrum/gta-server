"use strict";

module.exports = {
	"getMemberList": (member) => {
		let players = [];
		mp.players.forEach(_player => {
			if (_player.customData.member === member)
				players[_player.id] = [_player.name, _player.customData.rank];
		});
		return players;
	},
	"getWantedList": () => {
		let players = [];
		mp.players.forEach(_player => {
			if (_player.customData.offense !== 0)
				players[_player.id] = [_player.name, _player.customData.offense];
		});
		return players;
	},
	"getStatList": (member) => {
		let stats = [];
		if (game.faction[member].warehouse !== undefined) {
			stats.push(["Состояние склада", game.faction[member].warehouse]);
		}
		return stats;
	},
	"getPings": () => {
		if (global.game.control.timerPing === 0) {
			var ping = [];
			mp.players.forEach(player => {
				if (player.customData.auth) ping[player.id] = player.ping;
			});
			global.game.control.timerPing = 60;
			global.game.control.ping = ping;
			return ping;
		} else {
			return global.game.control.ping;
		}
	}
};
