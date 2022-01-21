/*
        common: ["pay", "hi", "showpass", "lic_car"],
        faction: [
            [],
            ["cuff", "frisk", "showudost", "arrest", "invite","uninvite", "giverank", "repr"],
            ["invite","uninvite", "giverank", "repr"],
            ["heal", "invite","uninvite", "giverank", "repr"],
            ["subsidy", "invite","uninvite", "giverank", "repr", "demote", "free"],
            ["invite","uninvite", "giverank", "repr", "ex"],
            ["cuff", "frisk", "showudost", "arrest", "invite","uninvite", "giverank", "repr"],
            ["invite","uninvite", "giverank", "repr"],
            ["invite","uninvite", "giverank", "repr"]
        ],
        job: [
           [],
           ["repair", "refill"],
           [] 
        ],
*/


module.exports =
{
	//---------------------------------------- [ Фракции ] ----------------------------------------
	"ex" : (player, args) =>
	{
		if(player.id = 5) return player.call("alert", "error" , "Вы не работаете в Prison LS");
		if(args.length !== 3 || isNaN(parseInt(args[1])) || isNaN(parseInt(args[2]))) return player.call("alert", "information" , "Используйте: /ex [id] [sec]");
		if(mp.players.at(parseInt(args[1])) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(!mp.players.at(args[1]).customData.jail) return player.call("alert", "error" , "Игрок не в тюрьме");
		if(parseInt(args[2]) < 1 || parseInt(args[2]) > 360 ) return player.call("alert", "error" , "От 1 до 360 секунд");
		if(!API.radius(5, mp.players.at(args[1]).position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!"); 
		mp.players.at(args[1]).customData.jail += parseInt(args[2]);
		player.call("alert", "success" , "Вы добавили к сроку заклучения " + mp.players.at(args[1]).name + " " + args[2] + " секунд");
		mp.players.at(args[1]).outputChatBox("К вашему сроку заклучения " + player.name + " добавил " + args[2] + " секунд");
	},
	"police" : (player, args) => 
	{
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		player.call("setGui", "police");
	},
	"cuff" : (player, args) => 
	{
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /cuff [id]");
 		if(mp.players.at(parseInt(args[1])) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(!API.radius(5, mp.players.at(args[1]).position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!");
        //if(parseInt(args[1]) === player.id) return player.call("alert", "error" , "Вы указали свой ID");	
		if(mp.players.at(parseInt(args[1])).cuff) {
			mp.players.broadcastInRange(player.position, 20, "<font color='#c2a2da'><b>"+player.name + " снял(а) наручники с " + mp.players.at(args[1]).name +"</b></font>");
			mp.players.at(parseInt(args[1])).cuff = false;
			mp.players.at(parseInt(args[1])).setClothes(7, 0, 0, 0);
			mp.players.at(parseInt(args[1])).stopAnimation();
			mp.players.at(parseInt(args[1])).call("cuff", false);			
		} else {
			mp.players.broadcastInRange(player.position, 20, "<font color='#c2a2da'><b>"+player.name + " надел(а) наручники на " + mp.players.at(args[1]).name +"</b></font>");
			mp.players.at(parseInt(args[1])).cuff = true;
			let cuffId = [41,25]
			mp.players.at(parseInt(args[1])).setClothes(7, cuffId[mp.players.at(parseInt(args[1])).customData.personage[0]], 0, 0);
			mp.players.at(parseInt(args[1])).playAnimation('mp_arresting', 'idle', 1, 49);
			mp.players.at(parseInt(args[1])).call("cuff", true);		
		}

	},
	"repr" : (player, args) =>
	{
		if(!player.customData.member) return player.call("alert", "error" , "Вы не состоите во фракции");
		if(args.length > 3 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /repr [id] [reason]");	
		if(player.customData.rank < game.faction[player.customData.member].rank.length-2) return player.call("alert", "error" , "Вы неуполномочены выдавать выговор");
		args.shift();
		if(mp.players.at(parseInt(args[0])) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(args[0] === player.id) return player.call("alert", "error" , "Вы указали свой ID");
		if(mp.players.at(args[0]).customData.member !== player.customData.member) return player.call("alert", "error" , "Игрок не состоит в вашей фракции.");		
		const id = args[0];
		args.shift();
		let text = API.striptags(args.join(" "), "<b><s><u><strong>");
		if(text === "") return player.call("alert", "information" , "Используйте: /repr [id] [reason]");
		if(mp.players.at(id).customData.item.repr === undefined) mp.players.at(id).customData.item.repr = 0;
		mp.players.at(id).customData.item.repr += 1;
		mp.players.at(id).outputChatBox(player.name + " выдал(а) вам " + mp.players.at(id).customData.item.repr + "/3 выговоров. Причина: " + text);
		player.call("alert", "success" , "Вы выдали " + mp.players.at(id).customData.item.repr + "/3 выговоров. Причина: " + text);
		if(mp.players.at(id).customData.item.repr === 3)
		{
			delete mp.players.at(id).customData.item.repr;
			mp.players.at(id).customData.member = 0;
			mp.players.at(id).customData.rank = 0
			mp.players.at(id).customFunc.generate();	
			mp.players.at(id).outputChatBox("Вас уволили из фракции. Причина: 3 выговора.")
			player.outputChatBox(mp.players.at(id).name + "был уволен. Причина: 3 выговора.");
		}
	},
	"n" : (player, args) =>
	{
		if(player.customData.member !== 7) return player.call("alert", "error" , "Вы не работаете в LS NEWS");
		if(player.vehicle === undefined) return player.call("alert", "error" , "Вы не в машине");  
		if(player.vehicle.customData.faction !== player.customData.member) return player.call("alert", "error" , "Вы не в служебной машине"); 		
		player.customFunc.setMenu(18, "Редактор LS News", ["Установить цену на SMS", "Установить цену на объявление", "Работа с объявлениями" , "Закрыть"], "");
	},
	"subsidy" : (player, args) => 
	{
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /subsidy [id]");
		if(player.customData.member !== 4) return player.call("alert", "error" , "Вы не состоите в мэрии.");
		if(mp.players.at(parseInt(args[1])) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(player.id === args[1]) return player.call("alert", "error" , "Вы не можете выдать суббсидию себе"); 
		//if(mp.players.at(args[1]).level < 3)  return player.call("alert", "error" , "Необходим 3 уровень.");
		if(mp.players.at(args[1]).customData.item.subsidy === undefined)  return player.call("alert", "error" , "Уже получал суббсидию");
		game.faction[4].balance -= game.nalog*1000;
		mp.players.at(args[1]).customFunc.setMoney(game.nalog*1000);
		mp.players.at(args[1]).customData.item.subsidy = game.nalog*1000;
		mp.players.broadcastInRange(player.position, 20, "<font color='#c2a2da'><b>"+ player.name +" выдал(а) суббсидию " + mp.players.at(args[1]).name +"</b></font>");	
	},
	"rebank" : (player, args) => 
	{
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /rebank [price]");
		if(parseInt(args[1]) < 1 && parseInt(args[1]) > 100000) return player.call("alert", "error" , "Некорректная сумма");		
		if(!player.customData.member) return player.call("alert", "error" , "Вы не состоите во фракции.");
		if(game.faction[player.customData.member].balance === undefined) return player.call("alert", "error" , "У вашей фракции нет банка.");
		if(player.customFunc.setMoney(-args[1])) return player.call("alert", "error" , "Недостаточно средств");
		game.faction[player.customData.member].balance += parseInt(args[1]);
		player.call("alert", "success" , "Вы положили в банк фракции $" + args[1]);
	},
	"wibank" : (player, args) => 
	{
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /wibank [price]");
		if(parseInt(args[1]) < 1 && parseInt(args[1]) > 100000) return player.call("alert", "error" , "Некорректная сумма");			
		if(!player.customData.member) return player.call("alert", "error" , "Вы не состоите во фракции.");
		if(game.faction[player.customData.member].balance === undefined) return player.call("alert", "error" , "У вашей фракции нет банка.");
		if(player.customData.rank !== game.faction[player.customData.member].rank.length) return player.call("alert", "error" , "Вы не лидер!");
		if(game.faction[player.customData.member].balance-parseInt(args[1]) < 0) return player.call("alert", "error" , "Недостаточно средств");
		game.faction[player.customData.member].balance -= parseInt(args[1]);
		player.customFunc.setMoney(args[1]);
		player.call("alert", "success" , "Вы взяли из банка фракции $" + args[1]);
	},	
	"settax" : (player, args) => 
	{
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /settax [1-15]");
		if(player.customData.member !== 4) return player.call("alert", "error" , "Вы не состоите в мэрии.");
		if(parseInt(args[1]) < 1 && parseInt(args[1]) > 15) return player.call("alert", "error" , "Налог должен состовлять от 1 до 15 процентов.");
		if(player.customData.rank !== game.faction[player.customData.member].rank.length) return player.call("alert", "error" , "Вы не является мэром!");
		mp.players.forEach(_player => { 
		if(player.customData.gov === 0) _player.outputChatBox("=================== [ Новости Штата ] =====================");
        _player.outputChatBox( "<b><font color ='#42aaff'>" + "[" + game.faction[player.customData.member].member + "] " + game.faction[player.customData.member].rank[player.customData.rank-1] + " " + player.name + " установил гос.налог " + Math.max(1, Math.min(args[1], 15)) + " процентов.</font></b>");
		player.customData.gov = 5;
        });
		game.nalog = parseInt(Math.max(1, Math.min(args[1], 15)));
	},
	"bank" : (player, args) => 
	{
		if(!player.customData.member) return player.call("alert", "error" , "Вы не состоите во фракции.");
		if(game.faction[player.customData.member].balance === undefined) return player.call("alert", "error" , "У вашей фракции нет банка.");
		player.call("alert", "information" , "На счету фракции " + game.faction[player.customData.member].member + ": $" + game.faction[player.customData.member].balance + ".");
	},
	"frisk" : (player, args) => 
	{
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /frisk [id]");
 		if(mp.players.at(parseInt(args[1])) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(player.id === args[1]) return player.call("alert", "error" , "Вы не можете обыскать себя"); 
		if(!API.radius(5, mp.players.at(args[1]).position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!"); 		
        mp.players.broadcastInRange(player.position, 20, "<font color='#c2a2da'><b>"+player.name +" обыскал(а) " + mp.players.at(args[1]).name + "</b></font>");
		player.call("items", parseInt(args[1]), JSON.stringify(mp.players.at(args[1]).customData.item));
	},
	"free" : (player, args) =>
	{
		if(player.customData.member !== 4 || player.customData.rank !== 2) return player.call("alert", "error" , "Вы не работаете адвокатом.");
		if(args.length !== 3 || isNaN(parseInt(args[1])) || isNaN(parseInt(args[2]))) return player.call("alert", "information" , "Используйте: /free [id] [price]");
 		if(mp.players.at(parseInt(args[1])) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(parseInt(args[2]) < 500 || parseInt(args[2]) > 5000) return player.call("alert", "error" , "Стоймость от $500 до $5000");
		if(!API.radius(5, mp.players.at(args[1]).position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!");
		if(mp.players.at(args[1]).customData.jail === 0) return player.outputChatBox("Игрок не в тюрьме!");
		mp.players.at(args[1]).customFunc.setDialog(16, "Освобождение под залог", "", "Принять", "Отклонить", 1, "Адвокат " + player.name + " предложил залог $" + args[2], {freeId: player.id, freePrice: parseInt(args[2])});
	},	
	"heal" : (player, args) =>
	{
		if(player.customData.member !== 3) return player.call("alert", "error" , "Вы не работаете в MOH LS");
		if(typeof player.vehicle === "undefined") return player.call("alert", "error" , "Вы не в машине");   
		if(player.vehicle.customData.faction !== player.customData.member) return player.call("alert", "error" , "Вы не в служебной машине"); 
		if(args.length !== 3 || isNaN(parseInt(args[1])) || isNaN(parseInt(args[2]))) return player.call("alert", "information" , "Используйте: /heal [id] [price]");
 		if(mp.players.at(parseInt(args[1])) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(parseInt(args[2]) < 100 || parseInt(args[2]) > 1000) return player.call("alert", "error" , "Стоймость от $100 до $1000");
		if(!API.radius(5, mp.players.at(args[1]).position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!");
		mp.players.at(args[1]).customFunc.setDialog(17, "Медицинские услуги", "", "Принять", "Отклонить", 1, game.faction[player.customData.member].rank[player.customData.rank-1] + " " + player.name + " предлагает вам лечение за $" + args[2], {healId: player.id, healPrice: parseInt(args[2])});		
	},	
	"gov": (player, args) =>
    {
		if(args.length < 2) return player.call("alert", "information" , "Используйте: /gov [text]");
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(player.customData.member !== 1 && player.customData.member !== 2 && player.customData.member !== 3 && player.customData.member !== 4 && player.customData.member !== 5 && player.customData.member !== 6) return player.call("alert", "error" , "Вы неуполномочены выходить в гос.новости.");
		if(player.customData.rank < game.faction[player.customData.member].rank.length-1) return player.call("alert", "error" , "Вы неуполномочены выходить в гос.новости");
		args.shift();
		let text = API.striptags(args.join(" "), "<b><s><u><strong>");
		if(text === "") return player.call("alert", "information" , "Используйте: /gov [text]");
		mp.players.forEach(_player => { 
		if(player.customData.gov === 0) _player.outputChatBox("============= [ Новости Штата ] ==============");
		_player.outputChatBox("<b><font color ='#42aaff'>" + "[" + game.faction[player.customData.member].member + "] " + game.faction[player.customData.member].rank[player.customData.rank-1] + " " + player.name + ": " + text + "</font></b>");
		});
		player.customData.gov = 5;
	},
	"invite": (player, args) =>
    {
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /invite [id]");
		if(!player.customData.member) return player.call("alert", "error" , "Вы не состоите во фракции.");		
		if(mp.players.at(parseInt(args[1])) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(!API.radius(5, mp.players.at(args[1]).position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!"); 
		if(args[1] === player.id) return player.call("alert", "error" , "Вы указали свой ID");
		if(player.customData.rank < game.faction[player.customData.member].rank.length-1) return player.call("alert", "error" , "Вы неуполномочены принимать во фракцию");
		//if(mp.players.at(args[1]).level < game.faction[player.customData.member].level) return player.call("alert", "error" , "Необходимо повысить уровень игры."); 		
		if(player.customData.member === 1) 
		{
			if(mp.players.at(args[1]).customData.rank < 2 || mp.players.at(args[1]).customData.member !== 2)	return player.call("alert", "error" , "Перевод в LSPD разрешен с 2 ранга.");
			if(mp.players.at(args[1]).customData.rank === game.faction[mp.players.at(args[1]).customData.member].rank.length) return player.call("alert", "error" , "Игрок является лидером.");
			mp.players.at(args[1]).customData.item.key = 1;
		}
		else if(player.customData.member === 6) 
		{
			if(mp.players.at(args[1]).customData.rank < 2 || mp.players.at(args[1]).customData.member !== 1)	return player.call("alert", "error" , "Перевод в SWAT разрешен с 2 ранга или он уже состоит во фракции");
			if(mp.players.at(args[1]).customData.rank === game.faction[mp.players.at(args[1]).customData.member].rank.length) return player.call("alert", "error" , "Игрок является лидером.");
			mp.players.at(args[1]).customData.item.key = 1;
		} 
		else if(mp.players.at(args[1]).customData.member !== 0) return player.call("alert", "error" , "Игрок уже состоит во фракции");
		mp.players.at(args[1]).customFunc.setDialog(3, "Приглашение", "", "Отклонить", "Принять", 1, "Вас пригласили в организацию " + game.faction[player.customData.member].member, player.customData.member);
		player.call("alert", "success" , "Вы пригласили во фракцию.")
		
    },
	"uninvite": (player, args) =>
    {
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /uninvite [id]"); 
		if(mp.players.at(parseInt(args[1])) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(args[1] === player.id) return player.call("alert", "error" , "Вы указали свой ID");
		if(!player.customData.member) return player.call("alert", "error" , "Вы не состоите во фракции.");
		if(player.customData.rank < game.faction[player.customData.member].rank.length-1) return player.call("alert", "error" , "Вы неуполномочены увольнять из фракции");
		if(mp.players.at(args[1]).customData.member !== player.customData.member) return player.call("alert", "error" , "Игрок не состоит в вашей фракции.");
		if(mp.players.at(args[1]).customData.rank >= player.customData.rank) return player.call("alert", "error" , "Вы не можете уволить старшего по рангу");
		mp.players.at(args[1]).customData.member = 0;
		mp.players.at(args[1]).customData.rank = 0;
		mp.players.at(args[1]).customFunc.generate();	
		player.call("alert", "success" , "Вы уволили игрока из фракции.")
		mp.players.at(args[1]).outputChatBox("<font color='red'>" + player.name + " уволил(а) вас из " + game.faction[player.customData.member].member + "</font>");
		
    },
	"giverank": (player, args) =>
    {
		if(args.length !== 3 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /giverank [id] [+/-]"); 
		if(mp.players.at(parseInt(args[1])) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(args[1] === player.id) return player.call("alert", "error" , "Вы указали свой ID");
		if(args[2] !== "+" && args[2] !== "-") return player.call("alert", "information" , "[+] - повысить, [-] - понизить");
		if(!player.customData.member) return player.call("alert", "error" , "Вы не состоите во фракции.");
		if(player.customData.rank < game.faction[player.customData.member].rank.length-1) return player.call("alert", "error" , "Вы неуполномочены повышать/понижать в ранге");
		if(mp.players.at(args[1]).customData.member !== player.customData.member) return player.call("alert", "error" , "Игрок не состоит в вашей фракции.");
		if(!API.radius(5, mp.players.at(args[1]).position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!"); 
		if(args[2] === "+")
		{
			if(mp.players.at(args[1]).customData.rank+1 >= player.customData.rank) return player.call("alert", "error" , "Вы не можете больше повысить данного игрока");
			player.call("alert", "success" , "<font color='#42aaff'>Вы повысили игрока</font>");
			mp.players.at(args[1]).outputChatBox("<font color='#42aaff'>Вы были повышены</font>");
			mp.players.at(args[1]).customData.rank++;
		}
		else 
		{
			if(mp.players.at(args[1]).customData.rank >= player.customData.rank) return player.call("alert", "error" , "Вы не можете понизить старшего или равного по рангу игрока");
			if(mp.players.at(args[1]).customData.rank-1  < 1) return player.call("alert", "error" , "Понижать уже нельзя. Можно просто уволить"); 
			player.call("alert", "success" , "<font color='red'>Вы понизили игрока</font>");
			mp.players.at(args[1]).outputChatBox("<font color='red'>Вы были понижены</font>");
			mp.players.at(args[1]).customData.rank--;			
		}
    },
	"demote": (player, args) =>
    {
		if(args.length !== 3 || isNaN(parseInt(args[1])) || isNaN(parseInt(args[2]))) return player.call("alert", "information" , "Используйте: /demote [id] [rank]"); 
		if(player.customData.member !== 4 || player.customData.rank < game.faction[player.customData.member].rank.length) return player.call("alert", "error" , "Вы неуполномочены использовать эту команда.");
		if(mp.players.at(parseInt(args[1])) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(args[1] === player.id) return player.call("alert", "error" , "Вы указали свой ID");
		if(mp.players.at(args[1]).customData.member !== 1 && mp.players.at(args[1]).customData.member !== 2 && mp.players.at(args[1]).customData.member !== 4 && mp.players.at(args[1]).customData.member !== 6) return player.call("alert", "error" , "Не является гос.служищим");
		if(parseInt(args[2]) < 0 || parseInt(args[2]) > game.faction[mp.players.at(args[1]).customData.member].rank.length-2) return player.outputChatBox("Некорректный ранг");
		if(parseInt(args[2]) === 0)
		{
			if(mp.players.at(args[1]).customData.rank > game.faction[mp.players.at(args[1]).customData.member].rank.length-2) return player.call("alert", "error" , "Вы не можете уволить высокоуполномоченных");
			mp.players.at(args[1]).outputChatBox("<font color='red'>Вас уволил " + game.faction[player.customData.member].rank[player.customData.rank-1] + " " + player.name + "</font>");
			mp.players.forEach(_player => { if(_player.customData.member === 1 || _player.customData.member === 2 || _player.customData.member === 3 || _player.customData.member === 4 || _player.customData.member === 5 || _player.customData.member === 6) _player.outputChatBox("<b><font color='#FF6347'><< " + game.faction[player.customData.member].rank[player.customData.rank-1] + " " + player.name + " уволил " + mp.players.at(args[1]).name +". >></font></b>"); });
			mp.players.at(args[1]).customData.member = 0;
			mp.players.at(args[1]).customData.rank = 0;
			mp.players.at(args[1]).customFunc.generate();			
		}
		else if(parseInt(args[2]) > mp.players.at(args[1]).customData.rank)
		{
			if(mp.players.at(args[1]).customData.rank > game.faction[mp.players.at(args[1]).customData.member].rank.length-2) return player.call("alert", "error" , "Вы не можете уволить высокоуполномоченных");
			mp.players.at(args[1]).outputChatBox("<font color='red'>Вас повысил " + game.faction[player.customData.member].rank[player.customData.rank-1] + " " + player.name + "</font>");
			mp.players.forEach(_player => { if(_player.customData.member === 1 || _player.customData.member === 2 || _player.customData.member === 3 || _player.customData.member === 4 || _player.customData.member === 5 || _player.customData.member === 6) _player.outputChatBox("<b><font color='#FF6347'><< " + game.faction[player.customData.member].rank[player.customData.rank-1] + " " + player.name + " повысил(а) " + mp.players.at(args[1]).name +". >></font></b>"); });
			mp.players.at(args[1]).customData.rank = parseInt(args[2]);			
		}
		else if(parseInt(args[2]) < mp.players.at(args[1]).customData.rank)
		{
			if(mp.players.at(args[1]).customData.rank > game.faction[mp.players.at(args[1]).customData.member].rank.length-2) return player.call("alert", "error" , "Вы не можете уволить высокоуполномоченных");
			mp.players.at(args[1]).outputChatBox("<font color='red'>Вас понизил " + game.faction[player.customData.member].rank[player.customData.rank-1] + " " + player.name + "</font>");
			mp.players.forEach(_player => { if(_player.customData.member === 1 || _player.customData.member === 2 || _player.customData.member === 3 || _player.customData.member === 4 || _player.customData.member === 5 || _player.customData.member === 6) _player.outputChatBox("<b><font color='#FF6347'><< " + game.faction[player.customData.member].rank[player.customData.rank-1] + " " + player.name + " понизил(а) " + mp.players.at(args[1]).name +". >></font></b>"); });
			mp.players.at(args[1]).customData.rank = parseInt(args[2]);			
		}
    },	
	"showudost": (player, args) =>
    {
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /showudost [id]"); 
		if(mp.players.at(parseInt(args[1])) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции."); 		
		if(!API.radius(5, mp.players.at(args[1]).position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!"); 
        mp.players.broadcastInRange(player.position, 20, "<font color='#c2a2da'><b>"+player.name + " показал(а) удостоверение " + mp.players.at(args[1]).name +"</b></font>");
		mp.players.at(args[1]).customFunc.setDialog(1, "Удостоверение", "", "", "Закрыть", 2, "Имя: " + player.name + "<br>Организация: " + game.faction[player.customData.member].member + "<br>Звание: " + game.faction[player.customData.member].rank[player.customData.rank-1], "");
    },
	"d": (player, args) =>
    {
		if(player.customData.member !== 1 && player.customData.member !== 2 && player.customData.member !== 3 && player.customData.member !== 4 && player.customData.member !== 5 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не можете выходить в гос.депортамент.");
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(args.length < 2) return player.call("alert", "information" , "Используйте: /d [text]");
		args.shift();
		let text = API.striptags(args.join(" "), "<b><s><u><strong>");
		if(text === "") return player.call("alert", "information" , "Используйте: /d [text]");
        mp.players.forEach(_player => { 
			if(player.customData.admin > 0 || _player.customData.member === 1 || _player.customData.member === 2 || _player.customData.member === 3 || _player.customData.member === 4 || _player.customData.member === 5 || _player.customData.member === 6) { _player.outputChatBox("<b><font color ='#FF8282'>" + "[" + game.faction[player.customData.member].member + "] " + game.faction[player.customData.member].rank[player.customData.rank-1] + " " + player.name + ": " + text + "</font></b>"); }
        });	
	},
	"r": (player, args) =>
    {
		if(player.customData.member !== 1 && player.customData.member !== 2 && player.customData.member !== 3 && player.customData.member !== 4 && player.customData.member !== 5 && player.customData.member !== 6) return player.call("alert", "error" , "У вас нет рации.");
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(args.length < 2) return player.call("alert", "information" , "Используйте: /r [text]"); 
		args.shift();
		let text = API.striptags(args.join(" "), "<b><s><u><strong>");
		if(text === "") return player.call("alert", "information" , "Используйте: /r [text]");
        mp.players.forEach(_player => { 
			if(player.customData.member === _player.customData.member || _player.customData.prowhisper === player.customData.member) { _player.outputChatBox("<font color ='#8D8DFF'>" + "[R] " + game.faction[player.customData.member].rank[player.customData.rank-1] + " " + player.name + ": " + text + "</font>"); }
        });		
	},
	"f": (player, args) =>
    {
		if(player.customData.member !== 7 || player.customData.member !== 8) return player.call("alert", "error" , "У вас нет семьи.");
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(args.length < 2) return player.call("alert", "information" , "Используйте: /f [text]"); 
		args.shift();
		let text = API.striptags(args.join(" "), "<b><s><u><strong>");
		if(text === "") return player.call("alert", "information" , "Используйте: /f [text]");
        mp.players.forEach(_player => { 
			if(player.customData.member === _player.customData.member || _player.customData.prowhisper === _player.customData.member) { _player.outputChatBox("<font color ='#01FCFF'>" + "[F] " + game.faction[player.customData.member].rank[player.customData.rank-1] + " " + player.name + ": " + text + "</font>"); }
        });	
	},
	"m": (player, args) =>
    {
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(args.length < 2) return player.call("alert", "information" , "Используйте: /m [text]");
		if(typeof player.vehicle === "undefined") return player.call("alert", "error" , "Вы не в машине");  
		if(player.vehicle.customData.faction !== player.customData.member) return player.call("alert", "error" , "Вы не в служебной машине"); 
		args.shift();
		let text = API.striptags(args.join(" "), "<b><s><u><strong>");
		if(text === "") return player.call("alert", "information" , "Используйте: /m [text]");
		mp.players.broadcastInRange(player.position, 100, "<font color ='#ffff00'>[" + game.faction[player.customData.member].member + "] " + player.name + " " + text + "</font>");
	},
	"arrest": (player, args) =>
    {
		if(player.customData.member !== 1 && player.customData.member !== 6) return player.call("alert", "error" , "Вы не работаете в полиции.");
		if(args.length < 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /arrest [id]"); 
		if((_player = mp.players.at(parseInt(args[1]))) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(_player === player) return player.call("alert", "error" , "Вы указали свой ID"); 
		if(!API.radius(5, _player.position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!"); 
		if(_player.customData.offense === 0) return player.call("alert", "error" , "Данный человек не находится в розыке");
		if(_player.customData.jail !== 0) return player.call("alert", "error" , "Уже арестован."); 		
		_player.customData.jail = 120 * _player.customData.offense;
		_player.outputChatBox("<font color='red'><b>Вы были арестованы на: " + String(120 * _player.customData.offense) + " секунд. Арестовал: "+ player.name + ".</b></font>");
		mp.players.forEach(__player => { if(__player.customData.member === 1 || __player.customData.member === 6) __player.outputChatBox("<b><font color='#FF6347'><< Офицер " + player.name + "арестовал " + _player.name +". >></font></b>"); });	
		_player.customFunc.setWantedLvl(0);
		_player.customFunc.generate();
	}
};
