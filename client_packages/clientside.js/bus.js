var bus = {
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

var busRoute = [
	[
		[390.9624938964844, -614.00048828125, 28.79507827758789, true],
		[549.2691650390625, -397.9337158203125, 32.62730407714844, false],
		[989.0695190429688, 247.95944213867188, 80.41079711914062, false],
		[934.78515625, 117.25762939453125, 80.09333038330078, true], 
		[598.6836547851562, 57.667152404785156, 92.24595642089844, false],
		[426.9541015625, 127.21694946289062, 100.51795196533203, true],
		[179.19622802734375, 214.8667449951172, 105.9305648803711, false],
		[74.7405014038086, 256.1534118652344, 109.04862976074219, true],
		[-87.46266174316406, 262.1124572753906, 100.03285217285156, false],
		[-442.8885498046875, 254.18592834472656, 82.9277114868164, true],
		[-546.0137939453125, 178.51101684570312, 69.72227478027344, false],
		[-529.6248779296875, -115.23057556152344, 38.999935150146484, false],
		[-486.7449951171875, -199.32940673828125, 36.96805191040039, true],
		[-378.4095764160156, -318.57366943359375, 32.67479705810547, false],
		[-245.19058227539062, -623.0470581054688, 33.82710647583008, false],
		[-171.72930908203125, -816.9022827148438, 31.13909912109375, true], 
		[-121.840576171875, -927.50830078125, 29.235960006713867, false],
		[59.02706527709961, -1104.503662109375, 29.405792236328125, false],
		[178.3531494140625, -1422.0467529296875, 29.20207977294922, true], 
		[258.22491455078125, -1429.70751953125, 29.237213134765625, false],
		[311.9217834472656, -1374.6390380859375, 31.82950782775879, true], 
		[381.73974609375, -1281.5101318359375, 32.532283782958984, false],
		[505.838134765625, -1163.9599609375, 29.219545364379883, false],
		[402.701171875, -1080.083984375, 29.310535430908203, true], 
		[409.2236022949219, -892.0068969726562, 29.33045768737793, false],
		[410.1760559082031, -726.813720703125, 29.164766311645508, true], 
		[421.91021728515625, -657.222900390625, 28.61436653137207, false]
	],
	[
		[308.44268798828125, -765.4956665039062, 29.269506454467773, true],
		[343.6992492675781, -859.8373413085938, 29.337522506713867, false],
		[394.19940185546875, -1095.8983154296875, 29.31421661376953, true],
		[330.4224548339844, -1129.200927734375, 29.387853622436523, false],
		[212.80938720703125, -1214.340576171875, 29.347427368164062, false],
		[93.18421173095703, -1447.9215087890625, 29.210521697998047, true],
		[-11.272181510925293, -1581.6920166015625, 29.33780288696289, false],
		[-358.99884033203125, -1821.264892578125, 22.79547119140625, false],
		[-816.3104858398438, -2233.890869140625, 17.297531127929688, false],
		[-999.41015625, -2742.001708984375, 13.663204193115234, true],
		[-807.422119140625, -2471.8173828125, 13.757674217224121, false],
		[-261.4861755371094, -1833.39892578125, 28.264421463012695, false],
		[149.56304931640625, -1623.7830810546875, 29.187747955322266, true],
		[283.0787658691406, -1469.421875, 29.280261993408203, false],
		[313.656494140625, -1371.4276123046875, 31.829784393310547, true],
		[482.478759765625, -1261.0316162109375, 29.36458969116211, false],
		[465.1866149902344, -674.1219482421875, 27.22389030456543, false],
		[428.0071105957031, -644.8419799804688, 28.49720001220703, true]
	],
	[
		[308.8661193847656, -760.8994140625, 29.22908592224121, true],
		[233.54928588867188, -834.1583862304688, 30.155569076538086, false],
		[231.01126098632812, -670.9767456054688, 37.7567138671875, false],
		[243.17971801757812, -349.44482421875, 44.339866638183594, true],
		[163.63665771484375, -385.14501953125, 42.21599197387695, false],
		[39.34172058105469, -708.6276245117188, 44.09413146972656, true],
		[-74.76668548583984, -1029.5382080078125, 28.28338050842285, true],
		[-98.49089050292969, -1351.2867431640625, 29.37656021118164, false],
		[87.91354370117188, -1454.2034912109375, 29.210529327392578, true],
		[-68.32930755615234, -1800.6669921875, 27.576980590820312, true],
		[87.8991928100586, -1876.370849609375, 23.523290634155273, false],
		[253.93783569335938, -1640.732177734375, 29.122407913208008, true],
		[299.278564453125, -1530.3623046875, 29.2653865814209, false],
		[274.9009704589844, -1456.79296875, 29.13700294494629, true],
		[255.41624450683594, -981.8842163085938, 29.246145248413086, true],
		[429.3944091796875, -640.1954345703125, 28.497175216674805, true]
	],
	[
		[421.00177001953125, -642.5560302734375, 28.496347427368164, true],
		[413.1473693847656, -578.84521484375, 28.668052673339844, false],
		[1060.6177978515625, 338.00994873046875, 83.66364288330078, false],
		[2430.7587890625, 2858.27587890625, 48.96501541137695, false],
		[2175.859375, 2975.894775390625, 46.5188102722168, false],
		[1933.72412109375, 2623.53466796875, 46.13372039794922, true],
		[2158.715087890625, 2780.23876953125, 49.80113983154297, false],
		[2213.075439453125, 3003.171875, 45.32356643676758, false],
		[2203.54052734375, 2770.387939453125, 45.42135238647461, false],
		[375.9784240722656, -602.1663208007812, 28.7253360748291, true],
		[425.98577880859375, -644.8416137695312, 28.496959686279297, true]
	]

];

mp.events.add(
{
	"render": () => {
		if(global.clientsideLoaded && global.auth) {
			if(bus.parking === true && bus.wait === 0) {
				mp.game.graphics.drawText("Припаркуйте автобус для завершения", [0.5, 0.9], { 
					font: 0, 
					color: [255, 255, 255, 150], 
					scale: [0.6, 0.6], 
					outline: true
				});	
			}
			if(bus && bus.wait !== 0 && bus.route != undefined) {
				mp.game.graphics.drawText("Вернитесь в автобус: " + String(bus.wait) + " сек.", [0.5, 0.9], { 
					font: 0, 
					color: [255, 255, 255, 150], 
					scale: [0.6, 0.6], 
					outline: true
				});	
			}			
			if(bus.timerSec !== -1 && bus.wait === 0) {
				if(bus.timerStatus === true) {
					mp.game.graphics.drawText("Остановка: " + String(bus.timerSec) + " сек.", [0.5, 0.9], { 
						font: 0, 
						color: [255, 255, 255, 150], 
						scale: [0.6, 0.6], 
						outline: true
					});
				} else {
					mp.game.graphics.drawText("Вернитесь на остановку", [0.5, 0.9], { 
						font: 0, 
						color: [255, 255, 255, 150], 
						scale: [0.6, 0.6], 
						outline: true
					});	
				}
			}
		}
	},
	"busCancel": () => {
		busCancel();
		bus.route = undefined;
	},
	"busRoute": (id, name, color, spawn) =>
	{
		if(busRoute[id] != undefined) {
			bus.veh = mp.players.local.vehicle.id;
			bus.route = id;
			bus.color = color;
			bus.name = name;
			bus.spawn = spawn;
			bus.timer = setInterval(function(){
				let veh = mp.players.local.vehicle !== null ? mp.players.local.vehicle.id : null;
				if(bus.timerPark !== -1) bus.timerPark--;
				if(bus.timerPark === 0) {
					mp.events.callRemote("busFinish");
					busCancel();
					bus.wait = 0;
				}				
				if(bus.veh !== veh && bus.wait === 0) {
					if(bus.timerSec !== -1) bus.timerSec = 15;
					bus.wait = 60;
				}
				if(bus.veh === veh && bus.wait !== 0) {
					bus.wait = 0;
				}
				if(bus.wait > 0) {
					if(bus.wait <= 5  && bus.wait !== 0) mp.game.audio.playSoundFrontend(-1,  "TIMER", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
					bus.wait--;
				}
				if(bus.veh !== veh && bus.wait === 0) {
					mp.events.callRemote("busСancel");
					busCancel();
				}
				if(bus.timerSec !== -1 && bus.wait === 0) {
					if(bus.timerStatus === true) {
						if(bus.timerSec === 0) {
							bus.point++;
							bus.timerSec = -1;
							mp.game.audio.playSoundFrontend(-1,  "MP_RANK_UP", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
							createPointBus(bus.route, bus.point);
						} else {
							bus.timerSec--;
						}
					}		
				}
				

			},1000);
			createPointBus(bus.route, bus.point);
		}
	},
	"playerEnterCheckpoint": (checkpoint) =>
	{
		if(checkpoint.bus === true  && bus.wait === 0) {
			if(bus.timer !== null && bus.timerStatus === false) {
				bus.timerSec = 15;
				bus.timerStatus = true;
			} else {
				if(busRoute[bus.route][bus.point][3] === true) {
					bus.timerSec = 15;
				} else {
					bus.point++;
					mp.game.audio.playSoundFrontend(-1,  "MP_RANK_UP", "HUD_FRONTEND_DEFAULT_SOUNDSET", false);
					createPointBus(bus.route, bus.point);
				}
			}
		} else if(checkpoint.park === true && bus.wait === 0 && bus.timerPark === -1) {
			bus.timerPark = 3;
		}
	},
	"playerExitCheckpoint": (checkpoint) =>
	{
		if(checkpoint.bus === true  && bus.wait === 0) {
			bus.timerStatus = false;
		}
	}
});


function createPointBus(route, point) {
	if(busRoute[route][point] !== undefined  && bus.wait === 0) {
		if(bus.blip !== null) {
			bus.blip.destroy();
			bus.blip = null;
		}
		if(bus.checkpoint !== null) {
			bus.checkpoint.destroy();
			bus.checkpoint = null;
		}
		let [x,y,z, pause] = busRoute[route][point];
		let [_x, _y, _z, _pause] = busRoute[route][point];
		let modelCheckpoint = 4;
		let modelBlip = 38;
		if(busRoute[route][point+1] !== undefined) {
			[_x, _y, _z, _pause] = busRoute[route][point+1];
			modelCheckpoint = 0;
			modelBlip = 1;
		} 
		if(pause === true) {
			modelCheckpoint = 4;
			modelBlip = 162;
		}
		bus.checkpoint = mp.checkpoints.new(modelCheckpoint, new mp.Vector3(x, y, z-1), 10, {
			direction: new mp.Vector3(_x, _y, _z),
			color: [0, 150, 136, 150],
			visible: true,
			dimension: 0
		});
		bus.checkpoint.bus = true;
		bus.blip = mp.blips.new(modelBlip, new mp.Vector3(x, y, z), {
			name: bus.name,
			color: bus.color,
			shortRange: false,
			dimension: 0
		});	
		bus.blip.setRoute(true);
			
	} else if(bus.wait === 0){
		if(bus.blip !== null) {
			bus.blip.destroy();
			bus.blip = null;
		}
		if(bus.checkpoint !== null) {
			bus.checkpoint.destroy();
			bus.blip = null;
		}
		let [x,y,z] = bus.spawn;
		bus.checkpoint = mp.checkpoints.new(4, new mp.Vector3(x, y, z-1), 10, {
			direction: new mp.Vector3(x, y, z),
			color: [0, 150, 136, 150],
			visible: true,
			dimension: 0
		});
		bus.checkpoint.park = true;
		bus.parking = true;

		
	}
}

function busCancel() {
	if(bus.blip !== null) {
		bus.blip.destroy();
		bus.blip = null;
	}
	if(bus.checkpoint !== null) {
		bus.checkpoint.destroy();
		bus.checkpoint = null;
	}
	clearInterval(bus.timer);
	bus = {
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