var configure = require('./config.js');
var mysql = require('./mysql.js');




module.exports =
{
	playerEnterColshape: (player, shape) =>
		{
			if(configure.othercolshapes[0] == shape) {
					player.position = new mp.Vector3(parseFloat(116.91502380371094),parseFloat(-636.4628295898438),parseFloat(206.04660034179688));
					player.call("alert", "information", "Вы поднялись на один из этажей здания Мэрии!");
					player.dimension = 0;
				} else if(configure.othercolshapes[1] == shape) {
					player.position = new mp.Vector3(parseFloat(115.91376495361328),parseFloat(-639.36474609375),parseFloat(206.04660034179688));
					player.call("alert", "information", "Вы поднялись на один из этажей здания Мэрии!");
					player.dimension = 0;
				} else if(configure.othercolshapes[2] == shape) {
					player.position = new mp.Vector3(parseFloat(237.0175018310547),parseFloat(-407.22747802734375),parseFloat(47.92435836791992));
					player.call("alert", "information", "Вы покинули здание Мэрии!");
					player.dimension = 0;
				}

			if(player.customData.job.id == 4 && player.customData.job.started == 1) {
				for(let i = 0; i < configure.jobs_1_colshapes.length; i++) {
					if(configure.jobs_1_colshapes[i] == shape) {
						if(configure.jobs_1_status[i] == 0) {
							player.playScenario("WORLD_HUMAN_WELDING");
							function stop_job(playerid, verif_name) {
								if(player !== undefined && player.name == verif_name) {
									player.stopAnimation();
									player.call("alert", "information", 'Работа над данным пролетом закончена!');
									player.call("alert", "information", 'К вашей зарплате добавлено: +200$');
									player.customData.job.action = 0;
									configure.jobs_1_markers[i].setColor(59,222,146,255);
									configure.jobs_1_status[i] = 2;
									player.customData.job.salary = player.customData.job.salary + 200;
								} else {
									player.customData.job.action = 0;
									configure.jobs_1_markers[i].setColor(59,222,146,255);
									configure.jobs_1_status[i] = 2;
								}
							}
							setTimeout(stop_job, 15000, player.id, player.name);
							player.customData.job.action = 1;
							player.call("alert", "information", 'Вы приступили к сварке пролета!');
							configure.jobs_1_markers[i].setColor(0, 0, 0, 0);
							configure.jobs_1_status[i] = 1;
						} else if(configure.jobs_1_status[i] == 1) {
							player.call("alert", "error", 'Пролет уже проходит сварку!');
						} else if(configure.jobs_1_status[i] == 2) {
							player.call("alert", "error", 'Этот пролет уже сварен, пройдите к другому!');
						}
					}
				}
			}
			if(configure.jobscolshapes[0] == shape) {
				if (player.customData.job.id != 4) return player.customFunc.setDialog(27, "Служба занятости", "", "Принять", "Отклонить", 1,"Вы желаете устроиться на работу сварщиком?", 4);
				if (player.customData.job.started == 0)
				{	
					let [floor,head, face, more] = player.customData.personage;
					if (floor == 0)
					{
						player.setClothes(3, 1, 0, 0);
						player.setClothes(4, 10, 0, 0);
						player.setClothes(5, 40, 0, 0);
						player.setClothes(6, 35, 0, 0);
						player.setClothes(8, 15, 0, 0);
						player.setClothes(11, 41, 0, 0);
						//player.setProp(1, 24, 0);
					}
					else
					{
						player.setClothes(3, 1, 0, 0);
						player.setClothes(4, 35, 0, 0);
						player.setClothes(5, 44, 0, 0);
						player.setClothes(6, 25, 0, 0);
						player.setClothes(11, 41, 0, 0);
						//player.setProp(1, 28, 0);
						
					}
					player.call("alert", "information", 'Вы приступили к работе');
					player.customData.job.started = 1;

				}
				else
				{
					let [floor,head, face, more] = player.customData.personage;
					player.setHeadBlend(head[0], head[1], 0, head[0], head[1], 0, head[2], head[3], 0);
					let i = 0;
					face.forEach(function(item) { player.setFaceFeature(i, item); i++; });
					for(let s1 = 1; s1 <= 11; s1++) {
						player.setClothes(s1, more[s1] || 0, 0, 0);
					}
					//player.setProp(1, 0, 0);
					player.setHairColor(more[1], more[2]);
					player.eyeColour = more[3];	
					player.call("alert", "information", 'Вы закончили работу');
					player.customData.job.started = 0;
				}
			}

			for(let i = 0; i < configure.loaded_houses_count; i++) {
					if(shape == configure.housescolshapes[i]) {
						let house_info1 = "", house_info2 = "";
						let owner = (configure.housesowner[i] == "NONE") ? "Государство" : configure.housesowner[i];
						house_info1 = `<h1>Владелец дома: ${owner}</h1><h1>Стоимость дома: ${configure.housescoast[i]}$</h1>`;
						if(configure.housestate[i] == 0) {
							if(configure.housesgarage[i] >= 1) {
								house_info2 = `<div class="h_menu" id="h_menu_1">Войти в дом</div> <div class="h_menu" id="h_menu_2">Войти в гараж</div><div class="h_menu" id="h_menu_666">Приобрести дом</div>`;
								player.call("alert", "information", "В доме имеется гараж")
							} else {
								house_info2 = `<div class="h_menu" id="h_menu_1">Войти в дом</div><div class="h_menu" id="h_menu_666">Приобрести дом</div>`;
							}
							player.customFunc.setDialog(60, "["+(configure.housesnumber[i])+"] Владелец: "+owner, "", "Купить", "Отклонить", 1,"Желаете приобрести дом за "+configure.housescoast[i]+"$ ?", i);
						} else if(configure.housestate[i] == 1) {
							if(configure.housesgarage[i] >= 1) {
								house_info2 = `<div class="h_menu" id="h_menu_1">Войти в дом</div> <div class="h_menu" id="h_menu_2">Войти в гараж</div>`;
								player.call("alert", "information", "В доме имеется гараж")
							} else {
								house_info2 = `<div class="h_menu" id="h_menu_1">Войти в дом</div>`;
							}
							player.customFunc.setDialog(61, "["+(configure.housesnumber[i])+"] Владелец: "+owner, "", "Зайти", "Отклонить", 1,"Желаете зайти в дом?", i);
						}
						//player.call("alert", "information", "["+i+"] "+house_info1+" "+house_info2);//player.call('showHouseMenu', [`${i}`, `${house_info1}`, `${house_info2}`]);
					} else if(shape == configure.housesgaragecolshapes[i]) {
								for(let car = 0; car < 7; car++) {
									if(player.customData.person_car[car] == player.vehicle) {
										mysql.connection.query("SELECT * FROM cars WHERE owner = ? WHERE id = ?", [player.name], function(errcars, selectcars) {
											let max_car_pos = JSON.parse(selectcars[car].max_cars_pos);
											player.position = new mp.Vector3(parseFloat(max_car_pos[0].x), parseFloat(max_car_pos[0].y), parseFloat(max_car_pos[0].z));
									});
								}
							}
						}
				}

		},
		playerEnterVehicle: (player, vehicle) => {
			if(player.vehicle && player.seat < 0) {
					if(player.customData.enter_garage >= 0) {
						if(player.vehicle.owner == player.name) {
								mysql.connection.query("SELECT * FROM houses WHERE owner = ?", [player.name], function(err, selecthouse) {
									player.vehicle.position = new mp.Vector3(parseFloat(selecthouse[0].garage_enter_pos_x),parseFloat(selecthouse[0].garage_enter_pos_y),parseFloat(selecthouse[0].garage_enter_pos_z));
									player.customData.enter_limit = 1;
									player.customData.enter_garage = -1;
									player.call("alert", "success", 'Вы покинули гараж!');
									function exitGarage() {
										player.vehicle.dimension = 0;
										player.dimension = 0;
									}
									setTimeout(exitGarage, 1000);
								});
						} else {
						player.call("alert", "error", 'Это не ваша машина!');
					}
				}
			}
		}
}