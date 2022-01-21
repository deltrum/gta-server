mp.events.add(
{
	"atmReplenish" : (data) => { mp.events.callRemote("replenishAtm", data); },
	"atmTransfer" : (id,data) => { mp.events.callRemote("transferAtm", id, data); },
	"atmOutput" : (data) => { mp.events.callRemote("outputAtm", data); },
	"atmPayment" : (data) => { mp.events.callRemote("paymentAtm", data); }
});