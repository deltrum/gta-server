var configure = require('../systems/config.js');
var mysql = require('../systems/mysql.js');

module.exports =
{
//---------------------------------------- [ RP-команды ] ----------------------------------------
	"admins" : (player,args) =>
	{
		let i = 0;
		let  str = "";
		mp.players.forEach(_player => 
		{
			if(_player.customData.admin > 1) 
			{
				i++;
				str += "<p>" + game.admin[_player.customData.admin] + " " + _player.name + "</p>";
			}
		});
		if(i === 0) str += "<p>список пуст</p>";
		player.customFunc.setDialog(1, "Admins",  "", "", "Закрыть", 1, str, "");
	},
	"s": (player, args) =>
    {
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(args.length < 2) return player.call("alert", "information" , "Используйте: /s [text]"); 
		args.shift();
		if((text = API.striptags(args.join(" "), "<b><s><u><strong>")) === "") return player.call("alert", "information" , "Используйте: /s [text]");
		if(player.customFunc.testFloodText(text)) return;
		mp.players.broadcastInRange(player.position, 50, player.name + "<font color='grey'><b> кричит:</b> " + text +"</font>");
		
	},
	"me": (player, args) =>
    {
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(args.length < 2) return player.call("alert", "information" , "Используйте: /me [text]"); 
		args.shift();
		if((text = API.striptags(args.join(" "), "<b><s><u><strong>")) === "") return player.call("alert", "information" , "Используйте: /me [text]");
		if(player.customFunc.testFloodText(text)) return;
		mp.players.broadcastInRange(player.position, 20, "<font color='#c2a2da'><b>"+player.name +" " + text +"</b></font>");
    },
	"do": (player, args) =>
    {
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(args.length < 2) return player.call("alert", "information" , "Используйте: /do [text]"); 
		args.shift();
		if((text = API.striptags(args.join(" "), "<b><s><u><strong>")) === "") return player.call("alert", "information" , "Используйте: /do [text]");
		if(player.customFunc.testFloodText(text)) return;
		mp.players.broadcastInRange(player.position, 20, "<font color='#DD90FF'><b> " + text +"</font> ("+player.name + ")</b>");
	},
	"try": (player, args) =>
    {
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(args.length < 2) return player.call("alert", "information" , "Используйте: /try [text]"); 
		args.shift();
		if((text = API.striptags(args.join(" "), "<b><s><u><strong>")) === "") return player.call("alert", "information" , "Используйте: /try [text]");
		if(player.customFunc.testFloodText(text)) return;
		let str = "<font color='#DD90FF'><b>"+player.name +"  пытается " + text +"</font> |</b> ";
		if(Math.floor(Math.random() * 2 + 1) === 1) {
			str = str + "<b><font color='red'>Неудачно</font></b>";
		}
		else
		{
			str = str + "<b><font color='green'>Удачно</font></b>";
		}
		mp.players.broadcastInRange(player.position, 20, str);
	},
	"w": (player, args) =>
    {
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(args.length < 2) return player.call("alert", "information" , "Используйте: /w [text]"); 
		args.shift();
		if((text = API.striptags(args.join(" "), "<b><s><u><strong>")) === "") return player.call("alert", "information" , "Используйте: /w [text]");
		if(player.customFunc.testFloodText(text)) return;
		mp.players.broadcastInRange(player.position, 3, player.name + "<font color='grey'><b> шепчет:</b> " + text +"</font>");
	},	
	"b": (player, args) =>
    {
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		if(args.length < 2) return player.call("alert", "information" , "Используйте: /b [text]"); 
		args.shift();
		if((text = API.striptags(args.join(" "), "<b><s><u><strong>")) === "") return player.call("alert", "information" , "Используйте: /b [text]");
		if(player.customFunc.testFloodText(text)) return;
		mp.players.broadcastInRange(player.position, 20, player.name + ": (( " + text +" ))");
	},
	"time" : (player) => 
	{
		let month = ["января","февраля","марта","апреля", "мая","июня","июля","августа","сентября","октября","ноября","декабря"];
		const time = "<font color='#c2a2da'><b>"+ player.name +" взглянул(а) на часы</b></font>";
		mp.players.broadcastInRange(player.position, 20, time);
		let str = "<b><font color='green'><b>Дата: </font>" +  new Date().getDate() + " " + month[new Date().getMonth()] + " | <font color='green'><b>Время: </font>" + new Date().getHours() + ":" + new Date().getMinutes();
		if(player.customData.jail !== 0) str += "<br>" + "Вас отпустят через: " + String(API.timeFormat(player.customData.jail)) + " секунд."; 
		player.outputChatBox(str);
		
	},
	"hi" : (player, args) => 
	{
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /hi [id]");
 		if((_player = mp.players.at(parseInt(args[1]))) === null) return player.call("alert", "error" , "Неверный ID игрока");
		if(_player === player) return player.call("alert", "error" , "Вы не можете пожать руку себе");
		if(!API.radius(5, _player.position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!"); 		
        mp.players.broadcastInRange(player.position, 20, "<font color='#c2a2da'><b>"+player.name +" пожал(а) руку " + _player.name + "</b></font>");	
	},
	"id" : (player, args) => 
	{
		if(args.length !== 2) return player.call("alert", "information" , "Используйте: /id [name]");
		if(args[1].length < 3) return player.call("alert", "error" , "Длина строки должна привышать 3 символов");
		let str = "";
		let i = 0;
		mp.players.forEach(_player => {
			if(_player.name.toLowerCase().indexOf(args[1].toLowerCase()) >= 0) 
			{
				str += "Имя: " + _player.name + " Id: " + _player.id + "<br>";
				i++;
			}
		});
		if(i === 0) return player.call("alert", "error" , "Ничего не найдено!");
		player.outputChatBox(str);
	},
	"pay" : (player,args) =>
	{
		if(args.length !== 3 || isNaN(parseInt(args[1])) || isNaN(money = parseInt(args[2]))) return player.call("alert", "information" , "Используйте: /pay [id] [money]");
 		if((_player = mp.players.at(parseInt(args[1]))) === null) return player.call("alert", "error" , "Неверный ID игрока");	
		if(!API.radius(5, _player.position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!"); 		
        if(_player === player) return  player.call("alert", "error" , "Вы не можете перевести деньги себе");
		if(money < 0) return player.call("alert", "error" , "Некорректная сумма");
		if(player.customFunc.setMoney(-money)) return player.call("alert", "error" , "У вас недостаточно наличных");
		_player.customFunc.setMoney(money);
		mp.players.broadcastInRange(player.position, 20, "<font color='#c2a2da'><b>"+player.name +" передал(а) деньги " + _player.name + "</b></font>");
		_player.call("alert", "success" , "Вам передали $" + money);
	},
	"ad" : (player, args) =>
	{
		if(player.customData.mute > 0) return player.call("alert", "warning" , "У вас молчанка! Осталось: " + player.customData.mute + " сек.");
		player.customFunc.setDialog(23, "Отправить объявление", "Текст", "Отправить", "Закрыть", -1, "", "");
	},
	"showpass": (player, args) =>
    {
		if(args.length !== 2 || isNaN(parseInt(args[1]))) return player.call("alert", "information" , "Используйте: /showpass [id]");
		if((_player = mp.players.at(parseInt(args[1]))) === null) return player.call("alert", "error" , "Неверный ID игрока");	
		if(!API.radius(5, _player.position, player.position)) return player.call("alert", "error" , "Вы слишком далеко!"); 
		const str = "<font color='#c2a2da'><b>"+player.name +" показал(а) паспорт " + _player.name +"</b></font>";
        mp.players.broadcastInRange(player.position, 20, str);
		_player.customFunc.setDialog(1, "Паспорт",  "", "", "Закрыть", 1, player.name + "<br>Организация: " + game.faction[player.customData.member].member + "<br>Должность: " + (game.faction[player.customData.member] != 0 && game.faction[player.customData.member].rank[player.customData.rank-1] || "Отсутствует") + "<br>Работа: " + game.jobs[player.customData.job.id].name + "<br>Уровень розыска: " + player.customData.offense + "<br>Убийств: " + player.customData.kills + "<br>Смертей: " + player.customData.deaths, "");
    },
    "exit": (player, args) =>
    {
		  if(player.customData.enter_house >= 0) {
		    mysql.connection.query('SELECT * FROM houses WHERE id = ?', [player.customData.enter_house], function (error, results, fields) {
		      player.position = new mp.Vector3(parseFloat(results[0].pos_x),parseFloat(results[0].pos_y),parseFloat(results[0].pos_z));
		      player.call("alert", "information", 'Вы покинули дом #'+player.customData.enter_house);
		      player.dimension = 0;
		      player.customData.enter_limit = 1;
		      player.customData.enter_house = -1;
		      
		    });
		  } else if(player.customData.enter_garage >= 0) {
		    mysql.connection.query('SELECT * FROM houses WHERE id = ?', [player.customData.enter_garage], function (error, results, fields) {
		      player.position = new mp.Vector3(parseFloat(results[0].pos_x),parseFloat(results[0].pos_y),parseFloat(results[0].pos_z));
		      player.dimension = 0;
		      player.customData.enter_limit = 1;
		      player.customData.enter_garage = -1;
		      player.call("alert", "information", 'Вы покинули гараж!');
		    });
		  } else {
		    player.call("alert", "error", 'Вы не находитесь в каком-либо доме!');
		  }
    },
    "fixcars": (player, args) =>
    {
		  mysql.connection.query("SELECT * FROM houses WHERE owner = ?", [player.name], function(err1, results1) {
		    if(results1[0]) {
		      mysql.connection.query("SELECT * FROM cars WHERE person = ?", [player.name], function(err2, results2) {
		        if(results2) {
		          let max_car_pos = JSON.parse(results1[0].max_cars_pos);
		          let get_results2_count = results2.length;
		          if(max_car_pos[0].x != "NONE") {
		            if(results1[0].garage != 0) {
		              for(let i = 0; i < get_results2_count; i++) {
		                if(player.customData.person_summon_cars == 0) {
		                  player.customData.person_car[i] = mp.vehicles.new(mp.joaat(results2[i].car_name), new mp.Vector3(parseFloat(max_car_pos[i].x), parseFloat(max_car_pos[i].y), parseFloat(max_car_pos[i].z)),
		                  {
		                      heading: max_car_pos[i].r,
		                      alpha: 255,
		                      locked: false,
		                      engine: false,
		                      dimension: 10000 + results1[0].id
		                  });
		                  player.customData.person_car[i].setColorRGB(results2[i].car_color_r, results2[i].car_color_g, results2[i].car_color_b, results2[i].car_color_r, results2[i].car_color_g, results2[i].car_color_b);
		                  player.customData.person_car[i].numberPlate = "SUMMER";
		                  player.customData.person_car[i].owner = player.name;
		                } else {
		                  if(player.customData.person_car[i]) {
		                    player.customData.person_car[i].destroy();
		                  }
		                }
		              }
		            } else {
		              player.customData.person_car[0] = mp.vehicles.new(mp.joaat(results2[0].car_name), new mp.Vector3(parseFloat(max_car_pos[0].x), parseFloat(max_car_pos[0].y), parseFloat(max_car_pos[0].z)),
		              {
		                  heading: max_car_pos[0].r,
		                  alpha: 255,
		                  locked: false,
		                  engine: false,
		                  dimension: 0
		              });
		              player.customData.person_car[0].setColorRGB(results2[0].car_color_r, results2[0].car_color_g, results2[0].car_color_b, results2[0].car_color_r, results2[0].car_color_g, results2[0].car_color_b);
		              player.customData.person_car[0].numberPlate = "SUMMER";
		              player.customData.person_car[0].owner = player.name;
		            }
		            if(player.customData.person_summon_cars == 0) {
		              player.customData.person_summon_cars = 1;
		              player.call("alert", "success", `Автомобили заспавнены!`);
		            } else {
		              player.customData.person_summon_cars = 0;
		              player.call("alert", "information", `Автомобили были все удалены, напишите еще раз команду!`);
		            }
		          } else {
		            player.call("alert", "error", 'У данного дома отсутствует позиция Spawn. Свяжитесь с разработчиком.');
		          }
		        } else {
		          player.call("alert", "error", 'У вас нет ни одной машины!');
		        }
		      });
		    } else {
		      player.call("alert", "error", 'Вы не имеете своего дома!');
		    }
		  })
	},
	 "addhouse": (player, args) =>
	 {
	 	if(player.customData.admin < 6) return player.call("alert", "error" , "У Вас недостаточно полномочий");
	 	if (isNaN(parseInt(rare = args[1])) || isNaN(parseInt(coast = args[2])) || isNaN(interior = parseInt(args[3])) || isNaN(parseInt(garage = args[4])) || isNaN(max_cars = parseInt(args[5]))) return player.call("alert", "error" , "Используйте: /addhouse [rare] [coast] [interior] [garage] [max_cars]"); 
	      if(parseInt(rare) >= 0 && parseInt(coast) >= 0 && parseInt(interior) >= 0 && parseInt(garage) >= 0 && max_cars >= 1) {
	        let get_id = 0;
	        let get_count = 0;
	        mysql.connection.query('SELECT COUNT(*) AS count FROM houses', [], function (error, results, fields) {
	          get_count = results[0].count;
	          let array_max_cars = new Array(parseInt(max_cars));
	          let array_gen = {x: 'NONE', y: 'NONE', z: 'NONE'};
	          for(let i = 0; i < max_cars; i++) {
	            array_max_cars[i] = array_gen;
	          }
	          let max_cars_pos = JSON.stringify(array_max_cars);
	          var query = mysql.connection.query('INSERT INTO houses SET pos_x = ?, pos_y = ?, pos_z = ?, pos_heading = ?, rare = ?, coast = ?, interior = ?, garage = ?, garage_enter_pos_x = ?, garage_enter_pos_y = ?, garage_enter_pos_z = ?, garage_enter_pos_r = ?, max_cars_count = ?, max_cars_pos = ?', [player.position.x, player.position.y, player.position.z, player.heading, rare, coast, interior, garage, 0, 0, 0, 0, max_cars, max_cars_pos], function (error, results, fields) {
	            console.log(error);
	          });
	          configure.housesblips[get_count] = mp.blips.new(40, new mp.Vector3(parseFloat(player.position.x), parseFloat(player.position.y), parseFloat(player.position.z)),
	          {
	              name: "Дом",
	              scale: 1,
	              color: 2,
	              drawDistance: 100,
	              shortRange: 100,
	              rotation: 0,
	              dimension: 0,
	          });
	          configure.housesmarkers[get_count] = mp.markers.new(0, new mp.Vector3(parseFloat(player.position.x), parseFloat(player.position.y), parseFloat(player.position.z)), 1,
	          {
	              direction: new mp.Vector3(0,0,0),
	              rotation: new mp.Vector3(0,0,0),
	              visible: true,
	              dimension: 0
	          });
	          configure.housesmarkers[get_count].setColor(255, 247, 0, 255);
	          configure.housescolshapes[get_count] = mp.colshapes.newRectangle(player.position.x, player.position.y, 1, 1);
	          configure.housesnumber[get_count] = get_count;
	          configure.housestate[get_count] = 0;
	          configure.housesrare[get_count] = parseInt(rare);
	          configure.housesowner[get_count] = "NONE";
	          configure.housescoast[get_count] = parseInt(coast);
	          configure.housesinterior[get_count] = parseInt(interior);
	          configure.housesgarage[get_count] = parseInt(garage);
	          player.call("alert", "success", "Дом установлен!");
	          if(parseInt(garage) >= 1) {
	             player.call("alert", "information", "Для установки точки выезда/въезда в гараж используйте: /setgarage");
	          }
	          //logger.write("[" + namepos + "]: " + "X: " + get_pos.x + "; Y: " + get_pos.y + "; Z: " + get_pos.z + ";");
	        });
	      } else {
	        player.call("alert", "error", "Для установки дома, необходимо выбрать следующее параметры:");
	        player.call("alert", "error", "Классы домов: 0 [H], 1 [M], 2 [R], 3 [A]");
	        player.call("alert", "information", "[/addhouse]: [rare] [coast] [interior] [garage] [max_cars]");
	      }
	 },
	 "house": (player, args) =>
	 {
	 if(player.customData.admin < 6) return player.call("alert", "error" , "У Вас недостаточно полномочий");
	 if(args.length !== 2 || isNaN(parseInt(houseid = args[1]))) return player.call("alert", "error", "Используйте: /house [number]"); 
      if (parseFloat(houseid)) {
        mysql.connection.query('SELECT * FROM houses WHERE id = ?', [houseid], function (error, results, fields) {
          if(results[0]) {
            player.position = new mp.Vector3(parseFloat(results[0].pos_x),parseFloat(results[0].pos_y),parseFloat(results[0].pos_z));
          } else {
            player.call("alert", "error", 'Ошибка! Выбранный вами дом, не найден!');
          }
        });
      } else {
        player.call("alert", "error", "Используйте: /house [number]"); 
      }
    },
    "setgarage": (player, args) =>
    {
    	if(player.customData.admin < 6) return player.call("alert", "error" , "У Вас недостаточно полномочий");
    	if(args.length !== 2 || isNaN(parseInt(house = args[1]))) return player.call("alert", "error", "Используйте: /setgarage [number]"); 
        let get_house;
        mysql.connection.query('SELECT * FROM houses WHERE id = ?', [house], function (error, results, fields) {
          get_house = results[0];
          if(get_house) {
            var query = mysql.connection.query('UPDATE `houses` SET garage_enter_pos_x = ?, garage_enter_pos_y = ?, garage_enter_pos_z = ?, garage_enter_pos_r = ? WHERE id = ?', [player.position.x, player.position.y, player.position.z, player.heading, house], function (error, results, fields) {
            });
            player.call("alert", "success", `Позиция гаража въезда/выезда для дома #`+house+` установлена!`);
          } else {
            player.call("alert", "error", `Дом не найден в базе данных!`);
          }
        });
    }
};