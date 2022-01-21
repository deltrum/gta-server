module.exports =
{
//---------------------------------------- [ Остальные команды ] ----------------------------------------
	"test2" : (player,args) =>
	{	
		player.call("taskScenario", args[1], parseInt(args[2]))
	},	
	"lock" : (player, args) => {
		if ((vehicle = player.vehicle) == undefined) 
		{
		var NearbyVehicles = [];
	    	mp.vehicles.forEachInRange(player.position, 2.5, (NerbyVehicle) => {
	        	NearbyVehicles.push(NerbyVehicle);
	    	});
   			NearbyVehicles.sort(function(a, b){return b.dist(player.position)-a.dist(player.position)});
		        if( NearbyVehicles.length > 0 )
		        {
		        	let newState = !NearbyVehicles[0].locked || false;
		        	NearbyVehicles[0].locked = newState;
		        	let str = newState === false && "открыта" || "закрыта";
		        	player.call("alert", "information" , "Машина " + str);
		        } 
		        else 
		        {
		        	player.call("alert", "error" , "Подойдите к авто поближе");
		        }
		} 
		else 
		{
			let newState = !vehicle.locked || false;
			vehicle.locked = newState;
			let str = newState === false && "открыта" || "закрыта";
		    player.call("alert", "information" , "Машина " + str);
			player.call("setLockCar", vehicle.locked);
		}
	},
	"test" : (player,args) =>
	{
		player.eval(`mp.game.audio.playSoundFrontend(-1,  '${args[1]}', '${args[2]}', false);`);
	},
	"armour" : (player,args) => {
		console.log(player.armour);
		player.armour = 40;
		console.log(player.armour);
	},
	"tpint": (player,args) =>
	{
		let interior = game.interiors_list[parseInt(args[1])];
		player.position = new mp.Vector3(interior.x, interior.y, interior.z);
		player.outputChatBox(interior.Location);
	},
	"tpintt": (player,args) =>
	{
		let interior = game.interiors[parseInt(args[1])];
		player.position = new mp.Vector3(interior.x, interior.y, interior.z);
		player.outputChatBox(interior.name);		
	},
	"checkpoint" : (player,args) =>
	{
		let pos = player.position;
		if(args.length == 2) mp.checkpoints.new(parseInt(args[2]), pos, 10, {
			direction: pos,
			color: [0, 150, 136, 150],
			visible: true,
			dimension: 0
		}); else for(var i = 0; i < 30; i++) { 
			pos.x -= 10.0;
			mp.checkpoints.new(i, pos, 10, {
				direction: pos,
				color: [0, 150, 136, 150],
				visible: true,
				dimension: 0
			});
		}
	}
};
