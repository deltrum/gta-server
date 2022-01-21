global.drawTextArr = [];

function radius(radi, pos, _pos) {
	let radius = Math.abs(Math.sqrt(Math.pow((_pos.x - pos.x),2) + Math.pow((_pos.y - pos.y),2)+Math.pow((_pos.z - pos.z),2)));
	if(radi >= radius) return true;
	return false;
}

mp.events.add(
{
	"render" : () => {
		if(global.clientsideLoaded && global.auth) {
			let pos = mp.players.local.position;
			global.drawTextArr.forEach(data  => {
				let [text, type, color, _pos ] = data;
				if(radius(7, pos, _pos)) mp.game.graphics.drawText(text, [_pos.x, _pos.y, _pos.z], { 
						font: 0, 
						color: color, 
						scale: [0.4, 0.4], 
						outline: true
					});	
			});
		}
	},
	"setDrawText" : (data) => {
		global.drawTextArr = JSON.parse(data);
	}
});