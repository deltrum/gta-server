module.exports =
{
//---------------------------------------- [ Работы ] ----------------------------------------
	"repair" : (player, args) =>
	{
		if(player.customData.job.id !== 1) return player.call("alert", "error" , "Вы не механик.");
		if(args.length !== 3 || isNaN(parseInt(args[1])) || isNaN(money = parseInt(args[2]))) return player.call("alert", "information" , "Используйте: /repair [id] [price]"); 
		if((_player = mp.players.at(parseInt(args[1]))) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(player === _player) return player.call("alert", "error" , "Вы указали свой ID");
		if(player.vehicle === undefined) return player.call("alert", "error" , "Вы не в машине");
		if(player.vehicle.customData.job !== player.customData.job.id) return player.call("alert", "error" , "Вы не в служебной машине");
		if(!API.radius(5, _player.position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!"); 
		if(_player.vehicle === undefined) return player.call("alert", "error" , "Игрок не в машине");
		if(money < 10 || money > 1000) return player.call("alert", "error" , "Стоимость от $10 до $1000");
		_player.customFunc.setDialog(25, "Ремонт ТС", "", "Отклонить", "Принять", 1, "Механик " + player.name + " предлагает вам починить манину за $" + money, {repairId: player.id, repairPrice: money});
		player.outputChatBox("Вы предложили " + _player.name + " отремонтировать ТС");
	},	
	"refill" : (player, args) =>
	{
		if(player.customData.job.id !== 1) return player.call("alert", "error" , "Вы не механик.");
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /refill [id]"); 
		if((_player = mp.players.at(parseInt(args[1]))) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(player === _player) return player.call("alert", "error" , "Вы указали свой ID");		
		if(player.vehicle === undefined) return player.call("alert", "error" , "Вы не в машине");  
		if(player.vehicle.customData.job !== player.customData.job.id) return player.call("alert", "error" , "Вы не в служебной машине"); 	
		if(!API.radius(5, _player.position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!"); 
		if(_player.vehicle === undefined) return player.call("alert", "error" , "Игрок не в машине");
		_player.customFunc.setDialog(26, "Заправка ТС", "", "Отклонить", "Принять", 1, "Механик " + player.name + " предлагает вам заправить машину за $1000", {refillId: player.id, refillPrice: 1000});
	},
	"fare" : (player, args) =>
	{
		if(player.customData.job.id !== 2) return player.call("alert", "error" , "Вы не таксист.");
		if(player.vehicle === undefined) return player.call("alert", "error" , "Вы не в машине");  
		if(player.vehicle.customData.job !== player.customData.job.id) return player.call("alert", "error" , "Вы не в служебной машине"); 
		player.customFunc.setDialog(30, "Тариф", "Цена за км", "Отклонить", "Принять", 1, "От $1 до $10", "");
		//if(args.length !== 2 || isNaN(parseInt(money = args[1]))) return player.call("alert", "information" , "Используйте: /fare [price]"); 

 		
	}
};

