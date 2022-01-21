var lic = {
	route: undefined,
	name: "Маршрут",
	color: 0,
	point: 0,
	veh: null,
	wait: 0,
	blip: null,
	checkpoint: null,
	timer: null,
	timerSec: -1,
	timerPark: -1,
	spawn: null,
	timerStatus: true,
	parking: false
};

var licRoute = [
	[
		[-306.53,   274.25, 87,80, false],
		[-433.92,   249.59, 83.09, false],
		[-637.83,   278.43, 81.31, false],
		[-769.22,   291.95, 85.67, false], 
		[-788.79,   229.38, 75.66, false],
		[-837.02,   218.36, 74.05, false],
		[-863.45,   94.62,  52.08, false],
		[-781.91,  -96.10,  37.79, false],
		[-705.81,  -80.63,  37.89, false],
		[-591.43,  -64.62,  41.79, false],
		[-522.46,  -115.06, 38.89, false],
		[-394.13,  -30.85,  46.91, false],
		[-280.43,  -37.74,  49.48, false],
		[-223.75,  127.02,  69.68, false],
		[-223.92,  238.50,  91.49, false],
		[-306.53,   274.25, 87,80, false]
	]

];

mp.events.add(
{
	"render": () => {
		if(global.clientsideLoaded && global.auth) {
			if(lic.parking === true && lic.wait === 0) {
				mp.game.graphics.drawText("Припаркуйте автомобиль для завершения", [0.5, 0.9], { 
					font: 0, 
					color: [255, 255, 255, 150], 
					scale: [0.6, 0.6], 
					outline: true
				});	
			}
			if(lic && lic.wait !== 0 && lic.route != undefined) {
				mp.game.graphics.drawText("Вернитесь в автомобиль: " + String(lic.wait) + " сек.", [0.5, 0.9], { 
					font: 0, 
					color: [255, 255, 255, 150], 
					scale: [0.6, 0.6], 
					outline: true
				});	
			}			
		}
	},
	"licCancel": () => {
		licCancel();
		lic.route = undefined;
	},
	"licRoute": (id, name, color, spawn) =>
	{
		id = 0;
		if(licRoute[id] != undefined) {
			lic.veh = mp.players.local.vehicle.id;
			lic.route = id;
			lic.color = color;
			lic.name = name;
			lic.spawn = spawn;
			lic.timer = setInterval(function(){
				let veh = mp.players.local.vehicle !== null ? mp.players.local.vehicle.id : null;
				if(lic.timerPark !== -1) lic.timerPark--;
				if(lic.timerPark === 0) {
					mp.events.callRemote("licFinish");
					licCancel();
					lic.wait = 0;
				}				
				if(lic.veh !== veh && lic.wait === 0) {
					if(lic.timerSec !== -1) lic.timerSec = 15;
					lic.wait = 60;
				}
				if(lic.veh === veh && lic.wait !== 0) {
					lic.wait = 0;
				}
				if(lic.wait > 0) {
					if(lic.wait <= 5  && lic.wait !== 0) mp.game.audio.playSoundFrontend(-1,  "TIMER", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
					lic.wait--;
				}
				if(lic.veh !== veh && lic.wait === 0) {
					mp.events.callRemote("licСancel");
					licCancel();
				}
				if(lic.timerSec !== -1 && lic.wait === 0) {
					if(lic.timerStatus === true) {
						if(lic.timerSec === 0) {
							lic.point++;
							lic.timerSec = -1;
							mp.game.audio.playSoundFrontend(-1,  "MP_RANK_UP", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
							createPointlic(lic.route, lic.point);
						} else {
							lic.timerSec--;
						}
					}		
				}
				

			},1000);
			createPointlic(lic.route, lic.point);
		}
	},
	"playerEnterCheckpoint": (checkpoint) =>
	{
		if(checkpoint.lic === true  && lic.wait === 0) {
			if(lic.timer !== null && lic.timerStatus === false) {
				lic.timerSec = 15;
				lic.timerStatus = true;
			} else {
				lic.point++;
				mp.game.audio.playSoundFrontend(-1,  "MP_RANK_UP", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
				createPointlic(lic.route, lic.point);
			}
		} else if(checkpoint.park === true && lic.wait === 0 && lic.timerPark === -1) {
			lic.timerPark = 3;
		}
	},
	"playerExitCheckpoint": (checkpoint) =>
	{
		if(checkpoint.lic === true  && lic.wait === 0) {
			lic.timerStatus = false;
		}
	}
});


function createPointlic(route, point) {
	if(licRoute[route][point] !== undefined  && lic.wait === 0) {
		if(lic.blip !== null) {
			lic.blip.destroy();
			lic.blip = null;
		}
		if(lic.checkpoint !== null) {
			lic.checkpoint.destroy();
			lic.checkpoint = null;
		}
		let [x,y,z, pause] = licRoute[route][point];
		let [_x, _y, _z, _pause] = licRoute[route][point];
		let modelCheckpoint = 4;
		let modelBlip = 38;
		if(licRoute[route][point+1] !== undefined) {
			[_x, _y, _z, _pause] = licRoute[route][point+1];
			modelCheckpoint = 0;
			modelBlip = 1;
		} 
		if(pause === true) {
			modelCheckpoint = 4;
			modelBlip = 162;
		}
		lic.checkpoint = mp.checkpoints.new(modelCheckpoint, new mp.Vector3(x, y, z-1), 10, {
			direction: new mp.Vector3(_x, _y, _z),
			color: [127, 198, 19, 150],
			visible: true,
			dimension: 0
		});
		lic.checkpoint.lic = true;
		lic.blip = mp.blips.new(modelBlip, new mp.Vector3(x, y, z), {
			name: lic.name,
			color: lic.color,
			shortRange: false,
			dimension: 0
		});	
		lic.blip.setRoute(true);
			
	} else if(lic.wait === 0){
		if(lic.blip !== null) {
			lic.blip.destroy();
			lic.blip = null;
		}
		if(lic.checkpoint !== null) {
			lic.checkpoint.destroy();
			lic.blip = null;
		}
		let [x,y,z] = lic.spawn;
		lic.checkpoint = mp.checkpoints.new(4, new mp.Vector3(x, y, z-1), 10, {
			direction: new mp.Vector3(x, y, z),
			color: [127, 198, 19, 150],
			visible: true,
			dimension: 0
		});
		lic.checkpoint.park = true;
		lic.parking = true;

		
	}
}

function licCancel() {
	if(lic.blip !== null) {
		lic.blip.destroy();
		lic.blip = null;
	}
	if(lic.checkpoint !== null) {
		lic.checkpoint.destroy();
		lic.checkpoint = null;
	}
	clearInterval(lic.timer);
	lic = {
		route: undefined,
		name: "Маршрут",
		color: 0,
		point: 0,
		veh: null,
		wait: 0,
		blip: null,
		checkpoint: null,
		timer: null,
		timerSec: -1,
		timerPark: -1,
		spawn: null,
		timerStatus: true,
		parking: false

	};
}