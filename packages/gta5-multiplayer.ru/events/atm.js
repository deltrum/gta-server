module.exports =
{
	"replenishAtm" : (player, amount) =>
	{
		if(player.customFunc.testFloodEvent("replenishAtm")) return;
		if(isNaN(parseInt(amount))) return player.call("alert", "error" , "Некорректная сумма");
		if(parseInt(amount) <= 0 || parseInt(amount) > 500000)  return player.call("alert", "error" , "от $1 до $500.000");
		if(player.customFunc.setMoney(-amount)) return player.call("alert", "error" , "Недостаточно наличных");
		player.customData.bank += parseInt(amount);
		player.call("atmBalance", player.customData.bank);
		player.call("alert", "success" , "Счет успешно пополнен на $" + amount);
	},
	"transferAtm" : (player, id, amount) =>
	{
		if(player.customFunc.testFloodEvent("transferAtm")) return;
 		if(mp.players.at(parseInt(id)) === null) return player.call("alert", "error" , "Неверный ID игрока");	
        if(player.id === parseInt(id)) return  player.call("alert", "error" , "Вы не можете перевести деньги себе");
		if(parseInt(amount) < 0) return player.call("alert", "error" , "Некорректная сумма");
		if(player.customData.bank-parseInt(amount) < 0) return player.call("alert", "error" , "Недостаточно сведств на счету");
		player.customData.bank -= parseInt(amount);
		mp.players.at(parseInt(id)).customData.bank += parseInt(amount);
		player.call("atmBalance", player.customData.bank);
		mp.players.at(parseInt(id)).call("atmBalance", mp.players.at(parseInt(id)).customData.bank);
		player.call("alert", "success" , "Вы перевели $" + amount + " на счет " + mp.players.at(parseInt(id)).name);
		mp.players.at(parseInt(id)).call("alert", "success" , "Вам поступил перевод на $" + amount + " от " + player.name);
	},
	"outputAtm" : (player, amount) =>
	{
		if(player.customFunc.testFloodEvent("outputAtm")) return;
		if(isNaN(parseInt(amount))) return player.call("alert", "error" , "Некорректная сумма");
		if(parseInt(amount) <= 0 || parseInt(amount) > 500000)  return player.call("alert", "error" , "от $1 до $500.000");
		if(player.customData.bank-parseInt(amount) < 0) return player.call("alert", "error" , "Недостаточно сведств на счету");
		player.customData.bank -= parseInt(amount);
		player.customFunc.setMoney(amount);
		player.call("atmBalance", player.customData.bank);
		player.call("alert", "success" , "Со счета успешно снято $" + amount);		
	},
	"paymentAtm" : (player, amount) =>
	{
		if(player.customFunc.testFloodEvent("paymentAtm")) return;
		if(isNaN(parseInt(amount))) return player.call("alert", "error" , "Некорректная сумма");
		if(parseInt(amount) <= 0 || parseInt(amount) > 5000000)  return player.call("alert", "error" , "от $1 до $5000000");
		if(player.customData.bank-parseInt(amount) < 0) return player.call("alert", "error" , "Недостаточно сведств на счету");
		player.customData.bank -= parseInt(amount);
		//player.customData.phone.balance += parseInt(amount);
		player.call("atmBalance", player.customData.bank);
		player.call("alert", "success" , "Баланс мобильного телефона пополнен на $" + amount);
	},	
};