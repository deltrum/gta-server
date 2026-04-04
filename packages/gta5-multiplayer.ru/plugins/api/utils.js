"use strict";

module.exports = {
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

	"getList": (list) => {
		let relist = [];
		game.route.forEach((item) => {
			relist.push(item.name + " | " + (item.price !== undefined && item.price || ""));
		});
		return relist;
	},

	"number": (number) => {
		var id = -1;
		mp.players.forEach(_player => {
			if (_player.customData.phone.number === parseInt(number) && _player.customData.phone.number !== 0) {
				id = _player.id;
				return;
			}
		});
		return id;
	},

	"radius": (radi, pos, _pos) => {
		pos.x -= _pos.x;
		pos.y -= _pos.y;
		pos.z -= _pos.z;
		if (((pos.x < radi) && (pos.x > -radi)) && ((pos.y < radi) && (pos.y > -radi)) && ((pos.z < radi) && (pos.z > -radi))) return true;
		return false;
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
