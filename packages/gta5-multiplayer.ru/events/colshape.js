module.exports =
{
	"playerEnterColshape" : (player, colshape) =>
	{	
		if (!colshape.customData) return;
		if(colshape.customData.atm !== undefined) {
			player.call("setGui", "atm");
			player.call("atmBalance", player.customData.bank);
		} else if(colshape.customData.store !== undefined) {
			player.call("setGui", "shop");
		} else if(colshape.customData.weaponstore !== undefined) { 
			player.call("setGui", "weaponshop");
		} else if(colshape.customData.weaponsPoint !== undefined && colshape.customData.weaponsPoint === player.customData.member) {
			if(player.customData.timer.warehouse !== 0)  return player.call("alert", "warning" , "Нельзя так часто брать боеприпасы!");  
			if(game.faction[player.customData.member].warehouse < 200) return player.call("alert", "error" , "На складе недостаточно метериалов"); 
			if(game.faction[player.customData.member].weapons !== undefined) {
				game.faction[player.customData.member].weapons.forEach(data => {
					let [weapon, patron] = data;
					player.giveWeapon(mp.joaat(weapon), patron);
				});
			}	
			let floor = player.customData.personage[0];
			if(game.faction[player.customData.member].ammunition !== undefined && 
				game.faction[player.customData.member].ammunition[floor] !== undefined && 
				game.faction[player.customData.member].ammunition[floor][player.customData.rank - 1] !== undefined) {
					let clothes = game.faction[player.customData.member].ammunition[floor][player.customData.rank - 1].clothes;
					if(clothes !== undefined) {
						clothes.forEach(data => {
							let [component_id, drawable_id, texture_id, palette_id] = data;
							player.setClothes(component_id, drawable_id, texture_id, palette_id);
						});
					}
					let prop = game.faction[player.customData.member].ammunition[floor][player.customData.rank - 1].prop;
					if(prop !== undefined) {
						prop.forEach(data => {
							let [prop_id, drawable_id, texture_id] = data;
							player.setProp(prop_id, drawable_id, texture_id);
						});
					}
					if(game.faction[player.customData.member].defaultWeapons !== undefined) {
						game.faction[player.customData.member].defaultWeapons.forEach(data => {
							let [weapon, patron] = data;
							player.giveWeapon(mp.joaat(weapon), patron);
						});
					}
			}
			game.faction[player.customData.member].warehouse -= 200;
			player.customData.timer.warehouse = 180;
			player.health = 100;
			player.armour = 100;
			return player.call("alert", "information" , "Вы успешно взяли боеприсасы со склада!"); 
		}
	},
	"playerExitColshape" : (player, colshape) =>
	{
		console.log("Exit colshape:" + colshape.id);
	}
};