var mysql = require('./mysql.js');

let configure = module.exports;

configure.othermarkers = new Array(999);
configure.othercolshapes = new Array(999);

configure.jobsmarkers = new Array(999);
configure.jobscolshapes = new Array(999);

configure.jobs_1_markers = new Array(10);
configure.jobs_1_colshapes = new Array(10);
configure.jobs_1_status = new Array(10);

for(let i = 0; i < configure.jobs_1_status.length; i++) {
  configure.jobs_1_status[i] = 0;
}

configure.fractionsmarkers = new Array(100);
configure.fractionscolshapes = new Array(100);

configure.gangsmarkers = new Array(100);
configure.gangscolshapes = new Array(100);

configure.housesblips = new Array(999);
configure.housesmarkers = new Array(999);
configure.housescolshapes = new Array(999);
configure.housesnumber = new Array(999);
configure.housestate = new Array(999);
configure.housesrare = new Array(999);
configure.housesowner = new Array(999);
configure.housescoast = new Array(999);
configure.housesinterior = new Array(999);
configure.housesgarage = new Array(999);
configure.housesgaragecolshapes = new Array(999);

configure.housesinterior_rare0_pos0 = new mp.Vector3(parseFloat(151.50820922851562),parseFloat(-1007.64892578125),parseFloat(-98.99994659423828));
configure.housesinterior_rare0_pos1 = new mp.Vector3(parseFloat(266.1980895996094),parseFloat(-1007.3866577148438),parseFloat(-101.00856018066406));
configure.housesinterior_rare2_pos0 = new mp.Vector3(parseFloat(-174.01052856445312),parseFloat(496.4705505371094),parseFloat(137.6669921875));
configure.housesinterior_rare2_pos1 = new mp.Vector3(parseFloat(340.9412),parseFloat(437.1798),parseFloat(149.3925));
configure.housesinterior_rare2_pos2 = new mp.Vector3(parseFloat(-680.984619140625),parseFloat(591.6907958984375),parseFloat(145.39305114746094));
configure.loaded_houses_count = 0;

configure.createvehicle = new Array(999);
configure.createvehicle_count = 0;

configure.online = 0;
configure.tab_counter = 0;
configure.weather = "Sunny";

mp.world.weather = configure.weather;

// Мэрия
configure.othermarkers[0] = mp.markers.new(0, new mp.Vector3(parseFloat(237.8629913330078), parseFloat(-413.01593017578125), parseFloat(48.111942291259766)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.othermarkers[0].setColor(255, 247, 0, 255);
configure.othercolshapes[0] = mp.colshapes.newRectangle(parseFloat(237.8629913330078), parseFloat(-413.01593017578125), 1, 1);
configure.othermarkers[1] = mp.markers.new(0, new mp.Vector3(parseFloat(232.8357696533203), parseFloat(-411.3126525878906), parseFloat(48.11194610595703)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.othermarkers[1].setColor(255, 247, 0, 255);
configure.othercolshapes[1] = mp.colshapes.newRectangle(parseFloat(232.8357696533203), parseFloat(-411.3126525878906), 1, 1);
configure.othermarkers[2] = mp.markers.new(0, new mp.Vector3(parseFloat(112.64517211914062), parseFloat(-639.3717041015625), parseFloat(206.04666137695312)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.othermarkers[2].setColor(255, 247, 0, 255);
configure.othercolshapes[2] = mp.colshapes.newRectangle(parseFloat(112.64517211914062), parseFloat(-639.3717041015625), 1, 1);
configure.othermarkers[3] = mp.markers.new(29, new mp.Vector3(parseFloat(113.93478393554688), parseFloat(-618.6810302734375), parseFloat(206.04664611816406)), 2, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.othermarkers[3].setColor(255, 247, 0, 255);
configure.othercolshapes[3] = mp.colshapes.newRectangle(parseFloat(113.93478393554688), parseFloat(-618.6810302734375), 1, 1);

// Сварка
configure.jobsmarkers[0] = mp.markers.new(1, new mp.Vector3(parseFloat(-132.2976837158203), parseFloat(-940.2294921875), parseFloat(28)), 2, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobsmarkers[0].setColor(255, 247, 0, 255);
configure.jobscolshapes[0] = mp.colshapes.newRectangle(parseFloat(-132.2976837158203), parseFloat(-940.2294921875), 1, 1);

configure.jobs_1_markers[0] = mp.markers.new(30, new mp.Vector3(parseFloat(-136.5608367919922), parseFloat(-946.8843994140625), parseFloat(29.291906356811523)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[0].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[0] = mp.colshapes.newRectangle(parseFloat(-136.5608367919922), parseFloat(-946.8843994140625), 1, 1);

configure.jobs_1_markers[1] = mp.markers.new(30, new mp.Vector3(parseFloat(-146.46995544433594), parseFloat(-943.2619018554688), parseFloat(29.291906356811523)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[1].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[1] = mp.colshapes.newRectangle(parseFloat(-146.46995544433594), parseFloat(-943.2619018554688), 1, 1);
configure.jobs_1_markers[2] = mp.markers.new(30, new mp.Vector3(parseFloat(-150.2559814453125), parseFloat(-945.1087646484375), parseFloat(21.276844024658203)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[2].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[2] = mp.colshapes.newRectangle(parseFloat(-150.2559814453125), parseFloat(-945.1087646484375), 1, 1);
configure.jobs_1_markers[3] = mp.markers.new(30, new mp.Vector3(parseFloat(-144.55648803710938), parseFloat(-946.2548217773438), parseFloat(21.276845932006836)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[3].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[3] = mp.colshapes.newRectangle(parseFloat(-144.55648803710938), parseFloat(-946.2548217773438), 1, 1);
configure.jobs_1_markers[4] = mp.markers.new(30, new mp.Vector3(parseFloat(-139.45233154296875), parseFloat(-948.7388305664062), parseFloat(21.2768497467041)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[4].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[4] = mp.colshapes.newRectangle(parseFloat(-139.45233154296875), parseFloat(-948.7388305664062), 1, 1);
configure.jobs_1_markers[5] = mp.markers.new(30, new mp.Vector3(parseFloat(-175.44996643066406), parseFloat(-1014.318115234375), parseFloat(21.27684211730957)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[5].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[5] = mp.colshapes.newRectangle(parseFloat(-175.44996643066406), parseFloat(-1014.318115234375), 1, 1);
configure.jobs_1_markers[6] = mp.markers.new(30, new mp.Vector3(parseFloat(-165.9763946533203), parseFloat(-1016.966552734375), parseFloat(21.27684211730957)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_colshapes[6] = mp.colshapes.newRectangle(parseFloat(-165.9763946533203), parseFloat(-1016.966552734375), 1, 1);
configure.jobs_1_markers[6].setColor(255, 247, 0, 255);
configure.jobs_1_markers[7] = mp.markers.new(30, new mp.Vector3(parseFloat(-94.85835266113281), parseFloat(-965.0274047851562), parseFloat(21.276844024658203)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_colshapes[7] = mp.colshapes.newRectangle(parseFloat(-94.85835266113281), parseFloat(-965.0274047851562), 1, 1);
configure.jobs_1_markers[7].setColor(255, 247, 0, 255);
configure.jobs_1_markers[8] = mp.markers.new(30, new mp.Vector3(parseFloat(-83.21043395996094), parseFloat(-969.4396362304688), parseFloat(21.276865005493164)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_colshapes[8] = mp.colshapes.newRectangle(parseFloat(-83.21043395996094), parseFloat(-969.4396362304688), 1, 1);
configure.jobs_1_markers[8].setColor(255, 247, 0, 255);
configure.jobs_1_markers[9] = mp.markers.new(30, new mp.Vector3(parseFloat(-114.25918579101562), parseFloat(-1024.926025390625), parseFloat(27.273557662963867)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[9].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[9] = mp.colshapes.newRectangle(parseFloat(-114.25918579101562), parseFloat(-1024.926025390625), 1, 1);

mysql.connection.query('SELECT * FROM houses', [], function (error, results, fields) {
	for(let i = 0; i < results.length; i++) {
		let status_busy = (parseInt(results[i].state) == 1) ? 1 : 2;
		configure.housesblips[i] = mp.blips.new(40, new mp.Vector3(parseFloat(results[i].pos_x), parseFloat(results[i].pos_y), parseFloat(results[i].pos_z)),
		{
				name: "Дом",
		    scale: 1,
		    color: status_busy,
		    drawDistance: 100,
		    shortRange: 100,
		    rotation: 0,
		    dimension: 0,
		});
		configure.housesmarkers[i] = mp.markers.new(0, new mp.Vector3(parseFloat(results[i].pos_x), parseFloat(results[i].pos_y), parseFloat(results[i].pos_z)), 1,
		{
		    direction: new mp.Vector3(0,0,0),
		    rotation: new mp.Vector3(0,0,0),
		    visible: true,
		    dimension: 0
		});
		configure.housesmarkers[i].setColor(255, 247, 0, 255);
		configure.housescolshapes[i] = mp.colshapes.newRectangle(results[i].pos_x, results[i].pos_y, 1, 1);
		configure.housesnumber[i] = results[i].id;
		configure.housestate[i] = results[i].state;
		configure.housesrare[i] = results[i].rare;
		configure.housesowner[i] = results[i].owner;
		configure.housescoast[i] = results[i].coast;
		configure.housesinterior[i] = results[i].interior;
		configure.housesgarage[i] = results[i].garage;
		if(configure.housesgarage[i] != 0) {
			configure.housesgaragecolshapes[i] = mp.colshapes.newRectangle(results[i].garage_pos_x, results[i].garage_pos_y, 1, 1);
		}
		configure.loaded_houses_count++;
	}
	console.log('Loaded houses:' + configure.loaded_houses_count.toString());
});