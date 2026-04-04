"use strict";

const playerQueries = require('./api/player-queries.js');
const save = require('./api/save.js');
const utils = require('./api/utils.js');
const { striptags } = require('./api/striptags.js');

module.exports = Object.assign({},
	playerQueries,
	{
		save: save.save,
		saveuser: save.saveuser,
		savePlayerToDb: save.savePlayerToDb,
		payday: save.payday,
	},
	utils,
	{ striptags }
);
