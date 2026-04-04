const initPlayerData = require('../plugins/player-defaults.js');
const initPlayerFunctions = require('../plugins/player-functions.js');

module.exports = {
	"entityCreated": (entity) => {
		entity.customData = {};
		entity.customFunc = {};

		if (entity.type === 'vehicle') {
			entity.customFunc.respawn = (position, heading) => {
				entity.repair();
				entity.position = position;
				entity.engine = true;
				entity.rotation = new mp.Vector3(0, 0, heading);
			};
			entity.customData.fuel = 20;
			entity.customData.engine = true;
		} else if (entity.type === 'player') {
			entity.call_unfancy = entity.call;
			entity.call = function () {
				return this.call_unfancy(arguments[0], [...arguments].slice(1));
			};
			initPlayerData(entity);
			initPlayerFunctions(entity);
		}
	}
};
