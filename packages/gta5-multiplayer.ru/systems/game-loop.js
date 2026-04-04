"use strict";

module.exports = function startGameLoop() {
	let hours = new Date().getHours();
	let timer15minutes = CONST.TIMER_15_MINUTES;
	let timer1minutes = CONST.TIMER_1_MINUTE;

	setInterval(function () {
		try {
			mp.world.time.hour = new Date().getHours();
			mp.world.time.minute = new Date().getMinutes();
			if (hours !== new Date().getHours()) {
				hours = new Date().getHours();
				API.payday();
				API.save();
				console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] PayDay");
			}
			mp.players.forEach(player => {
				if (player.customData.afk !== undefined) player.customData.afk++;
				if (player.customData.jail === 1) {
					player.call("alert", "success", "Ваc отпустили из тюрьмы.");
					player.customFunc.generate();
				}
				if (timer15minutes === 0) {
					player.outputChatBox("<font color='#FFA500'>============ [ Объявления ] ============</font><br>Мы Вконтакте: <font color='green'>vk.com/gta5_ragemp</font><br>Сайт: <font color='green'>GTA5-MULTIPLAYER.RU</font><br>Чтобы посмотреть список игроков нажмите <font color='green'>[Z]</font>.<br>=======================================");
					if (player.customData.dehydration !== 100) player.customData.dehydration += Math.floor(Math.random() * (10 - 5 + 1)) + 5;
					if (player.customData.satiety !== 100) player.customData.satiety += Math.floor(Math.random() * (10 - 5 + 1)) + 5;
					if (player.customData.dehydration > 100) player.customData.dehydration = 100;
					if (player.customData.satiety > 100) player.customData.satiety = 100;
				}

				if (player.customData.mute > 0) player.customData.mute -= 1;
				if (player.customData.mute === 1) player.call("alert", "success", "Молчанка закончился!");
				if (player.customData.sleep === 1) player.customFunc.generate();
				if (player.customData.sleep > 0) player.customData.sleep -= 1;
				if (player.customData.jail > 0) player.customData.jail -= 1;

				if (player.customData.timer.control > 0) player.customData.timer.control -= 1;
				if (player.customData.timer.warehouse > 0) player.customData.timer.warehouse -= 1;

				if (player.customData.flood.timer.text > 0) player.customData.flood.timer.text -= 1;
				if (player.customData.flood.timer.event > 0) player.customData.flood.timer.event -= 1;
				if (player.customData.flood.timer.text === 0 && player.customData.flood.text !== null) player.customData.flood.text = null;
				if (player.customData.flood.timer.event === 0 && player.customData.flood.event !== null) player.customData.flood.event = null;
				if (timer1minutes === 0 && player.customData.flood.repr > 0) player.customData.flood.repr--;
			});
			if (timer15minutes === 0) {
				let sumUpdate = 0;
				mp.vehicles.forEach(veh => {
					if (veh.customData.id !== undefined) {
						let [model, [x, y, z], heading, [[r1, g1, b1], [r2, g2, b2]], arrVeh] = game.vehicles[veh.customData.id];
						let spawnPos = new mp.Vector3(x, y, z);
						let pos = veh.position;
						let lastPos = veh.customData.lastPos;
						if (lastPos.x === pos.x &&
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
			if (global.game.control.timerPing > 0) global.game.control.timerPing--;

			if (timer1minutes === 0) timer1minutes = CONST.TIMER_1_MINUTE;
			if (timer15minutes === 0) timer15minutes = CONST.TIMER_15_MINUTES;
			timer1minutes--;
			timer15minutes--;
		} catch (err) {
			console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] Error: Main timer");
			console.log(err);
		}
	}, 1000);
};
