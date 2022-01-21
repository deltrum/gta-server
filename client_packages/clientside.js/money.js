global.money = {};
global.money.balance = 0;
global.money.update = 0;
global.money.w = 0;

var change = 0;
var timer = 0;
var togive = 0;
const ui = mp.game.ui;
function getTextWidth(text, font, scale) {
    ui.setTextEntryForWidth("STRING");
    ui.addTextComponentSubstringPlayerName(text);
    ui.setTextFont(font);
    ui.setTextScale(scale * 1.25, scale);
    return ui.getTextScreenWidth(true);
};

mp.events.add(
{
	"render": () => {
		if(global.clientsideLoaded && global.auth) {
			let graphics = mp.game.graphics;
			if(global.money.balance != undefined) graphics.drawText(String("$" + global.money.balance) , [0.99-global.money.w, 0.015], { 
					font: 7, 
					color: [57, 102, 57, 255], 
					scale: [0.6, 0.6], 
					outline: true
				});
			if(change != 0) {
				if(change > 0) graphics.drawText(String("+$" + change) , [0.98-global.money.w, 0.050], { 
						font: 7, 
						color: [114, 204, 114, 255], 
						scale: [0.6, 0.6], 
						outline: true
					});
				else if(change < 0) graphics.drawText(String("-$" + change*-1), [0.98-global.money.w, 0.050], { 
						font: 7, 
						color: [224, 50, 50, 255], 
						scale: [0.6, 0.6], 
						outline: true
					});
				if(timer < Date.now() && change != 0) change = 0;
			}
		}
	},
	"money": (cash) =>
	{
		timer = Date.now() + 10000;
		change = cash - global.money.balance;
		global.money.balance = cash;
		w = getTextWidth(global.money.balance, 4, 0.6);
	}
});