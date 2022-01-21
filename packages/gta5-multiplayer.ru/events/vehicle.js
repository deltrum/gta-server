module.exports =
{
	"playerStartEnterVehicle" : (player, vehicle, seat) =>
	{
		console.log("playerStartEnterVehicle: " + seat);
		if (vehicle.customData.autoresp != undefined && vehicle.customData.autoresp == 1) {
			vehicle.customData.res = 0;
		}

		if((vehicle.customData.nolic !== undefined && seat === 0 && player.customData.item.lic_car !== undefined) && player.customData.member !== 8) {
			player.call("alert", "error", "Вы не можете использовать данное авто");
			return player.stopAnimation(); 
		}
		if(vehicle.customData.nolic === undefined && (vehicle.customData.class === 1 && seat === 0 && player.customData.item.lic_car === undefined)) {
			player.call("alert", "error", "У вас нет водитеслькоего удостоверения");
			return player.stopAnimation(); 
		}
		if(vehicle.customData.class === 2 && seat === 0 && player.customData.item.lic_fly === undefined) {
			player.call("alert", "error", "У вас нет лицензии на воздушный транспорт");
			return player.stopAnimation(); 
		}
		if(vehicle.customData.class === 3 && seat === 0 && player.customData.item.lic_water === undefined) {
			player.call("alert", "error", "У вас нет лицензии на водный транспорт");
			return player.stopAnimation(); 
		}			
		if(vehicle.customData.faction !== undefined && seat === 0 && vehicle.customData.faction !== player.customData.member) {
			player.call("alert", "error", "Вы не состоите в данной фракции.");
			return player.stopAnimation(); 
		}
		if((vehicle.customData.faction != undefined && vehicle.customData.rang != undefined) && (vehicle.customData.rang > player.customData.rank) && seat == 0) {
			player.call("alert", "error", "Вы не можете использовать данную технику");
			return player.stopAnimation(); 
		}
		if(vehicle.customData.job !== undefined && seat === 0 && player.customData.member !== 0) {
			player.call("alert", "error", "Вы состоите во фракции.");
			return player.stopAnimation(); 
		}
	},	
	"updateFuel" : (player, id, fuel) =>
	{
		if((vehicle = mp.vehicles.at(parseInt(id))) !== null) {
			if(parseInt(fuel) <= 0) {
				player.call("alert", "error", "Бензин закончился!");
				vehicle.engine = false;
				vehicle.customData.engine = false;
			}
			//console.log("Установка бензина " + fuel);
			vehicle.customData.fuel = parseInt(fuel);
		}
	},	
	"playerEnterVehicle" : (player, vehicle, seat) =>
	{
		console.log("playerEnterVehicle: " + seat);
		if(seat === -1) {
			if(((vehicle.customData.faction !== undefined) && (vehicle.customData.faction !== player.customData.member) || (vehicle.customData.rang !== undefined && vehicle.customData.rang > player.customData.rank)) || (vehicle.customData.job !== undefined && player.customData.member !== 0) || (vehicle.customData.class === 1 && player.customData.item.lic_car === 0) || (vehicle.customData.class === 2 && player.customData.item.lic_fly === 0) || (vehicle.customData.class === 3 && player.customData.item.lic_water === 0)) return player.removeFromVehicle(); 
			if(vehicle.customData.job !== undefined)
			{
				if(player.customData.job.id !== vehicle.customData.job) return player.customFunc.setDialog(27, "Служба занятости", "", "Принять", "Отклонить", 1,"Вы желаете устроиться на работу " + game.jobs[vehicle.customData.job].name, vehicle.customData.job);
				if(player.customData.job.id === vehicle.customData.job && vehicle.customData.job === 2) return player.customFunc.setDialog(30, "Тариф", "Цена за км", "Отклонить", "Принять", 1, "От $1 до $10", "");			
				if(player.customData.job.id === vehicle.customData.job && vehicle.customData.job === 3) {
					if(player.customData.job.busId !== vehicle.id) {
						if(player.customData.job.busId !== -1) {
							player.customData.job.busRoute = -1;
							player.customData.job.busId = -1;
							player.call("busCancel");
						}
						let routeList = API.routeList();
						routeList.push("Аренда автобуса | $500");
						routeList.push("Закрыть");
						return player.customFunc.setMenu(2, "Маршруты автобуса", routeList, "");
					}
				}
			}
			player.call("setVehData", vehicle.customData.fuel, vehicle.customData.engine, vehicle.locked);
		}
		if (vehicle.customData.nolic !== undefined && player.customData.item.lic_car === undefined) {
				let vehId = player.vehicle.customData.id;
				let spawn = game.vehicles[vehId][1];
				player.customData.job.busId = vehId;
				player.call("licRoute", 0, "Сдача на права", 60, spawn);
				player.call("alert", "success" , "Вы начали сдачу на права");

		}
	},
	"vehicleDeath"  : (vehicle) => {
		if(vehicle.player !== undefined) {
			vehicle.player.removeFromVehicle()
		}
		if(vehicle.customData.id !== undefined) {
			let [model, [x,y,z], heading, [[r1, g1, b1], [r2, g2, b2]], arrVeh] = game.vehicles[vehicle.customData.id];
			let spawnPos = new mp.Vector3(x, y, z);
			vehicle.customFunc.respawn(spawnPos, heading);
			console.log("vehicleDeath");
		}
	},
	"playerExitVehicle" : (player, vehicle) =>
	{
		if (vehicle.customData.autoresp == undefined) return;
		function ResetCar(car)
		{
			if (car == undefined) return;
			if (car.customData.res != 1) return;
			let [model, [x,y,z], heading, [[r1, g1, b1], [r2, g2, b2]], arrVeh] = game.vehicles[car.customData.id];
			let spawnPos = new mp.Vector3(x, y, z);
			car.customFunc.respawn(spawnPos, heading);
		}
		setTimeout(ResetCar, 60000, vehicle);
		vehicle.customData.res = 1;
		player.call("alert", "information", "Вы покинули стартовый транспорт");
		player.call("alert", "information", "Он удалится через 60 секунд если вы не сядете обратно");
	},
	"playerStartExitVehicle" : (player, vehicle) =>
	{

	},
	"radiochange" : (player, vehicle_data) =>
	{
		player.vehicle.setVariable('radio', vehicle_data);
	}
};
