"use strict";

module.exports = {
	initFromDatabase: function () {
		global.pool.getConnection(function (err, connection) {
			if (err) {
				console.log('Error getting connection');
				connection.release();
				throw err;
			}
			console.log('\nLoading database:');
			connection.query("SELECT * FROM materials", function (error, results) {
				if (error) {
					console.log('Error table "materials"');
					connection.release();
					throw error;
				}
				let i = 0;
				results.forEach(mat => { game.faction[mat.id].warehouse = parseInt(mat.warehouse); i++; });
				if (i === results.length) global.launchStage.step++;
				console.log('	"warehouse" - ' + results.length);
			});
			connection.query("SELECT * FROM banks", function (error, results) {
				if (error) {
					console.log('Error table "banks"');
					connection.release();
					throw error;
				}
				let i = 0;
				results.forEach(bank => { game.faction[bank.id].balance = parseInt(bank.balance); i++; });
				if (i === results.length) global.launchStage.step++;
				console.log('	"banks" - ' + results.length);
			});
			connection.query("SELECT * FROM store", function (error, results) {
				if (error) {
					console.log('Error table "store"');
					connection.release();
					throw error;
				}
				let i = 0;
				results.forEach(store => {
					let pos = JSON.parse(store.position);
					let marker = mp.markers.new(1, new mp.Vector3(pos.x, pos.y, pos.z - 1), 1, {
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
						color: [255, 255, 255, 255],
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
				if (i === results.length) global.launchStage.step++;
				console.log('	"store" - ' + results.length);
			});
			connection.release();
		});
	},

	initFactionMarkers: function () {
		console.log('\nLoading factions: ' + game.faction.length);
		game.faction.forEach((item, key) => {
			if (item.blip !== undefined) {
				let org = String(item.member);
				if (org === "Не состоит") org = "Аэропорт";
				let [x, y, z] = item.spawn;
				let [model, color] = item.blip;
				mp.blips.new(model, new mp.Vector3(x, y, z), {
					name: org,
					color: color,
					shortRange: true,
					dimension: 0,
				});
			}
			if (item.weaponsPoint !== undefined) {
				let [x, y, z] = item.weaponsPoint;
				let marker = mp.markers.new(1, new mp.Vector3(x, y, z - 1), 1, {
					color: [0, 150, 136, 150],
					visible: true,
					dimension: 0
				});
				marker.bobUpAndDown = true;
				let colshape = mp.colshapes.newCircle(x, y, 1);
				colshape.customData.weaponsPoint = key;
				mp.labels.new("Боеприпасы", new mp.Vector3(x, y, z), {
					los: false,
					font: 0,
					drawDistance: 10,
					color: [255, 255, 255, 255],
					dimension: 0
				});
			}
		});
	},

	initATMs: function () {
		console.log('\nLoading ATM: ' + game.atm.length);
		game.atm.forEach(item => {
			let [x, y, z] = item;
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
			mp.labels.new("Банкомат", new mp.Vector3(x, y, z), {
				los: false,
				font: 0,
				drawDistance: 10,
				color: [255, 255, 255, 255],
				dimension: 0
			});
		});
	},

	initWeaponStores: function () {
		console.log('\nLoading weaponstores: ' + game.wstore.length);
		game.wstore.forEach(item => {
			let [x, y, z] = item;
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
	},

	initBlips: function () {
		console.log('\nLoading Blips: ' + game.blips.length);
		game.blips.forEach(([model, [x, y, z], name, color]) => {
			mp.blips.new(model, new mp.Vector3(x, y, z), {
				name: name,
				color: color,
				shortRange: true,
				dimension: 0,
			});
		});
	},

	initVehicles: function () {
		console.log('\nLoading vehicles: ' + game.vehicles.length);
		game.vehicles.forEach((veh, key) => {
			let [model, [x, y, z], heading, [[r1, g1, b1], [r2, g2, b2]], arrVeh] = veh;
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
	}
};
