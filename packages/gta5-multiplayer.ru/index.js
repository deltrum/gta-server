"use strict";

require("./systems/constants.js");
global.API = require("./plugins/api.js");

require("./plugins/events.js");
require("./plugins/systems.js");
require('./plugins/ad_manager.js');

const { pool } = require('./systems/mysql.js');

mp.world.weather = "EXTRA";
global.launchStage = {
	steps: 4,
	step: 0,
};

global.game = {
	nalog: 5,
	flood: {
		text: CONST.FLOOD_TEXT_TIMEOUT,
		event: CONST.FLOOD_EVENT_TIMEOUT,
		repr: CONST.FLOOD_REPR_LIMIT
	},
	control: {
		timerPing: 0,
		ping: [],
		colors: [],
	},
	admin: ["Игрок", "Мл.Администратор", "Администратор", "Ст.Администратор", "Гл.Администратор", "Ген.Администратор", "Тех.Администратор"],
	car: require('./configs/buyCar.json'),
	jobs: require('./configs/jobs.json'),
	route: require('./configs/route.json'),
	callPolice: ["Привет"],
	callTaxi: [],
	callMOH: [],
	faction: [
		{
			"member": "GTA5-MULTIPLAYER.RU",
			"blip": [307, 0],
			"rank": ["Не указано"],
			"salary": [0],
			"spawn": [-1037.503906, -2738.813, 13.8],
			"color": [255, 255, 255, 255]
		},
		require('./configs/faction/LSPD.json'),
		require('./configs/faction/Army.json'),
		require('./configs/faction/MOHLS.json'),
		require('./configs/faction/CityHall.json'),
		require('./configs/faction/PrisonLS.json'),
		require('./configs/faction/SWAT.json'),
		require('./configs/faction/LSNews.json'),
		require('./configs/faction/DrivingSchool.json'),
		require('./configs/faction/LaFuenteBlanca.json'),
		require('./configs/faction/RussianMafia.json')
	],
	interiors_list: require('./configs/interiors_list.json'),
	interiors: require('./configs/interiors.json'),
	vehicles: require('./configs/vehicles.json'),
	atm: require('./configs/atm.json'),
	wstore: require('./configs/weaponstore.json'),
	blips: require('./configs/blips.json'),
	jailPos: [
		[459.9773254394531, -994.2490234375, 24.91486930847168],
		[458.89013671875, -997.9274291992188, 24.91486930847168],
		[458.82220458984375, -1001.6534423828125, 24.914873123168945]
	]
};

mp.players.call_unfancy = mp.players.call;
mp.players.call = function () {
	if (typeof (arguments[0]) === 'object') this.call_unfancy(arguments[0], arguments[1], [...arguments].slice(2));
	else this.call_unfancy(arguments[0], [...arguments].slice(1));
};

require('./plugins/discord.js');

global.pool = pool;

// World initialization
const worldInit = require('./systems/world-init.js');
worldInit.initFromDatabase();
worldInit.initFactionMarkers();
worldInit.initATMs();
worldInit.initWeaponStores();
worldInit.initBlips();
worldInit.initVehicles();

// Game loop
const startGameLoop = require('./systems/game-loop.js');
startGameLoop();

global.launchStage.step++;
