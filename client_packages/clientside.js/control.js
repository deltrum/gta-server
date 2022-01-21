mp.events.add(
{
	"setDataControl" : (profile, items, data) =>
	{
		var pings = JSON.parse(data);
		var players = [];
		mp.players.forEach(player => {
			let id = player.remoteId;
			let color = global.PlayerColors[id] != undefined ? global.PlayerColors[id].join() : "255, 255, 255, 255";
			let ping = pings[id] != undefined ? pings[id] : "-";
			players[id] = [player.name, color, ping];
		});
		players = JSON.stringify(players);
		mp.gui.execute(`window.showDataControl('${escape(profile)}', '${escape(items)}', '${escape(players)}');`);
	},
	"getDataControl" : () =>
	{
		mp.events.callRemote("getDataControl");
	},
	"updatePasswordControl" : (password) =>
	{
		mp.events.callRemote("updatePasswordControl", password);
	},
	"updateNameControl" : (name) =>
	{
		mp.events.callRemote("updateNameControl", name);
	},
	"updateEmailControl" : (email) =>
	{
		mp.events.callRemote("updateEmailControl", email);
	},	
	"supportControl": (message) =>
	{
		mp.events.callRemote("supportControl", message);
	},
	"helperControl": (message) =>
	{
		mp.events.callRemote("helperControl", message);
	},
	"wishesControl": (message) =>
	{
		mp.events.callRemote("wishesControl", message);
	}
});