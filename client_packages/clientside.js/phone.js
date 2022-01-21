mp.events.add(
{
	"phoneSignal" : () =>
	{
		mp.events.callRemote("phoneSignal");
	},
	"phoneSms" : (number,message) =>
	{
		mp.events.callRemote("phoneSms", number, message);
	},	
	"pSignal" : (state) =>
	{
		mp.gui.execute("window.pSignal(" + state + ");");
	},
	"phoneBalance" : () =>
	{
		mp.events.callRemote("phoneBalance");
	},
	"pBalance" : (balance) =>
	{
		mp.gui.execute("window.pBalance(" + balance + ");");
	},	
	"phoneNot": (state) =>
	{
		mp.gui.execute("window.phone.not = " + state + ";");
	},
	"phoneCall": (number) =>
	{
		mp.events.callRemote("phoneCall", number);
	},
	"phoneCallMake": () =>
	{
		mp.events.callRemote("phoneCallMake");
	},
	"phoneCallCancel": () =>
	{
		mp.events.callRemote("phoneCallCancel");
	},	
	"phoneHistoryCall": (textId) =>
	{
		mp.gui.execute("window.phoneHistoryCall(" + textId + ");");
	},		
	"pCall": (number, name, calling) =>
	{
		mp.gui.execute("window.pCall(" + number + ",'" + name +"', " + calling + ");");
	},	
	"addMessagePhone": (number,name,location,text) =>
	{
		mp.gui.execute("window.addMessagePhone(" + number + ",'" + name + "', '" + location + "', '" + text + "')");
	}	
});