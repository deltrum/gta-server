let config = require('./config.json');

function refreshData(x) {
    // reset when max number reached!
    if (x >= config.adverts.length) {
      x = 0;
    }
    // print out message
    mp.players.broadcast(`[!{#56f442}GTA5-MULTIPLAYER.RU!{white}] ` + config.adverts[x]);
    setTimeout(() => {
      refreshData(x+1)
    }, config.interval*1000);
}

refreshData(0); // execute function
