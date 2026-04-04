"use strict";

module.exports = function initPlayerData(entity) {
	entity.customData.auth = false;
	entity.customData.afk = undefined;
	entity.customData.gov = 0;
	entity.customData.ad = null;
	entity.customData.sleep = 0;
	entity.customData.color = [255, 255, 255, 255];

	entity.customData.timer = {
		control: 0,
		indicator: 0,
		warehouse: 0
	};

	entity.customData.item = {};

	entity.customData.menu = {
		id: 0,
		data: null,
		count: 0
	};

	entity.customData.police = {
		fine: [],
		info: -1
	};

	entity.customData.job = {
		id: 0,
		started: 0,
		salary: 0,
		busId: -1,
		busRoute: -1,
		taxi: 0,
		action: 0
	};

	entity.customData.member = 0;
	entity.customData.exp = 0;
	entity.customData.rank = 0;
	entity.customData.admin = 0;
	entity.customData.kills = 0;
	entity.customData.deaths = 0;
	entity.customData.bank = 0;
	entity.customData.offense = 0;
	entity.customData.mute = 0;
	entity.customData.ban = 0;
	entity.customData.jail = 0;
	entity.customData.prowhisper = 0;

	entity.customData.enter_house = -1;
	entity.customData.enter_limit = 0;
	entity.customData.enter_garage = -1;
	entity.customData.person_car = {};
	entity.customData.person_summon_cars = 0;

	entity.customData.narcomaniac = 0;

	entity.customData.flood = {
		text: null,
		event: null,
		repr: 0,
		timer: {
			text: 0,
			cmd: 0,
			event: 0
		}
	};

	entity.customData.phone = {
		number: 0,
		signal: true,
		presence: true,
		balance: 0
	};

	entity.customData.dehydration = 100;
	entity.customData.satiety = 100;

	entity.position = new mp.Vector3(402.8, -996.6, -99.0);
	entity.dimension = entity.id + 1;
	entity.heading = 45;
	entity.cuff = false;
};
