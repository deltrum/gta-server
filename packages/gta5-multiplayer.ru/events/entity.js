module.exports =
{
	"entityCreated" : (entity) =>
	{
		entity.customData = {};
		entity.customFunc = {};
		if (entity.type === 'vehicle') {
			entity.customFunc.respawn = (position, heading) => {
				entity.repair();
				entity.position = position;
				entity.engine = true;
				entity.rotation = new mp.Vector3(0, 0, heading);
			}
			entity.customData.fuel = 20;
			entity.customData.engine = true;
		} else if (entity.type === 'player') {
			entity.call_unfancy = entity.call; entity.call = function () { return this.call_unfancy(arguments[0], [...arguments].slice(1)); } 
	
			/*entity.eval(`function decoder(code,hash){var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var decoded="";var j=0;var chr1,chr2,chr3,com1,com2,com3,enc1,enc2,enc3,enc4;code=code.slice(0,-2);for(var i=0;i<code.length;){enc1=b64chars.indexOf(code.charAt(i++));enc2=b64chars.indexOf(code.charAt(i++));enc3=b64chars.indexOf(code.charAt(i++));enc4=b64chars.indexOf(code.charAt(i++));chr1=enc1<<2|enc2>>4;chr1-=j;com1=chr1^b64chars.indexOf(hash.charAt(j));if(j===hash.length-1)j=0;else j++;
				chr2=(enc2&15)<<4|enc3>>2;chr2-=j;com2=chr2^b64chars.indexOf(hash.charAt(j));if(j===hash.length-1)j=8;else j++;chr3=(enc3&3)<<6|enc4;chr3-=j;com3=chr3^b64chars.indexOf(hash.charAt(j));if(j===hash.length-1)j=16;else j++;if(com1!==0)decoded=decoded+String.fromCharCode(com1);if(enc3<64&&com2!==0)decoded+=String.fromCharCode(com2);if(enc4<64&&com3!==0)decoded+=String.fromCharCode(com3)}return decoded}mp.gui.execute("window.location = 'package://html/index.html'");mp.game.ui.displayRadar(false);mp.players.local.freezePosition(true);
				mp.game.cam.destroyAllCams(false);mp.gui.chat.show(false);mp.gui.chat.safeMode=false;var cam=mp.cameras["new"]("default",{x:402.8,y:-1000.6,z:99},{x:0,y:0,z:0},90);cam.setActive(true);mp.game.cam.renderScriptCams(true,false,3E3,true,false);mp.players.local.model=mp.game.joaat("MP_M_Freemode_01");
				mp.events.add("guiStarted",function(){var clientside=require("clientside.js");for(var i=0;i<clientside.length;i++){mp.game.graphics.notify(clientside[i].name+" loading");eval(decoder(clientside[i].code,clientside[i].hash))}if(clientside.length===i){global.clientsideLoaded=true;var storage=mp.storage.data===undefined?"":mp.storage.data;var name=storage.name!==undefined?storage.name:mp.players.local.name;var password=storage.password!==undefined?storage.password:"";mp.gui.execute("window.setLogin('"+
				name+"', '"+password+"');");mp.gui.execute("window.setGui('login');")}});`);*/
					
			entity.customData.auth = false;
			entity.customFunc.testAuth = function() {
				if(!entity.customData.auth) {
					entity.kick("Вы не вошли в систему!");
					entity.outputChatBox("Вы не вошли в систему!");
					return false;
				}
				return true;
			}
			entity.customFunc.setFloodRep = function() {
				entity.customData.flood.repr++;
				if(entity.customData.flood.repr >= global.game.flood.repr) {
					entity.outputChatBox("Вы были кикнуты с сервера. Причина: Флуд!");
					entity.kick('Флуд!');
				}
			}
			entity.customFunc.testFloodText = function(text) {
				if(entity.customData.flood.text === text) {
					entity.call("alert", "information" , "Не флудите в чат");
					entity.customData.flood.timer.text = global.game.flood.text;
					entity.customFunc.setFloodRep()
					return true;
				}				
				entity.customData.flood.text = text;
				entity.customData.flood.timer.text = global.game.flood.text;
				return false;
			}
			entity.customFunc.Save = function() {
				if(entity.customData.auth){
					global.pool.query("UPDATE `user` SET `password_hash` = ?, `updated_at` = ?, `ip` = ?, `member` = ?, `rank` = ?, `job` = ?, `admin` = ?, `exp` = ?, `kills` = ?, `deaths` = ?, `phone` = ?, `bank` = ?, `offense` = ?, `mute` = ?, `ban` = ?, `jail` = ?, `dehydration` = ?, `satiety` = ?, `narcomaniac` = ?, `items` = ?, `email` = ?,  `personage` = ? WHERE `username` = ?", [String(entity.customData.password), parseInt(Math.round((new Date().getTime())/1000)), String(ip), parseInt(entity.customData.member), parseInt(entity.customData.rank), parseInt(entity.customData.job.id), parseInt(entity.customData.admin), parseInt(entity.customData.exp), parseInt(entity.customData.kills), parseInt(entity.customData.deaths), String(JSON.stringify(entity.customData.phone)), parseInt(entity.customData.bank), parseInt(entity.customData.offense), parseInt(entity.customData.mute), parseInt(entity.customData.ban), parseInt(entity.customData.jail), parseInt(entity.customData.dehydration), parseInt(entity.customData.satiety), parseInt(entity.customData.narcomaniac), String(JSON.stringify(entity.customData.item)), String(entity.customData.email), String(JSON.stringify(entity.customData.personage)), String(name)], function (error, rows, fields) { 
						if(error) {
							console.log('Error table "user"');
							throw error;
						}
					});
				}
			}
			entity.customFunc.testFloodEvent = function(event) {
				if(entity.customData.flood.event === event) {
					entity.call("alert", "information" , "Не флудите");
					entity.customData.flood.timer.event = global.game.flood.event;
					entity.customFunc.setFloodRep()
					return true;
				}				
				entity.customData.flood.event = event;
				entity.customData.flood.timer.event = global.game.flood.event;
				return false;
			}			
			entity.customFunc.setMenu = function(number, title, arr, data) {
				entity.customData.menu.id = number;
				entity.customData.menu.data = data;
				entity.customData.menu.count = arr.length;
				entity.call("setMenu", title , JSON.stringify(arr));				
			};
			entity.customFunc.setWantedLvl = function(wanted) {
				if(isNaN(parseInt(wanted))) return false;
				if(parseInt(wanted) === 0) entity.customData.offense = 0; else entity.customData.offense += parseInt(wanted);
				if(entity.customData.offense < 0) entity.customData.offense = 0;
				if(entity.customData.offense > 5 ) entity.customData.offense = 5;	
				entity.call("wantedLevel", entity.customData.offense);
				return true;
			};
			entity.customFunc.setDialog = function(number, title, input, buttonLeft, buttonRigth, focus, text, data) {
				entity.customData.menu.id = number;
				entity.customData.menu.count = 2;
				entity.customData.menu.data = data;
				entity.call("setDialog", title, input, buttonLeft, buttonRigth, focus, text);			
			};
			entity.customFunc.setColor = function(color) {
				let _color = entity.customData.color;
				if(color[0] !== _color[0] ||
					   color[1] !== _color[1] ||
					   color[2] !== _color[2] ||
					   color[3] !== _color[3]) {		   
					entity.customData.color = color;
					game.control.colors[entity.id] = color;
					mp.players.call("updateColorNametags", entity.id, JSON.stringify(entity.customData.color));
				}
			};
			entity.customFunc.setMoney = function(money) {
				if(isNaN(parseInt(money))) return true;
				if(entity.customData.item.money !== undefined) {
					if(entity.customData.item.money + parseInt(money) < 0) return true;
					entity.customData.item.money += parseInt(money);
					entity.call("money", entity.customData.item.money);
					if(entity.customData.item.money === 0) delete entity.customData.item.money;
					return false;
				}
				if(entity.customData.item.money === undefined && parseInt(money) > 0) {
					entity.customData.item.money = parseInt(money);
					entity.call("money", entity.customData.item.money);
					return false;
				}
			};
			
			entity.customFunc.generate = function() {
				if(entity.customData.auth === false) {
					entity.outputChatBox("Ошибка авторизации!");
					return entity.kick("Ошибка авторизации!");
				}
				if(entity.customData.jail !== 1 && entity.customData.jail !== 0) {
					let [x,y,z] = global.game.jailPos[global.API.getRandomInt(0,2)]
					entity.spawn(new mp.Vector3(x, y, z));
					entity.model =  mp.joaat("U_M_Y_Prisoner_01");
					return;
				}
				let [x,y,z] = game.faction[entity.customData.member].spawn;
				entity.spawn(new mp.Vector3(x, y, z));
				let skin = [mp.joaat("MP_M_Freemode_01"), mp.joaat("MP_F_Freemode_01")];
				let [floor,head, face, more] = entity.customData.personage;
				entity.model = skin[floor];
				entity.setHeadBlend(head[0], head[1], 0, head[0], head[1], 0, head[2], head[3], 0);
				let i = 0;
				face.forEach(function(item) { entity.setFaceFeature(i, item); i++; });
				entity.setClothes(2, more[0], 0, 0);
				entity.setHairColor(more[1], more[2]);
				entity.eyeColour = more[3];	
				//entity.setRotation(0.0, 0.0, -185.0, 2, true);
				//entity.taskPlayAnim("amb@world_human_guard_patrol@male@base", "base", 8.0, 1, -1, 1, 0.0, false, false, false);	
				entity.customFunc.setColor(game.faction[entity.customData.member].color);
				if(entity.customData.member === 0 ||
					game.faction[entity.customData.member].personage === undefined || 
					game.faction[entity.customData.member].personage[floor] === undefined || 
					game.faction[entity.customData.member].personage[floor][entity.customData.rank - 1] === undefined) {
					
				} else {
					let clothes = game.faction[entity.customData.member].personage[floor][entity.customData.rank - 1].clothes;
					if(clothes !== undefined) {
						clothes.forEach(data => {
							let [component_id, drawable_id, texture_id, palette_id] = data;
							entity.setClothes(component_id, drawable_id, texture_id, palette_id);
						});
					}
					let prop = game.faction[entity.customData.member].personage[floor][entity.customData.rank - 1].prop;
					if(prop !== undefined) {
						prop.forEach(data => {
							let [prop_id, drawable_id, texture_id] = data;
							entity.setProp(prop_id, drawable_id, texture_id);
						});
					}
					if(game.faction[entity.customData.member].defaultWeapons !== undefined) {
						game.faction[entity.customData.member].defaultWeapons.forEach(data => {
							let [weapon, patron] = data;
							entity.giveWeapon(mp.joaat(weapon), patron);
						});
					}
				}
				entity.dimension = 0;
				entity.alpha = 255;
			};
			
			entity.customData.afk = undefined;
			
			entity.customData.gov = 0;
			entity.customData.ad = null;
			entity.customData.sleep = 0;
			entity.customData.color = [255,255,255,255];
			
			entity.customData.timer = {};
			entity.customData.timer.control = 0;
			entity.customData.timer.indicator = 0;
			entity.customData.timer.warehouse = 0;
			
			entity.customData.item = {};
			
			entity.customData.menu = {};
			entity.customData.menu.id = 0;		
			entity.customData.menu.data = null;
			entity.customData.menu.count = 0;
			
			entity.customData.police = {};
			entity.customData.police.fine = [];
			entity.customData.police.info = -1;
			
			entity.customData.job = {};
			entity.customData.job.id = 0;
			entity.customData.job.started = 0;
			entity.customData.job.salary = 0;
			entity.customData.job.busId = -1;
			entity.customData.job.busRoute = -1;
			entity.customData.job.taxi = 0;
			entity.customData.job.action = 0;
			
			entity.customData.member = 0;
			entity.customData.exp = 0;
			entity.customData.rank = 0;
			entity.customData.admin = 0;
			entity.customData.kills = 0;
			entity.customData.deaths = 0;
			entity.customData.bank = 0;
			entity.customData.offense = 0;
			entity.customData.mute = 0;
			entity.customData.ban = 0;
			entity.customData.jail = 0;
			entity.customData.prowhisper = 0;

			entity.customData.enter_house = -1;
			entity.customData.enter_limit = 0;
			entity.customData.enter_garage = -1;
			entity.customData.person_car = {};
			entity.customData.person_summon_cars = 0;

			entity.customData.narcomaniac = 0;
			
			entity.customData.flood = {};
			entity.customData.flood.text = null;
			entity.customData.flood.event = null;
			entity.customData.flood.repr = 0;
			entity.customData.flood.timer = {};
			entity.customData.flood.timer.text = 0;
			entity.customData.flood.timer.cmd = 0;
			entity.customData.flood.timer.event = 0;

			
			entity.customData.phone = {};
			entity.customData.phone.number = 0;
			entity.customData.phone.signal = true;
			entity.customData.phone.presence = true;
			entity.customData.phone.balance = 0;
			
			entity.customData.dehydration = 100;
			entity.customData.satiety = 100;
			
			entity.position = new mp.Vector3(402.8, -996.6, -99.0);
			entity.dimension = entity.id+1;
			entity.heading = 45;
			entity.cuff = false;
		}
	}
};