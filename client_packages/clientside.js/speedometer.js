global.vehicle = {};
global.vehicle.id = undefined;
global.vehicle.fuel = 0;
global.vehicle.engine = false;
global.vehicle.seat = -1;

setInterval(() => {
	if(global.clientsideLoaded && global.auth) {
		let veh = mp.players.local.vehicle;
		if(veh != null && global.vehicle.seat == -1) {
			let speed = veh.getSpeed()* 3.6;
			mp.gui.execute(`window.setSpeed(${speed});`);
			if(global.vehicle.engine) {
				global.vehicle.fuel -= speed * 0.000001;
				if(global.vehicle.fuel <= 0) {
					global.vehicle.fuel = 0;
					global.vehicle.engine = false;
					mp.gui.execute(`window.setEngine(${global.vehicle.engine});`);
					mp.events.callRemote("updateFuel", global.vehicle.id, global.vehicle.fuel);
				}
				mp.gui.execute(`window.setFuel(${global.vehicle.fuel});`);
			}
		}
		if(veh != null && global.vehicle.id == undefined) {
			global.vehicle.id = veh.remoteId;
			mp.gui.execute("window.setSpeedometer(true);");
		} else if(veh == null && global.vehicle.id != undefined) {
			if(global.vehicle.engine) mp.events.callRemote("updateFuel", global.vehicle.id, global.vehicle.fuel);
			global.vehicle.id = undefined;
			global.vehicle.engine = false;
			global.vehicle.fuel = 0;
			mp.gui.execute("window.setSpeedometer(false);");
		}
	}
}, 50);

mp.events.add(
{
    "setVehData": (fuel, engine, lock) =>
	{
		mp.gui.execute(`window.setEngine(${engine});`);
		mp.gui.execute(`window.setLockCar(${lock});`);
		if(fuel != 0 && engine) global.vehicle.engine = true;
		global.vehicle.fuel = fuel;
		mp.gui.execute(`window.setFuel(${fuel});`);
	},
    "setEngine": (engine) =>
	{
		mp.gui.execute(`window.setEngine(${engine});`);
		global.vehicle.engine = engine;
	},
    "setLockCar": (lock) =>
	{
		mp.gui.execute(`window.setLockCar(${lock});`);
	},
	"PlayerEnterVehicle": (player, vehicle, seat) =>
	{
		global.vehicle.seat = seat;
	}
});