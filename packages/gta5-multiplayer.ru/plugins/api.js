const md5 = require('md5');

var 	STATE_OUTPUT       = 0,
        STATE_HTML         = 1,
        STATE_PRE_COMMENT  = 2,
        STATE_COMMENT      = 3,
        WHITESPACE         = /\s/,
        ALLOWED_TAGS_REGEX = /<(\w*)>/g;

function parseAllowableTags(allowableTags) {
        var tagsArray = [],
            match;

        while ((match = ALLOWED_TAGS_REGEX.exec(allowableTags)) !== null) {
            tagsArray.push(match[1]);
        }

        return tagsArray.length !== 0 ? tagsArray : null;
    }

module.exports =
{
	"getMemberList": (member) => 
	{
		let players = [];
		mp.players.forEach(_player => { 
			if(_player.customData.member === member)  players[_player.id] = [_player.name, _player.customData.rank];
        });
		return players;
	},
	"getWantedList": () => 
	{
		let players = [];
		mp.players.forEach(_player => { 
			if(_player.customData.offense !== 0)	players[_player.id] = [_player.name, _player.customData.offense];
		});
		return players;
	},
	"getStatList": (member) => 
	{
		let stats = [];
		if(game.faction[member].warehouse !== undefined) {
			stats.push(["Состояние склада", game.faction[member].warehouse]);
		}
		return stats;
	},	
	"timeFormat": (time) => 
	{
		// Hours, minutes and seconds
		let hrs = ~~(time / 3600);
		let mins = ~~((time % 3600) / 60);
		let secs = time % 60;

		// Output like "1:01" or "4:03:59" or "123:03:59"
		let ret = "";

		if (hrs > 0) {
			ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
		}

		ret += "" + mins + ":" + (secs < 10 ? "0" : "");
		ret += "" + secs;
		return ret;
	},
	"getPings" : () =>
	{
		if(global.game.control.timerPing === 0) {
			var ping = [];
			mp.players.forEach(player => {
				if(player.customData.auth) ping[player.id] = player.ping;
			});
			global.game.control.timerPing = 60;
			global.game.control.ping = ping;
			return ping;
		} else {
			return global.game.control.ping
		}
	},
	"routeList" : () =>
	{
		let routeList = []
		game.route.forEach((item, key) => {
			routeList.push(item.name + " | $" + item.price);
		})
		return routeList;
	},
    "getList" : (list) =>
    {
        let relist = []
        game.route.forEach((item, key) => {
            relist.push(item.name + " | " + (item.price !== undefined && item.price || ""));
        })
        return relist;
    },
	"save" : () => 
	{
		global.pool.getConnection(function(err, connection) {
			if(err) {
				console.log('Error getting connection');
				connection.release();
				throw err;
			}
			for (var item in game.faction) 
			{
				if(game.faction[item].warehouse)
				{
					connection.query("UPDATE `materials` SET `warehouse` = ? WHERE `id` = ?", [game.faction[item].warehouse,item], function (error, rows, fields) {
						if(error) {
							console.log('Error table "materials"');
							connection.release();
							throw error;
						}
					});
				}
				if(game.faction[item].balance)
				{
					connection.query("UPDATE `banks` SET `balance` = ? WHERE `id` = ?", [game.faction[item].balance,item], function (error, rows, fields) {
						if(error) {
							console.log('Error table "banks"');
							connection.release();
							throw error;
						}
					});
				}
			}		
			mp.players.forEach(player => {
				if(player.customData.auth){
					connection.query("UPDATE `user` SET `password_hash` = ?, `updated_at` = ?, `ip` = ?, `member` = ?, `rank` = ?, `job` = ?, `admin` = ?, `exp` = ?, `kills` = ?, `deaths` = ?, `phone` = ?, `bank` = ?, `offense` = ?, `mute` = ?, `ban` = ?, `jail` = ?, `dehydration` = ?, `satiety` = ?, `narcomaniac` = ?, `items` = ?, `email` = ?,  `personage` = ? WHERE `username` = ?", [String(player.customData.password), parseInt(Math.round((new Date().getTime())/1000)), String(player.ip), parseInt(player.customData.member), parseInt(player.customData.rank), parseInt(player.customData.job.id), parseInt(player.customData.admin), parseInt(player.customData.exp), parseInt(player.customData.kills), parseInt(player.customData.deaths), String(JSON.stringify(player.customData.phone)), parseInt(player.customData.bank), parseInt(player.customData.offense), parseInt(player.customData.mute), parseInt(player.customData.ban), parseInt(player.customData.jail), parseInt(player.customData.dehydration), parseInt(player.customData.satiety), parseInt(player.customData.narcomaniac), String(JSON.stringify(player.customData.item)), String(player.customData.email), String(JSON.stringify(player.customData.personage)), String(player.name)], function (error, rows, fields) { 
						if(error) {
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
    "saveuser" : (player) => 
    {
        if(player.customData.auth){
                    connection.query("UPDATE `user` SET `password_hash` = ?, `updated_at` = ?, `ip` = ?, `member` = ?, `rank` = ?, `job` = ?, `admin` = ?, `exp` = ?, `kills` = ?, `deaths` = ?, `phone` = ?, `bank` = ?, `offense` = ?, `mute` = ?, `ban` = ?, `jail` = ?, `dehydration` = ?, `satiety` = ?, `narcomaniac` = ?, `items` = ?, `email` = ?,  `personage` = ? WHERE `username` = ?", [String(player.customData.password), parseInt(Math.round((new Date().getTime())/1000)), String(player.ip), parseInt(player.customData.member), parseInt(player.customData.rank), parseInt(player.customData.job.id), parseInt(player.customData.admin), parseInt(player.customData.exp), parseInt(player.customData.kills), parseInt(player.customData.deaths), String(JSON.stringify(player.customData.phone)), parseInt(player.customData.bank), parseInt(player.customData.offense), parseInt(player.customData.mute), parseInt(player.customData.ban), parseInt(player.customData.jail), parseInt(player.customData.dehydration), parseInt(player.customData.satiety), parseInt(player.customData.narcomaniac), String(JSON.stringify(player.customData.item)), String(player.customData.email), String(JSON.stringify(player.customData.personage)), String(player.name)], function (error, rows, fields) { 
                        if(error) {
                            console.log('Error table "user"');
                            connection.release();
                            throw error;
                        }
                    });                 
                }
    },
	"payday" : () => 
	{
		mp.players.forEach(player => {
			if(player.customData.auth ){	
				let satiety = 0;
				if(player.customData.member !== 0) satiety += game.faction[player.customData.member].salary[player.customData.rank-1] 
				if(player.customData.job.id !== 0) satiety += player.customData.job.salary;
				let nalog = satiety / 100 * game.nalog;
				player.customData.exp++;
				player.customData.bank += satiety - nalog;
				player.customData.job.salary = 0;
				game.faction[4].balance += nalog;
                player.call("addMessagePhone", 109, "Банк LS", "left", " test.");
                player.call("alert", "information" , "Вы получили новое сообщение");
			}
		});
	},	
	"number" : (number) => 
	{
		var id = -1;
		mp.players.forEach(_player => 
		{
			if(_player.customData.phone.number === parseInt(number) && _player.customData.phone.number !== 0) 
			{
				id = _player.id;
				return;
			}
			
			
		});
		return id;
	},
	"radius" : (radi, pos, _pos) =>
	{
		pos.x -= _pos.x; 
		pos.y -= _pos.y;
		pos.z -= _pos.z;
		if(((pos.x < radi) && (pos.x > -radi)) && ((pos.y < radi) && (pos.y > -radi)) && ((pos.z < radi) && (pos.z > -radi))) return true;
		return false;
	},
	"getRandomInt" : (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},	
    "striptags" : (html, allowableTags) => {
        var html = html || '',
            state = STATE_OUTPUT,
            depth = 0,
            output = '',
            tagBuffer = '',
            inQuote = false,
            i, length, c;

        if(typeof allowableTags === 'string') {
            // Parse the string into an array of tags
            allowableTags = parseAllowableTags(allowableTags);
        } else if(!Array.isArray(allowableTags)) {
            // If it is not an array, explicitly set to null
            allowableTags = null;
        }

        for (i = 0, length = html.length; i < length; i++) {
            c = html[i];

            switch (c) {
                case '<': {
                    // ignore '<' if inside a quote
                    if(inQuote) {
                        break;
                    }

                    // '<' followed by a space is not a valid tag, continue
                    if(html[i + 1] === ' ') {
                        consumeCharacter(c);
                        break;
                    }

                    // change to STATE_HTML
                    if(state === STATE_OUTPUT) {
                        state = STATE_HTML;

                        consumeCharacter(c);
                        break;
                    }

                    // ignore additional '<' characters when inside a tag
                    if(state === STATE_HTML) {
                        depth++;
                        break;
                    }

                    consumeCharacter(c);
                    break;
                }

                case '>': {
                    // something like this is happening: '<<>>'
                    if(depth) {
                        depth--;
                        break;
                    }

                    // ignore '>' if inside a quote
                    if(inQuote) {
                        break;
                    }

                    // an HTML tag was closed
                    if(state === STATE_HTML) {
                        inQuote = state = 0;

                        if(allowableTags) {
                            tagBuffer += '>';
                            flushTagBuffer();
                        }

                        break;
                    }

                    // '<!' met its ending '>'
                    if(state === STATE_PRE_COMMENT) {
                        inQuote = state = 0;
                        tagBuffer = '';
                        break;
                    }

                    // if last two characters were '--', then end comment
                    if(state === STATE_COMMENT &&
                        html[i - 1] === '-' &&
                        html[i - 2] === '-') {

                        inQuote = state = 0;
                        tagBuffer = '';
                        break;
                    }

                    consumeCharacter(c);
                    break;
                }

                // catch both single and double quotes
                case '"':
                case '\'': {
                    if(state === STATE_HTML) {
                        if(inQuote === c) {
                            // end quote found
                            inQuote = false;
                        } else if(!inQuote) {
                            // start quote only if not already in one
                            inQuote = c;
                        }
                    }

                    consumeCharacter(c);
                    break;
                }

                case '!': {
                    if(state === STATE_HTML &&
                        html[i - 1] === '<') {

                        // looks like we might be starting a comment
                        state = STATE_PRE_COMMENT;
                        break;
                    }

                    consumeCharacter(c);
                    break;
                }

                case '-': {
                    // if the previous two characters were '!-', this is a comment
                    if(state === STATE_PRE_COMMENT &&
                        html[i - 1] === '-' &&
                        html[i - 2] === '!') {

                        state = STATE_COMMENT;
                        break;
                    }

                    consumeCharacter(c);
                    break;
                }

                case 'E':
                case 'e': {
                    // check for DOCTYPE, because it looks like a comment and isn't
                    if(state === STATE_PRE_COMMENT &&
                        html.substr(i - 6, 7).toLowerCase() === 'doctype') {

                        state = STATE_HTML;
                        break;
                    }

                    consumeCharacter(c);
                    break;
                }

                default: {
                    consumeCharacter(c);
                }
            }
        }

        function consumeCharacter(c) {
            if(state === STATE_OUTPUT) {
                output += c;
            } else if(allowableTags && state === STATE_HTML) {
                tagBuffer += c;
            }
        }

        function flushTagBuffer() {
            var normalized = '',
                nonWhitespaceSeen = false,
                i, length, c;

            normalizeTagBuffer:
            for (i = 0, length = tagBuffer.length; i < length; i++) {
                c = tagBuffer[i].toLowerCase();

                switch (c) {
                    case '<': {
                        break;
                    }

                    case '>': {
                        break normalizeTagBuffer;
                    }

                    case '/': {
                        nonWhitespaceSeen = true;
                        break;
                    }

                    default: {
                        if(!c.match(WHITESPACE)) {
                            nonWhitespaceSeen = true;
                            normalized += c;
                        } else if(nonWhitespaceSeen) {
                            break normalizeTagBuffer;
                        }
                    }
                }
            }

            if(allowableTags.indexOf(normalized) !== -1) {
                output += tagBuffer;
            }

            tagBuffer = '';
        }
		
        return output.replace( /"/g, "").replace( /\\/g, "").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
}