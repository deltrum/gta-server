global.auth = false;
var floor = 0;
var heredity = [0, 21, 0.5, 0.5];
var features = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var appearance = [0, 0, 0, 0];
var tops = [0,0,0,0];

function camFocusOnPlayer() {
		if (camType == "player") return;
		camType = "player";

		var player = mp.players.local;
		var pos = new mp.Vector3(402.86, -998.65, -98.6);

		var rot = new mp.Vector3();
		rot.z = player.heading + 180;
		let mycam = mp.cameras.new('gameplay', pos, rot, 90.0);
		mycam.setActive(true);
		mp.game.cam.renderScriptCams(true, false, 3000, true, false);
	}

	function camFocusOnHead() {
		if (camType == "head") return;
		camType = "head";

		var player = mp.players.local;
		var pos = new mp.Vector3(402.86, -998.65, -98.6);
		pos.y += 1.3;
		pos.z += 0.2;
		var rot = new mp.Vector3();
		rot.z = player.heading + 180;
		let mycam = mp.cameras.new('gameplay', pos, rot, 90.0);
		mycam.setActive(true);
		mp.game.cam.renderScriptCams(true, false, 3000, true, false);
	}

	function camFocusOnBody() {
		if (camType == "body") return;
		camType = "body";

		var player = mp.players.local;
		var pos = new mp.Vector3(402.86, -998.65, -98.6);
		pos.y += 1.1;
		var rot = new mp.Vector3();
		rot.z = player.heading + 180;
		let mycam = mp.cameras.new('gameplay', pos, rot, 90.0);
		mycam.setActive(true);
		mp.game.cam.renderScriptCams(true, false, 3000, true, false);
	}

	function camFocusOnLegs() {
		if (camType == "legs") return;
		camType = "legs";

		var player = mp.players.local;
		var pos = new mp.Vector3(402.86, -998.65, -98.6);
		pos.y += 1.1;
		pos.z -= 0.9;
		var rot = new mp.Vector3();
		rot.z = player.heading + 180;
		let mycam = mp.cameras.new('gameplay', pos, rot, 90.0);
		mycam.setActive(true);
		mp.game.cam.renderScriptCams(true, false, 3000, true, false);
	}

	function camFocusOnFeets() {
		if (camType == "feets") return;
		camType = "feets";

		var player = mp.players.local;
		var pos = new mp.Vector3(402.86, -998.65, -98.6);
		pos.y += 1.2;
		pos.z -= 1.2;
		var rot = new mp.Vector3();
		rot.z = player.heading + 180;
		let mycam = mp.cameras.new('gameplay', pos, rot, 90.0);
		mycam.setActive(true);
		mp.game.cam.renderScriptCams(true, false, 3000, true, false);
	}
	function setDefaultCam() {
		mp.game.ui.setMinimapVisible(false);
		mp.game.ui.displayRadar(true);

		mp.players.local.freezePosition(false); // freezes the client at the current position
		mp.players.local.isFreeze = false;

		let mycam = mp.cameras.new('gameplay', new mp.Vector3(0, 0, 300), new mp.Vector3(), 90.0);
		mycam.setActive(false);
		mp.game.cam.renderScriptCams(false, false, 0, true, false);
	}
	const ui = mp.game.ui;
	function getTextWidth(text, font, scale) {
	    ui.setTextEntryForWidth("STRING");
	    ui.addTextComponentSubstringPlayerName(text);
	    ui.setTextFont(font);
	    ui.setTextScale(scale * 1.25, scale);
	    return ui.getTextScreenWidth(true);
	}

mp.events.add(
{
	"login": (admin, money, draw) =>
	{
		global.auth = true;
		mp.game.cam.renderScriptCams(false, false, 3000, true, false);
		mp.game.ui.displayRadar(true);
		mp.players.local.freezePosition(false);
		global.admin = admin;
		global.money.balance = money;
		global.money.update = money;
		global.money.w = getTextWidth(global.money.balance, 4, 0.6);
		let storage = mp.storage.data 
		if(storage.binder == undefined) {
			storage.binder = "%7B%2284%22%3A%5B%22%u0427%u0430%u0442%22%2Ctrue%2Cfalse%5D%2C%2266%22%3A%5B%22%u0411%u0438%u043D%u0434%u0435%u0440%22%2Ctrue%2Cfalse%5D%2C%2279%22%3A%5B%22%u0422%u0435%u043B%u0435%u0444%u043E%u043D%22%2Ctrue%2Cfalse%5D%2C%2290%22%3A%5B%22%u0413%u043B%u0430%u0432%u043D%u043E%u0435%20%u043C%u0435%u043D%u044E%22%2Ctrue%2Cfalse%5D%7D"
			mp.storage.data = storage
			mp.storage.flush();
		} 
		mp.gui.execute(`window.login('${storage.binder}');`);
		mp.gui.chat.show(true);
		mp.gui.chat.push("<b>Добро пожаловать на сервер GTA5-MULTIPLAYER.RU RP<br/><br/>Сайт: <font color='green'>GTA5-MULTIPLAYER.RU</font></b>"); // приветствие
	},
	"loginAuth": (name, password) =>
	{
		mp.events.callRemote("login", name, password);
		let storage = mp.storage.data 
		storage.name = name
		storage.password = password
		mp.storage.data = storage
		mp.storage.flush();
		mp.game.audio.playSoundFrontend(-1,  "FocusIn", "HintCamSounds", false);
	},
	"CheckThatName": (name, password) =>
	{
		mp.events.callRemote("checkname", name);
		mp.game.audio.playSoundFrontend(-1,  "FocusIn", "HintCamSounds", false);
	},
	"regAuth": (name, password, email) =>
	{
		let personage = JSON.stringify([floor, heredity, features, appearance]);
		let storage = mp.storage.data 
		storage.name = name
		storage.password = password
		mp.storage.data = storage
		mp.storage.flush();
		mp.events.callRemote("reg", name, password, email, personage);
	},
	"heredityAuth" : (firstID, SecondID, shapeMix, skinMix) =>
	{
		heredity = [parseFloat(firstID), parseFloat(SecondID), parseFloat(shapeMix) , parseFloat(skinMix)];
		mp.players.local.setHeadBlendData(heredity[0], heredity[1], 0, heredity[0], heredity[1], 0, heredity[2], heredity[3], 0, true);
		mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	},
	"featuresAuth" : (index, scale) =>
	{
		features[index] = parseFloat(scale);
		mp.players.local.setFaceFeature(parseFloat(index), parseFloat(scale));
		mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	},	
	"floorAuth" : (type) =>
	{
		floor = parseFloat(type);
		let skin = [mp.game.joaat("MP_M_Freemode_01"), mp.game.joaat("MP_F_Freemode_01")];
		mp.players.local.model = skin[type];
		mp.players.local.setHeadBlendData(heredity[0], heredity[1], 0, heredity[0], heredity[1], 0, heredity[2], heredity[3], 0, true);
		let i = 0;
		features.forEach(function(item) { mp.players.local.setFaceFeature(i, item); i++; });
		mp.players.local.setComponentVariation(3, appearance[0], 0, 0)
		mp.players.local.setHairColor(appearance[1], appearance[2]);
		mp.players.local.setEyeColor(appearance[3]);
		mp.players.local.setRotation(0.0, 0.0, -185.0, 2, true);	
//		mp.players.local.setRotation(0.0, 0.0, -185.0, 2, true);
//		mp.players.local.taskPlayAnim("amb@world_human_guard_patrol@male@base", "base", 8.0, 1, -1, 1, 0.0, false, false, false);		
		mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	},
	"appearanceAuth" : (data) =>
	{
		appearance = JSON.parse(data); 
		mp.players.local.setComponentVariation(2, appearance[0], 0, 0)
		mp.players.local.setHairColor(appearance[1], appearance[2]);
		mp.players.local.setEyeColor(appearance[3]);
		mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	},
	"topsAuth" : (q, qq, qqq, qqqq) =>
	{ // personage.tops[state.floor][clothing[0]][0], personage.tops[state.floor][clothing[0]][1], personage.tops[state.floor][clothing[0]][2][clothing[1]]
		//tops = JSON.parse(data); 
		//tops = [parseFloat(q), parseFloat(qq), parseFloat(qqq)];
		//mp.events.callRemote("topsAuth", q, qq, qqq);
		mp.players.local.setComponentVariation(11, q, qq || 0, 0)
		mp.players.local.setComponentVariation(3, qqq || 1, 0, 0)
		mp.players.local.setComponentVariation(8, qqqq || 1, 0, 0)
		
		mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	},
	"feetAuth" : (q, qq) =>
	{ // personage.tops[state.floor][clothing[0]][0], personage.tops[state.floor][clothing[0]][1], personage.tops[state.floor][clothing[0]][2][clothing[1]]
		//tops = JSON.parse(data); 
		//tops = [parseFloat(q), parseFloat(qq), parseFloat(qqq)];
		//mp.events.callRemote("topsAuth", q, qq, qqq);
		mp.players.local.setComponentVariation(4, q || 1, qq || 1, 0)
		mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	},
	"legsAuth" : (q, qq) =>
	{ // personage.tops[state.floor][clothing[0]][0], personage.tops[state.floor][clothing[0]][1], personage.tops[state.floor][clothing[0]][2][clothing[1]]
		//tops = JSON.parse(data); 
		//tops = [parseFloat(q), parseFloat(qq), parseFloat(qqq)];
		//mp.events.callRemote("topsAuth", q, qq, qqq);
		mp.players.local.setComponentVariation(6, q || 1, qq || 1, 0)
		mp.game.audio.playSoundFrontend(-1,  "SELECT", "HUD_FREEMODE_SOUNDSET", false);
	},
	"camFaceAuth" : () => {
		mp.game.cam.destroyAllCams(false);
		let cam2 = mp.cameras.new('default',{x:402.9, y:-997.0, z:-98.4},{x:0.0,y:0.0,z:0.0},90.0); 
		cam2.setActive(true); 
		mp.game.cam.renderScriptCams(true, false, 3000, true, false);			
	},
	"camSkinAuth" : () => {
		mp.game.cam.destroyAllCams(false);
		let cam3 = mp.cameras.new('default',{x:402.9, y:-998.4, z:-99.0},{x:0.0,y:0.0,z:0.0},90.0);		
		cam3.setActive(true); 
		mp.game.cam.renderScriptCams(true, false, 3000, true, false);
		mp.players.local.setRotation(0.0, 0.0, -185.0, 2, true);
		mp.players.local.taskPlayAnim("amb@world_human_guard_patrol@male@base", "base", 8.0, 1, -1, 1, 0.0, false, false, false);	
	}
});