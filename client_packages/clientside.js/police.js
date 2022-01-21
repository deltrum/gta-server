global.cuff = false;
mp.game.object.doorControl(631614199, 461.8065, -994.4086, 25.06443, true, 0, 0, 0);
mp.game.object.doorControl(631614199, 461.8065, -997.6583, 25.06443, true, 0, 0, 0);
mp.game.object.doorControl(631614199, 461.8065, -1001.302, 25.06443, true, 0, 0, 0);

mp.game.object.addDoorToSystem(749848321, 749848321, 453.0793, -983.1895, 30.83926, false, false, false);
setInterval(() => {
	if(global.clientsideLoaded && global.auth) {
        if(mp.game.object.getStateOfClosestDoorOfType(749848321, 453.0793, -983.1895, 30.83926, 1, 1).locked) {
            mp.game.object.doorControl(749848321, 453.0793, -983.1895, 30.83926, false, 0, 0, 0);
        }
	}
    }, 5000);
	
mp.events.add(
{
	"cuff": (status) => {
		global.cuff = status;
	},
	"render" : () => {
		if(global.clientsideLoaded && global.auth) {
			if(global.cuff) {
				mp.game.controls.disableAllControlActions(0);
			}
		}
	},
	"updatePoliceNames": () =>
	{
		var players = [];
		mp.players.forEach(player => {
			players[player.remoteId] = player.name;
		});
		players = JSON.stringify(players);
		mp.gui.execute(`window.setPoliceNames('${escape(players)}');`);		
	},
	"setPoliceCall" : (list) => 
	{
		list = JSON.parse(list);
		var players = [];
		var pos = mp.players.local.position;
		mp.players.forEach(player => {
			let id = player.remoteId;
			let _pos = player.position;
			if(list[id] != undefined) players[id] = [player.name, list[id], mp.game.pathfind.calculateTravelDistanceBetweenPoints(pos.x, pos.y, pos.z, _pos.x, _pos.y, _pos.z)];
		});	
		mp.gui.execute(`window.setPoliceCall('${escape(JSON.stringify(players))}');`);				
	},
	"setPoliceMembers": (leader, list) =>
	{
		mp.gui.execute(`window.setPoliceMembers('${escape(list)}', ${leader});`);		
	},
	"setPoliceInfo": (name, star, fine) =>
	{
		mp.gui.execute(`window.setPoliceInfo('${name}', ${star}, '${escape(fine)}');`);		
	},
	"setPoliceWanted": (list) =>
	{
		mp.gui.execute(`window.setPoliceWanted('${escape(list)}');`);		
	},
	"setPoliceStat": (list) =>
	{
		mp.gui.execute(`window.setPoliceStat('${escape(list)}');`);		
	},
	"updatePoliceStatus": (name, status) =>
	{
		mp.gui.execute(`window.setPoliceWanted('${name}', ${status});`);		
	},
	"wantedLevel": (wanted) =>
	{
		mp.game.gameplay.setFakeWantedLevel(wanted);
	},
	"policeSu": (id, star, reason) =>
	{
		mp.events.callRemote("policeSu", id, star, reason);
	},
	"policeFine": (id, price, reason) =>
	{
		mp.events.callRemote("policeFine", id, price, reason);
	},
	"takePoliceCall": (id) =>
	{
		mp.events.callRemote("takePoliceCall", id);
	},
	"takePoliceCancel": (id) =>
	{
		mp.events.callRemote("takePoliceCancel", id);
	},
	"policeInfo": (id) =>
	{
		mp.events.callRemote("policeInfo", id);
	},
	"policeFineCancel": (id) =>
	{
		mp.events.callRemote("policeFineCancel", id);
	},
	"policeSearch": (id) =>
	{
		mp.events.callRemote("policeSearch", id);
	},
	"policeClear": (id) =>
	{
		mp.events.callRemote("policeClear", id);
	},
	"policeUpRank": (id) =>
	{
		mp.events.callRemote("policeUpRank", id);
	},
	"policeDownRank": (id) =>
	{
		mp.events.callRemote("policeDownRank", id);
	},
	"policeRemove": (id) =>
	{
		mp.events.callRemote("policeRemove", id);
	},
	"updatePoliceCall": () =>
	{
		mp.events.callRemote("updatePoliceCall");
	},
	"updatePoliceWanted": () =>
	{
		mp.events.callRemote("updatePoliceWanted");
	},
	"updatePoliceMembers": () =>
	{
		mp.events.callRemote("updatePoliceMembers");
	},
	"updatePoliceStats": () =>
	{
		mp.events.callRemote("updatePoliceStats");
	}
});	