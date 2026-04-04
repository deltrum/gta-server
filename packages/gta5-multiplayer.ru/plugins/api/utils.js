"use strict";

module.exports = {
	"sanitizeInput": (str) => {
		return str.replace(/"/g, "'").replace(/^\s+/, '').replace(/\s+$/, '');
	},

	"timeFormat": (time) => {
		let hrs = ~~(time / 3600);
		let mins = ~~((time % 3600) / 60);
		let secs = time % 60;
		let ret = "";
		if (hrs > 0) {
			ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
		}
		ret += "" + mins + ":" + (secs < 10 ? "0" : "");
		ret += "" + secs;
		return ret;
	},

	"routeList": () => {
		let routeList = [];
		game.route.forEach((item) => {
			routeList.push(item.name + " | $" + item.price);
		});
		return routeList;
	},

	"number": (number) => {
		let id = -1;
		mp.players.forEach(_player => {
			if (_player.customData.phone.number === parseInt(number) && _player.customData.phone.number !== 0) {
				id = _player.id;
				return;
			}
		});
		return id;
	},

	"radius": (radi, pos, _pos) => {
		const dx = pos.x - _pos.x;
		const dy = pos.y - _pos.y;
		const dz = pos.z - _pos.z;
		return (dx < radi && dx > -radi) && (dy < radi && dy > -radi) && (dz < radi && dz > -radi);
	},

	"getRandomInt": (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	"isGovernmentFaction": (memberId) => {
		return CONST.GOV_FACTIONS.includes(memberId);
	},

	"isPoliceFaction": (memberId) => {
		return CONST.POLICE_FACTIONS.includes(memberId);
	}
};
