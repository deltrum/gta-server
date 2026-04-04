"use strict";

module.exports =
{
//---------------------------------------- [ Админ-команды ] ----------------------------------------
	"payday": (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_GENERAL) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] Admin " + player.name + " from PayDay");
		API.payday();
		API.save();
	},		
	"pos": (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		let pos = player.position;
		if(args.length !== 2) {
			player.outputChatBox("X: <b>" + pos.x + "</b>, Y: <b>" + pos.y + "</b>, Z: <b>" + pos.z + "</b>");
		}
		else
		{
			player.outputChatBox("X: <b>" + pos.x + "</b>, Y: <b>" + pos.y + "</b>, Z: <b>" + pos.z + "</b>");
			fs.readFile("pos.log", function (err, contents) {
				fs.open("pos.log", "w+", 0644, function(err, file_handle) {
					var write = player.position.x+", "+player.position.y+", "+player.position.z+" | ";
					if(player.vehicle = undefined)
					{
						let rot = player.vehicle.rotation;
						write += rot.x + ", " + rot.y + ", " + rot.z + " | ";
					}
					else
					{
						write += player.heading + " | ";
					}
					write += args[1];
					fs.write(file_handle, contents + write + "\n", null, "ascii");
				});
			});
		}
	},
	"agivelic": (player, args) =>
    {
		if(player.customData.admin < CONST.ADMIN_HEAD) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /agivelic [id]");
		const _player = mp.players.at(parseInt(args[1]));
		if(_player === null) return player.call("alert", "error" , "Неверный ID игрока");
		_player.customData.item.lic_car = 1;
		_player.customData.item.lic_fly = 1;
		_player.customData.item.lic_water = 1;
	},
	"aungivelic": (player, args) =>
    {
		if(player.customData.admin < CONST.ADMIN_HEAD) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /aungivelic [id]");
		const _player = mp.players.at(parseInt(args[1]));
		if(_player === null) return player.call("alert", "error" , "Неверный ID игрока");
		_player.customData.item.lic_car = undefined;
		_player.customData.item.lic_fly = undefined;
		_player.customData.item.lic_water = undefined;
	},
	"tune": (player, args) =>
    {
		if(player.customData.admin < CONST.ADMIN_HEAD) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if(args.length !== 3 || isNaN(parseInt(args[1])) || isNaN(parseInt(args[2]))) return player.call("alert", "information" , "Используйте: /tune number tun_number");
		if(player.vehicle === undefined) return player.call("alert", "information" , "Нужно быть в авто");
		player.vehicle.setMod(parseInt(args[1]), parseInt(args[2])); 
		
	},
	"console": (player, args) =>
    {
		if(player.customData.admin < CONST.ADMIN_HEAD) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		player.call("setGui", "console");
	},
	"adminbase": (player, args) =>
    {
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		player.position = new mp.Vector3(4.82,526.81,174.62);
	},
	"makeadmin": (player, args) =>
    {
		if(player.customData.admin < CONST.ADMIN_GENERAL) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		const lvl = parseInt(args[2]);
		if(args.length !== 3 || isNaN(parseInt(args[1])) || isNaN(lvl)) return player.call("alert", "information" , "Используйте: /makeadmin [id] [1-4]");
		const _player = mp.players.at(parseInt(args[1]));
		if(_player === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(lvl >= player.customData.admin) return player.call("alert", "error" , "Вы не можете назначить равного или старшего админа");
		console.log(_player);
		_player.customData.admin = lvl;
		_player.call("setAdmin", lvl);
		mp.players.broadcast("<font color='red'><b>" + game.admin[player.customData.admin] + "</font> "+ player.name +"  назначил " + _player.name +" <font color='green'>" + game.admin[lvl] + "</font></b>");
		console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] Admin " + player.name + " makeadmin " + _player.name + "level: " + lvl);	 
	},
	"kick": (player, args) =>
    {
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if(args.length < 3 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /kick [id] [reason]");
		const _player = mp.players.at(parseInt(args[1]));
		if(_player === null) return player.call("alert", "error" , "Неверный ID игрока");
		args.splice(0, 2);
		const text = API.striptags(args.join(" "), "<b><s><u><strong>");
		if(text === "") return player.call("alert", "information" , "Используйте: /kick [id] [reason]");
		if(player === _player) return player.call("alert", "error" , "Вы не можете кикнуть себя");
		if(player.customData.admin <= _player.customData.admin) return player.call("alert", "error" , "Вы не можете кикнуть равного или старшего админа");
		mp.players.broadcast("<font color='red'><b>" + game.admin[player.customData.admin] + "</font> " + player.name +"  <font color='red'>кикнул с сервера " + _player.name +" по причине: </font>" + text + "</b>");
		_player.kick(text);
		console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] Admin " + player.name + " kick " + _player.name + "reason: " + text);	
    },
	"mute": (player, args) =>
    {
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		const sec = parseInt(args[2]);
		if(args.length < 4 || isNaN(parseInt(args[1])) || isNaN(sec)) return player.call("alert", "information" , "Используйте: /mute [id] [sec] [reason]");
		const _player = mp.players.at(parseInt(args[1]));
		if(_player === null) return player.call("alert", "error" , "Неверный ID игрока");
		args.splice(0, 3);
		const text = API.striptags(args.join(" "), "<b><s><u><strong>");
		if(text === "") return player.call("alert", "information" , "Используйте: /mute [id] [sec] [reason]");
		if(player === _player) return player.call("alert", "error" , "Вы не можете кикнуть себя");
		if(_player.customData.mute > 0) {
			mp.players.broadcast("<font color='red'><b>" + game.admin[player.customData.admin] + "</font> " + player.name +"  <font color='red'>снял молчанку c " + _player.name +". По причине: </font>" + text + ".</b>");
			_player.customData.mute = 0;
			console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] Admin " + player.name + " unmute " + _player.name);	
		}
		else
        {
			mp.players.broadcast("<font color='red'><b>Администратор </font>"+player.name +"  <font color='red'>выдал молчанку " + _player.name +". По причине: </font>" + text + ".</b>");	
			_player.customData.mute = sec;
			console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] Admin " + player.name + " mute " + _player.name);	
		}	
    },
	"tppos": (player, args) =>
	{
		const x = parseInt(args[1]), y = parseInt(args[2]), z = parseInt(args[3]);
		if(args.length < 4 || isNaN(x) || isNaN(y) || isNaN(z)) return player.call("alert", "information" , "Используйте: /tppos [x] [y] [z]");
		player.position = { x, y, z };
		player.outputChatBox("<b>Вы телепортировались на <font color='green'>" + x + "</font>, <font color='green'>" + y + "</font>, <font color='green'>" + z + "</font>");
	},
	"g": (player, args) =>
    {
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if(args.length < 2) return player.call("alert", "information" , "Используйте: /g [text]");
		args.shift();
		const text = API.striptags(args.join(" "), "<b><s><u><strong>");
		if(text === "") return player.call("alert", "information" , "Используйте: /g [text]");
        mp.players.broadcast("<font color='ffa500'><b>[" + game.admin[player.customData.admin] + "]</font> " + player.name + ": " + text +"</b>");
    },
	"a": (player, args) =>
    {
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if(args.length < 2) return player.call("alert", "information" , "Используйте: /a [text]");
		args.shift();
		const text = API.striptags(args.join(" "), "<b><s><u><strong>");
		if(text === "") return player.call("alert", "information" , "Используйте: /a [text]");
        mp.players.forEach(p => { if(p.customData.admin !== CONST.ADMIN_PLAYER) p.outputChatBox("<font color='#00a550'><b>[" + game.admin[player.customData.admin] + "] " + player.name + ": " + text +"</b></font>"); });
    },	
	"save" : (player, args) =>
	{
        if(player.customData.admin < CONST.ADMIN_SENIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		API.save();
		player.call("alert", "success" , "Сохранение сервера..");
		console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] Admin " + player.name + " from Save");	 
	},
	"cc" : (player, args) =>
	{
        if(player.customData.admin < CONST.ADMIN_SENIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		mp.players.broadcast("<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>");
		console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] Admin " + player.name + " from CC");	 
	},
	"prowhisper" : (player, args) => // прослушка фракции
	{
        if(player.customData.admin < CONST.ADMIN_ADMIN) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		const faction = parseInt(args[1]);
		if(args.length !== 2 || isNaN(faction)) return player.call("alert", "information" , "Используйте: /prowhisper [faction]");
		if(game.faction[faction] === undefined) return player.call("alert", "error" , "Неверный ID фракции");
		player.customData.prowhisper = faction;
		player.call("alert", "success" , "Вы включили прослушку фракции " + game.faction[faction].member);
	},		
	"pm": (player, args) =>
    {
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if(args.length < 3 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /pm [id] [text]");
		const _player = mp.players.at(parseInt(args[1]));
		if(_player === null) return player.call("alert", "error" , "Неверный ID игрока");
		args.splice(0, 2);
		if(player === _player) return player.call("alert", "error" , "Вы указали свой ID");
		const text = API.striptags(args.join(" "), "<b><s><u><strong>");
		if(text === "") return player.call("alert", "information" , "Используйте: /pm [id] [text]");
		mp.players.forEach(_admin => { if(_admin.customData.admin > 0) _admin.outputChatBox("<font color='#F5DEB3'><b><-Ответ к " + _admin.name + " [" + _admin.id + "] от " + player.name + " [" + player.id + "] : </font>" + text + "</b>"); });
		_player.outputChatBox("<font color='#F5DEB3'><b>Ответ от " + player.name + " [" + player.id + "] : </font>" + text + "</b>");
    },
	"setweather": (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_ADMIN) return player.call("alert", "error" , "У Вас недостаточно полномочий");	
		if(args.length !== 2) return player.call("alert", "information" , "Используйте: /setweather [name]"); 		
		mp.world.weather = args[1];
		console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] Admin " + player.name + " setweather " + args[1]);	 
	},
	"makemem": (player, args) => // уволить игрока
	{
		if(player.customData.admin < CONST.ADMIN_SENIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");	
		const faction = parseInt(args[2]), rank = parseInt(args[3]);
		if(args.length !== 4 || isNaN(parseInt(args[1])) || isNaN(faction) || isNaN(rank)) return player.call("alert", "information" , "Используйте: /makemem [id] [faction] [rank]");
		const _player = mp.players.at(parseInt(args[1]));
		if(_player === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(rank === 0)
		{
			_player.outputChatBox("<font color='red'>Вас уволил администратор " + player.name + "</font>");
			player.outputChatBox("Вы уволили " + _player.name + "из " + game.faction[faction].member);
			_player.customData.member = 0;
			_player.customData.job.id = 0;
			_player.customData.rank = 0;
		}
		else
		{
			if(game.faction[faction] === undefined) return player.call("alert", "error" , "Неверный ID фракции");
			if(game.faction[faction].rank[rank-1] === undefined) return player.call("alert", "error" , "Неверный ID ранга");
			_player.outputChatBox("<font color='red'>Администратор " + player.name +" назначил вас на " + game.faction[faction].rank[rank-1] + " в " + game.faction[faction].member + "</font>");
			player.outputChatBox("Вы назначили " + _player.name + " на " + game.faction[faction].rank[rank-1] + " в " + game.faction[faction].member);			
			_player.customData.member = faction;
			_player.customData.job.id = 0;
			_player.customData.rank = rank;			
		}
		_player.customFunc.generate();
	},
	"makeleader": (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_SENIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");	
		const faction = parseInt(args[2]);
		if(args.length !== 3 || isNaN(parseInt(args[1])) || isNaN(faction)) return player.call("alert", "information" , "Используйте: /makeleader [id] [faction]");
		const _player = mp.players.at(parseInt(args[1]));
		if(_player === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(game.faction[faction] === undefined) return player.call("alert", "error" , "Неверный ID фракции");
		let str;
		if(faction === 0)
		{
			str = "<font color='red'><b>" + game.admin[player.customData.admin] + "</font> " + player.name + " снял(а) лидера " + game.faction[_player.customData.member].member + " " + _player.name +"</b>";
			console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] Admin " + player.name + " unleader " + _player.name + " leader: " + game.faction[_player.customData.member].member);
			_player.customData.rank = 0
			_player.customData.job.id = 0;
			_player.customData.member = 0;
		}
		else
		{
			_player.customData.member = faction;
			str = "<font color='red'><b>" + game.admin[player.customData.admin] + "</font> " + player.name + " назначил(а) лидера " + game.faction[faction].member + " " + _player.name +"</b>";
			_player.customData.rank = game.faction[faction].rank.length;
			_player.customData.job.id = 0;
			console.log("[" + new Date().getHours() + ":" + new Date().getMinutes() + "] Admin " + player.name + " leader " + _player.name + " leader: " + game.faction[_player.customData.member].member);
		}
		mp.players.broadcast(str);
		_player.customFunc.generate();
	},
	"addmoney": (player, args) => 
	{
		if(player.customData.admin < CONST.ADMIN_TECH) return player.call("alert", "error" , "У Вас недостаточно полномочий");	
		const money = parseInt(args[2]);
		if(args.length !== 3 || isNaN(parseInt(args[1])) || isNaN(money)) return player.call("alert", "information" , "Используйте: /addmoney [id] [summ]");
		const _player = mp.players.at(parseInt(args[1]));
		if(_player === null) return player.call("alert", "error" , "Неверный ID игрока");
		const str = "<font color='red'><b>" + game.admin[player.customData.admin] + "</font> " + player.name + " выдал  " + String(money) + "$ " + _player.name +"</b>";
		mp.players.broadcast(str);
		_player.customFunc.setMoney(money);
	},
	"anim": (player, args) => 
	{
		if(player.customData.admin < CONST.ADMIN_HEAD) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if (player.usinganim !== undefined) { player.stopAnimation(); player.usinganim = undefined; }
		const flag = parseInt(args[3]);
		if(isNaN(flag)) return player.call("alert", "information" , "Используйте: /anim [anim_id] [anim_name] [flag]");
		player.playAnimation(args[1], args[2], 1, flag);
		player.usinganim = true;

	},
	"scenario": (player, args) => 
	{
		if(player.customData.admin < CONST.ADMIN_HEAD) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if (player.usinganim !== undefined) { player.stopAnimation(); player.usinganim = undefined; }
		if(args[1] == undefined) return player.call("alert", "information" , "Используйте: /scenario [scenario]"); 	
		player.playScenario(args[1]);
		player.usinganim = true;

	},
	"spawn" : (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");	
		if(args[1] !== undefined)
		{
			const _player = mp.players.at(parseInt(args[1]));
			if(_player === null) return player.call("alert", "error" , "Неверный ID игрока");
			_player.customFunc.generate();
		}
		else
		{
			player.customFunc.generate();
		}
	},
	"hp" : (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if(args[1] !== undefined)
		{
			const _player = mp.players.at(parseInt(args[1]));
			if(_player === null) return player.call("alert", "error" , "Неверный ID игрока");
			_player.health = 100;
			if(_player.vehicle !== undefined) _player.vehicle.repair();
		}
		else
		{
			player.health = 100;
			if(player.vehicle !== undefined) player.vehicle.repair();	
		}	
	},
	"explode" : (player, args) =>
	{ 
		if(player.customData.admin < CONST.ADMIN_GENERAL) return player.call("alert", "error" , "У Вас недостаточно полномочий");	
		if(player.vehicle !== undefined) 
		{
			player.vehicle.explode();
		}
		else
		{
			player.call("alert", "error" , "Нужно быть в авто");	
		}
	},
	"tp": (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /tp [id]");
		const _player = mp.players.at(parseInt(args[1]));
		if(_player === null) return player.call("alert", "error" , "Неверный ID игрока");
		let pos = _player.position;
		pos.z += 1;
		player.position = pos;
		player.dimension = _player.dimension;
		player.call("alert", "success" , "Вы телепортировались к " + _player.name);
	},
	"tpa": (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /tpa [id]");
		const _player = mp.players.at(parseInt(args[1]));
		if(_player === null) return player.call("alert", "error" , "Неверный ID игрока"); 
		let pos = player.position;
		pos.z += 1;
		_player.position = pos;
		_player.dimension = player.dimension;
		player.call("alert", "success" , "Вы телепортировали " + _player.name + " к себе");
		_player.call("alert", "success" , "Вас телепортировал администратор " + player.name + " к себе");
	},		
	"model": (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if(args.length !== 2) return player.call("alert", "information" , "Используйте: /model [name]");
		if(args[1] === "") return player.call("alert", "error" , "Неправильное название модели");
		player.model = mp.joaat(args[1]);
	},
	"weapon": (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if(args.length !== 2) return player.call("alert", "information" , "Используйте: /weapon [weapon_name]");
		if(args[1] === "") return player.call("alert", "error" , "Неправильное название оружия");
		player.giveWeapon(mp.joaat(args[1]), 1000);
	},
	"veh": (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		if(args.length !== 2) return player.call("alert", "information" , "Используйте: /veh [name]");
		if(args[1] === "") return player.call("alert", "error" , "Неправильное название ТС");
		let pos = player.position;
		pos.x += 2.0;
		let veh = mp.vehicles.new(args[1], pos, {
			numberPlate: "TALRASHA",
			dimension: player.dimension
		});
		veh.numberPlate = "TALRASHA";
		player.putIntoVehicle(veh,-1)
	},
	"setclothes": (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		const component_id = parseInt(args[1]), drawable_id = parseInt(args[2]), texture_id = parseInt(args[3]), palette_id = parseInt(args[4]);
		if(args.length < 5 || isNaN(component_id) || isNaN(drawable_id) || isNaN(texture_id) || isNaN(palette_id)) return player.outputChatBox("Use syntax: /setclothes [component_id] [drawable_id] [texture_id] [palette_id]");
		player.setClothes(component_id, drawable_id, texture_id, palette_id);
	},
	"setprop": (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		const prop_id = parseInt(args[1]), drawable_id = parseInt(args[2]), texture_id = parseInt(args[3]);
		if(args.length < 4 || isNaN(prop_id) || isNaN(drawable_id) || isNaN(texture_id)) return player.outputChatBox("Use syntax: /setprop [prop_id] [drawable_id] [texture_id]");
		player.setProp(prop_id, drawable_id, texture_id);
	},	
	"ahelp" : (player,args) =>
	{
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		player.customFunc.setDialog(1, "Admin Help", "", "", "Закрыть" , 2, "/vehc<br/>/payday<br/>/pos<br/>/makeadmin<br/>/kick<br/>/mute<br/>/tppos<br/>/g<br/>/a<br/>/save<br/>/prowhisper<br/>/pm<br/>/makemem<br/>/makeleader<br/>/spawn<br/>/hp<br/>/tpa<br/>/model<br/>/weapon<br/>/veh<br/>/setclothes<br/>/setprop<br/>/ahelp<br/>/cstore", "");
	},
	"cstore" : (player,args) =>
	{
		if(player.customData.admin < CONST.ADMIN_HEAD) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		let pos = player.position;
		pool.getConnection(function(err, connection) {
			connection.query("INSERT INTO store (materials, position) VALUES (?,?)", [50000, String(JSON.stringify(pos))], function (error, rows, fields) {  
				if(error) throw console.log(error);
				let marker = mp.markers.new(2, pos, 1, {
					//color: [0, 150, 136, 255],
					visible: true,
					dimension: 0
				});
				marker.setColor(0, 150, 136, 255);
				let colshape = mp.colshapes.newCircle(pos.x, pos.y, 1);
				global.game.dataDraw.push(["Магазин", 0, [255,255,255,255] , [pos.x,pos.y,pos.z-1] ])
				colshape.customData.store = 5000;
				mp.blips.new(93, new mp.Vector3(pos.x, pos.y, pos.z), {
					name: "Магазин",
					shortRange: true,
					color: 3,
					dimension: 0,
				});
				player.call("alert", "success", "Магазин успешно создан. Перезагрузите сервер!");
			});
			connection.release();
		});
	},
	"vehc" : (player, args) =>
	{
		if(player.customData.admin < CONST.ADMIN_JUNIOR) return player.call("alert", "error" , "У Вас недостаточно полномочий");
		const r1 = parseInt(args[1]), g1 = parseInt(args[2]), b1 = parseInt(args[3]), r2 = parseInt(args[4]), g2 = parseInt(args[5]), b2 = parseInt(args[6]);
		if(args.length !== 7 || isNaN(r1) || isNaN(g1) || isNaN(b1) || isNaN(r2) || isNaN(g2) || isNaN(b2)) return player.call("alert", "information" , "Используйте: /vehc [R1] [G1] [B1] [R2] [G2] [B2]"); 		
		if(player.vehicle === undefined) return player.call("alert", "error" , "Вы не в машине");
		player.vehicle.setColorRGB(r1, g1, b1, r2, g2, b2); 
		player.call("alert", "success" , "Вы изменили цвет автомобиля");
	}	
}

