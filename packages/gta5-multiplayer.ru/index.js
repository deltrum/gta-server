"use strict";

global.API = require("./plugins/api.js");

require("./plugins/events.js");
require("./plugins/systems.js");
require('./plugins/ad_manager.js');

const mysql = require("mysql");

var hours = new Date().getHours();

mp.world.weather = "EXTRA";
global.launchStage = {
	steps: 4,
	step: 0,
}

global.game = 
{
	nalog: 5,
	flood: {
		text: 3,
		event: 1,
		repr: 10
	},
	control: {
		timerPing: 0,
		ping: [],
		colors: [],
	},
	admin: ["Игрок","Мл.Администратор","Администратор","Ст.Администратор","Гл.Администратор","Ген.Администратор","Тех.Администратор"],
	car: require('./configs/buyCar.json'),
	jobs: require('./configs/jobs.json'),
	route: require('./configs/route.json'),
	callPolice: ["Привет"],
	callTaxi: [],
	callMOH: [],
	faction: [
		{
			"member": "GTA5-MULTIPLAYER.RU",
			"blip": [307,0],
			"rank": ["Не указано"],
			"salary": [0],
			"spawn": [-1037.503906, -2738.813, 13.8],
			"color": [255,255,255,255]
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
mp.players.call = function () { if (typeof(arguments[0]) === 'object') this.call_unfancy(arguments[0], arguments[1], [...arguments].slice(2)); else this.call_unfancy(arguments[0], [...arguments].slice(1)); } 


require('./plugins/discord.js');
//require('./plugins/monitoring.js');


global.pool  = mysql.createPool({
	  connectionLimit : 10,
	  waitForConnections: false, // подключение к БД
	  host            : 'localhost',
	  user            : 'root',
	  password        : '',
	  database        : 'gta5-multiplayer.ru'
});

global.pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

global.pool.on('connection', function (connection) {
  console.log('New connection %d', connection.threadId);
});

global.pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

global.pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});


global.pool.getConnection(function(err, connection) {
	if(err) {
		console.log('Error getting connection');
		connection.release();
		throw err;
	}
	console.log('\nLoading database:');
	connection.query("SELECT * FROM materials", function (error, results, fields) {  
		if(error) {
			console.log('Error table "materials"');
			connection.release();
			throw error;
		}
		let i = 0;
		results.forEach(mat => { game.faction[mat.id].warehouse = parseInt(mat.warehouse);	i++; });
		if(i === results.length) global.launchStage.step++;
		console.log('	"warehouse" - ' + results.length);	
		
	});
	connection.query("SELECT * FROM banks", function (error, results, fields) {
		if(error) {
			console.log('Error table "banks"');
			connection.release();
			throw error;
		}
		let i = 0;
		results.forEach(bank => { game.faction[bank.id].balance = parseInt(bank.balance); i++; });
		if(i === results.length) global.launchStage.step++;
		console.log('	"banks" - ' + results.length);	
	}); 	
	connection.query("SELECT * FROM store", function (error, results, fields) {
		if(error) {
			console.log('Error table "store"');
			connection.release();
			throw error;
		}
		let i = 0;
		results.forEach(store => {
			let pos = JSON.parse(store.position);
			let marker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z-1), 1, {
				color: [0, 150, 136, 150],
				visible: true,
				dimension: 0
			});
			marker.bobUpAndDown = true;
			let colshape = mp.colshapes.newCircle(pos.x, pos.y, 1);
			colshape.customData.store = store.materials;
			mp.labels.new("Магазин", new mp.Vector3(pos.x, pos.y, pos.z), {
				los: false,
				font: 0,
				drawDistance: 10,
				color: [255,255,255,255],
				dimension: 0
			});
			mp.blips.new(93, new mp.Vector3(pos.x, pos.y, pos.z), {
				name: "Магазин",
				shortRange: true,
				color: 3,
				dimension: 0,
			});
			i++;
		});
		if(i === results.length) global.launchStage.step++;
		console.log('	"store" - ' + results.length);
	}); 
	connection.release();
});

console.log('\nLoading factions: ' + game.faction.length);
game.faction.forEach((item, key) => {
	if(item.blip !== undefined) 
	{ 
		let org = String(item.member)
		if(org === "Не состоит") org = "Аэропорт";
		let [x,y,z] = item.spawn;
		let [model, color] = item.blip;
		mp.blips.new(model, new mp.Vector3(x, y, z), {
			name: org,
			color: color,
			shortRange: true,
			dimension: 0,
		});
	}
	if(item.weaponsPoint !== undefined) {
		let [x,y,z] = item.weaponsPoint;
		let marker = mp.markers.new(1, new mp.Vector3(x, y, z-1), 1, {
			color: [0, 150, 136, 150],
			visible: true,
			dimension: 0
		});
		marker.bobUpAndDown = true;
		let colshape = mp.colshapes.newCircle(x, y, 1);
		colshape.customData.weaponsPoint = key;
		mp.labels.new("Боеприпасы",  new mp.Vector3(x, y, z), {
			los: false,
			font: 0,
			drawDistance: 10,
			color: [255,255,255,255],
			dimension: 0
		});		
	}
});

console.log('\nLoading ATM: ' + game.atm.length);
game.atm.forEach(item => {
	let [x,y,z] = item;
	let colshape = mp.colshapes.newCircle(x, y, 1);
	colshape.customData.atm = 100000;
	mp.blips.new(108, new mp.Vector3(x, y, z), {
		name: "Банкомат",
		color: 2,
		shortRange: true,
		dimension: 0,
	});
	let marker = mp.markers.new(29, new mp.Vector3(x, y, z), 1, {
		color: [0, 150, 136, 150],
		visible: true,
		dimension: 0
	});
	marker.bobUpAndDown = true;
	mp.labels.new("Банкомат",  new mp.Vector3(x, y, z), {
		los: false,
		font: 0,
		drawDistance: 10,
		color: [255,255,255,255],
		dimension: 0
	});
});

console.log('\nLoading weaponstores: ' + game.wstore.length);
game.wstore.forEach(item => {
	let [x,y,z] = item;
	let colshape = mp.colshapes.newCircle(x, y, 1);
	colshape.customData.weaponstore = 100000;
	mp.blips.new(110, new mp.Vector3(x, y, z), {
		name: "Амуниция",
		color: 9,
		shortRange: true,
		dimension: 0,
	});
	let marker = mp.markers.new(31, new mp.Vector3(x, y, z), 1, {
		color: [204, 110, 4, 150],
		visible: true,
		dimension: 0
	});
	marker.bobUpAndDown = true;
});



console.log('\nLoading Blips: ' + game.blips.length);
game.blips.forEach(([model, [x,y,z], name, color]) => {
	mp.blips.new(model, new mp.Vector3(x, y, z), {
		name: name,
		color: color,
		shortRange: true,
		dimension: 0,
	});
});

console.log('\nLoading vehicles: ' + game.vehicles.length);
game.vehicles.forEach((veh, key) => {
	let [model, [x,y,z], heading, [[r1, g1, b1], [r2, g2, b2]], arrVeh] = veh;
	let pos = new mp.Vector3(x, y, z);
	let vehicle = mp.vehicles.new(model, pos, {
		heading: heading,
		numberPlate: "TALRASHA",
		dimension: 0
	});
	vehicle.setColorRGB(r1, g1, b1, r2, g2, b2); 
	vehicle.customData.lastPos = pos;
	vehicle.customData.id = key;
	arrVeh.forEach(attr => { vehicle.customData[attr[0]] = attr[1]; });
});

var timer15minutes = 600;
var timer1minutes = 60;

setInterval(function(){
	try {
		mp.world.time.hour = new Date().getHours();
		mp.world.time.minute = new Date().getMinutes();
		if(hours !== new Date().getHours())
		{
			hours = new Date().getHours();
			API.payday();
			API.save();
			console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] PayDay");
		}
		mp.players.forEach(player => {
			if(player.customData.afk !== undefined) player.customData.afk++;
			if(player.customData.jail === 1)
			{
				player.call("alert", "success" , "Ваc отпустили из тюрьмы.");
				player.customFunc.generate();
			}
			if(timer15minutes === 0)	{
				player.outputChatBox("<font color='#FFA500'>============ [ Объявления ] ============</font><br>Мы Вконтакте: <font color='green'>vk.com/gta5_ragemp</font><br>Сайт: <font color='green'>GTA5-MULTIPLAYER.RU</font><br>Чтобы посмотреть список игроков нажмите <font color='green'>[Z]</font>.<br>=======================================");
				if(player.customData.dehydration !== 100) player.customData.dehydration += Math.floor(Math.random() * (10 - 5 + 1)) + 5;
				if(player.customData.satiety !== 100) player.customData.satiety += Math.floor(Math.random() * (10 - 5 + 1)) + 5;
				if(player.customData.dehydration > 100) player.customData.dehydration = 100;
				if(player.customData.satiety > 100) player.customData.satiety = 100;
			}
			
			if(player.customData.mute > 0) player.customData.mute -= 1;
			if(player.customData.mute === 1) player.call("alert", "success" , "Молчанка закончился!");	
			if(player.customData.sleep === 1) player.customFunc.generate();
			if(player.customData.sleep > 0) player.customData.sleep -= 1;
			if(player.customData.jail > 0) player.customData.jail -= 1;
			
			if(player.customData.timer.control > 0) player.customData.timer.control -= 1;
			if(player.customData.timer.warehouse > 0) player.customData.timer.warehouse -= 1;
			
			if(player.customData.flood.timer.text > 0) player.customData.flood.timer.text -= 1;
			if(player.customData.flood.timer.event > 0) player.customData.flood.timer.event -= 1;
			if(player.customData.flood.timer.text === 0 && player.customData.flood.text !== null) player.customData.flood.text = null;
			if(player.customData.flood.timer.event === 0 && player.customData.flood.event !== null) player.customData.flood.event = null;
			if(timer1minutes === 0  && player.customData.flood.repr > 0) player.customData.flood.repr--;
		});
		if(timer15minutes === 0)	{
			let sumUpdate = 0;
			mp.vehicles.forEach(veh => {
				if(veh.customData.id !== undefined) {
					let [model, [x,y,z], heading, [[r1, g1, b1], [r2, g2, b2]], arrVeh] = game.vehicles[veh.customData.id];
					let spawnPos = new mp.Vector3(x, y, z);
					let pos = veh.position;
					let lastPos = veh.customData.lastPos;
					if(lastPos.x === pos.x && 
					   lastPos.y === pos.y && 
					   lastPos.z === pos.z && 
						spawnPos.x !== pos.x && 
						spawnPos.y !== pos.y && 
						spawnPos.z !== pos.z) {
							sumUpdate++;
							veh.customFunc.respawn(spawnPos, heading);
						}

					veh.customData.lastPos = pos;
				}
			});
			console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "]: UpdatePos vehicles: " + sumUpdate);
		}
		if(global.game.control.timerPing > 0) global.game.control.timerPing--;
		
		if(timer1minutes === 0) timer1minutes = 60;
		if(timer15minutes === 0) timer15minutes = 600;
		timer1minutes--;
		timer15minutes--;
	} catch (err) {
		console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] Error: Main timer");
		console.log(err)
	}
},1000);

global.launchStage.step++;