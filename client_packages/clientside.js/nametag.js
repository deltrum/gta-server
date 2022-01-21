mp.nametags.enabled = false;

const maxDistance = 25*25;
const width = 0.10;
const height = 0.014;
const border = 0.002;

var timer = 0;

global.PlayerColors = [];
global.PlayerAFK = [];

mp.events.add(
{
	"render" : (nametags) => {
		if(global.clientsideLoaded && global.auth) {
			let controls = mp.game.controls;
			let graphics = mp.game.graphics;
			let playerLocal = mp.players.local;
			let myId = playerLocal.remoteId;
			const screenRes = graphics.getScreenResolution(0, 0);
			if(controls.isControlPressed(0, 19)) {
				let pos = playerLocal.getBoneCoords(12844, 0, 0, 0);
				let pos2d = graphics.world3dToScreen2d(pos.x, pos.y, pos.z);
				let y = pos.y - 0.15;
				let color = [255, 255, 255, 255];
				if(global.PlayerColors[myId] !== undefined) color = global.PlayerColors[myId];
				graphics.drawText(playerLocal.name.replace("_", " ") + " [" + myId + "]" , [pos.x, y], { 
					font: 0, 
					color: color, 
					scale: [0.4, 0.4], 
					outline: true
				});
			}		
			nametags.forEach(([player, x, y, distance]) => {
				let color = [255, 255, 255, 255];
				let id = player.remoteId;
				if(global.PlayerColors[id] !== undefined) color = global.PlayerColors[id];
				if(distance <= maxDistance) {
					let scale = distance / maxDistance;
					if(scale < 0.6) scale = 0.6;
					y -= scale * (0.005 * (screenRes.y / 1080));
					if(global.PlayerAFK[id] !== undefined) {
						if(timer < Date.now()) {
							global.PlayerAFK[id]++;
							timer = Date.now() + 1000;
						}
						graphics.drawText("Отошёл: " + String(timeFormat(global.PlayerAFK[id])), [x, y-0.03], { 
							font: 0, 
							color: [255, 255, 255, 150], 
							scale: [0.3, 0.3], 
							outline: true
						});
					}
					graphics.drawText(player.name.replace("_", " ") + " [" + id + "]" , [x, y], { 
						font: 0, 
						color: color, 
						scale: [0.4, 0.4], 
						outline: true
					});
					if(mp.game.player.isFreeAimingAtEntity(player.handle) || controls.isControlPressed(0, 19)) {
						y += 0.05;
						let armour = player.getArmour() / 100;
						if(armour > 0) {
							graphics.drawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);
							graphics.drawRect(x - width / 2 * (1 - armour), y, width * armour, height, 255, 255, 255, 200);
							y += 0.025;
						}			
						let health = player.getHealth() / 100 ;
						graphics.drawRect(x, y, width + border * 2, height + border * 2, 0, 0, 0, 200);
						graphics.drawRect(x - width / 2 * (1 - health), y, width * health, height, 255, 0, 0, 200);
					}
				}		
			});
		}
	},
	"nametags": (colors, afks) => {
		global.PlayerColors = JSON.parse(colors);
		global.PlayerAFK = JSON.parse(afks);
	},
	"updateColorNametags" : (id, color) => {
		global.PlayerColors[id] = JSON.parse(color);
	},
	"updateAFK" : (id, afk) => {
		global.PlayerAFK[id] = afk === null ? undefined : afk;
	},
	"entityStreamIn" : (entity) => {
		if(entity.type === "player") {
			mp.events.callRemote("getAFK", entity.remoteId);
		}
	},
	"entityStreamOut" : (entity) => {
		if(entity.type === "player") {
			global.PlayerAFK[entity.remoteId] = undefined;
		}
	}
});

function timeFormat(time) {
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
}