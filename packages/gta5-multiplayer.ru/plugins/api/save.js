"use strict";

const SAVE_USER_QUERY = "UPDATE `user` SET `password_hash` = ?, `updated_at` = ?, `ip` = ?, `member` = ?, `rank` = ?, `job` = ?, `admin` = ?, `exp` = ?, `kills` = ?, `deaths` = ?, `phone` = ?, `bank` = ?, `offense` = ?, `mute` = ?, `ban` = ?, `jail` = ?, `dehydration` = ?, `satiety` = ?, `narcomaniac` = ?, `items` = ?, `email` = ?, `personage` = ? WHERE `username` = ?";

function buildSaveParams(player) {
	return [
		String(player.customData.password),
		parseInt(Math.round((new Date().getTime()) / 1000)),
		String(player.ip),
		parseInt(player.customData.member),
		parseInt(player.customData.rank),
		parseInt(player.customData.job.id),
		parseInt(player.customData.admin),
		parseInt(player.customData.exp),
		parseInt(player.customData.kills),
		parseInt(player.customData.deaths),
		String(JSON.stringify(player.customData.phone)),
		parseInt(player.customData.bank),
		parseInt(player.customData.offense),
		parseInt(player.customData.mute),
		parseInt(player.customData.ban),
		parseInt(player.customData.jail),
		parseInt(player.customData.dehydration),
		parseInt(player.customData.satiety),
		parseInt(player.customData.narcomaniac),
		String(JSON.stringify(player.customData.item)),
		String(player.customData.email),
		String(JSON.stringify(player.customData.personage)),
		String(player.name)
	];
}

module.exports = {
	SAVE_USER_QUERY,
	buildSaveParams,

	"savePlayerToDb": (player, connection) => {
		if (!player.customData.auth) return;
		const db = connection || global.pool;
		db.query(SAVE_USER_QUERY, buildSaveParams(player), function (error) {
			if (error) {
				console.log('Error table "user"');
				throw error;
			}
		});
	},

	"save": () => {
		global.pool.getConnection(function (err, connection) {
			if (err) {
				console.log('Error getting connection');
				connection.release();
				throw err;
			}
			for (var item in game.faction) {
				if (game.faction[item].warehouse) {
					connection.query("UPDATE `materials` SET `warehouse` = ? WHERE `id` = ?", [game.faction[item].warehouse, item], function (error) {
						if (error) {
							console.log('Error table "materials"');
							connection.release();
							throw error;
						}
					});
				}
				if (game.faction[item].balance) {
					connection.query("UPDATE `banks` SET `balance` = ? WHERE `id` = ?", [game.faction[item].balance, item], function (error) {
						if (error) {
							console.log('Error table "banks"');
							connection.release();
							throw error;
						}
					});
				}
			}
			mp.players.forEach(player => {
				if (player.customData.auth) {
					connection.query(SAVE_USER_QUERY, buildSaveParams(player), function (error) {
						if (error) {
							console.log('Error table "user"');
							connection.release();
							throw error;
						}
					});
				}
			});
			connection.release();
		});
	},

	"saveuser": (player) => {
		if (!player.customData.auth) return;
		global.pool.query(SAVE_USER_QUERY, buildSaveParams(player), function (error) {
			if (error) {
				console.log('Error table "user"');
				throw error;
			}
		});
	},

	"payday": () => {
		mp.players.forEach(player => {
			if (player.customData.auth) {
				let satiety = 0;
				if (player.customData.member !== 0) satiety += game.faction[player.customData.member].salary[player.customData.rank - 1];
				if (player.customData.job.id !== 0) satiety += player.customData.job.salary;
				let nalog = satiety / 100 * game.nalog;
				player.customData.exp++;
				player.customData.bank += satiety - nalog;
				player.customData.job.salary = 0;
				game.faction[CONST.FACTION_CITYHALL].balance += nalog;
				player.call("addMessagePhone", 109, "Банк LS", "left", " test.");
				player.call("alert", "information", "Вы получили новое сообщение");
			}
		});
	}
};
