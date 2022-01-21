global.isPauseMenu = false;
var cursor =  false;




function radio_sync() {
	var player = mp.players.local;
	if(player.vehicle){
	if(player.vehicle.getVariable('radio') == null){
		var radio_index = 0;
	}else{
		var radio_index = player.vehicle.getVariable('radio');
	}

		if (player.vehicle && player.vehicle.getPedInSeat(-1) === player.handle) // Check if player is in vehicle and is driver
		{
			if(radio_index != mp.game.invoke("0xE8AF77C4C06ADC93")){
			radio_index = mp.game.invoke("0xE8AF77C4C06ADC93");
			mp.events.callRemote('radiochange', radio_index);
			}
		}else{
			if(radio_index == 255){
				mp.game.audio.setRadioToStationName("OFF");
			}else{
				mp.game.invoke("0xF7F26C6E9CC9EBB8", true);
				mp.game.invoke("0xA619B168B8A8570F ", radio_index);
			}
			
		}
	}
};

mp.events.add(
{
	"render" : () => {
		if(mp.game.ui.isPauseMenuActive() != global.isPauseMenu) {
			global.isPauseMenu = mp.game.ui.isPauseMenuActive();
			mp.events.callRemote("afk", global.isPauseMenu);
		}			
		if(global.isPauseMenu && mp.gui.cursor.visible && !cursor) {
			mp.gui.cursor.show(false, false);
			cursor = true;
		} else if(!global.isPauseMenu && !mp.gui.cursor.visible && cursor) {
			mp.gui.cursor.show(true, true);
			cursor = false;
		}		
	},
	"addMessagePhone": (number,name,location,text) =>
	{
		mp.gui.execute(`window.addMessagePhone('${number}', '${name}', '${location}', '${text}');`);

	},
	"saveBinder" : (binder) =>
	{
		mp.storage.data.binder = binder;
		mp.storage.flush();
	},	
	"alert" : (type, text) =>
	{
		mp.gui.execute(`window.setAlert('${type}' ,'${escape(text)}');`);
	},
	"setGui" : (name) =>
	{
		mp.gui.execute(`window.setGui('${name}');`);
	},
	"select" : (item, text) =>
	{
		mp.events.callRemote("select", item, text);
	},	
	"setMenu" : (title, arr) =>
	{
		mp.gui.execute(`window.setMenu(' ${title}', '${arr}');`);
	},
	"setDialog" : (title, input, buttonLeft, ButtonRigth, focus, text) =>
	{
		mp.gui.execute(`window.setDialog(' ${title}', '${input}', '${buttonLeft}', '${ButtonRigth}', ${focus}, '${escape(text)}');`);
	},	
	"messageShop" : (message) =>
	{
		mp.gui.execute(`window.messageShop(' ${message}');`);
	},
	"buyShop" : (item) =>
	{
		mp.events.callRemote("buyShop", item);
	},
	"playerEnterVehicle" : (vehicle, seat) =>
	{
		setInterval(function(){radio_sync();},1000);
	},	
});

const ui = mp.game.ui;
exports.getTextWidth = (text, font, scale) => {
    ui.setTextEntryForWidth("STRING");
    ui.addTextComponentSubstringPlayerName(text);
    ui.setTextFont(font);
    ui.setTextScale(scale * 1.25, scale);
    return ui.getTextScreenWidth(true);
};