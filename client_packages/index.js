function encoder(code, hash) {
	
	code = code.replace(/[\u0080-\uFFFF]/g, function (s) {
        return "\\u" + ('000' + s.charCodeAt(0).toString(16)).substr(-4);
    });
	
	var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var encoded = '';
	var j = 0;
	
	var chr1, chr2, chr3,
		com1, com2, com3,
		enc1, enc2, enc3, enc4;
		
	for (var i=0; i<code.length;) {
		chr1 = code.charCodeAt(i++);
		chr2 = code.charCodeAt(i++);
		chr3 = code.charCodeAt(i++);

		com1 = (chr1^b64chars.indexOf(hash.charAt(j)));
		com1 += j;
		if(j===hash.length-1)j=0; else j++;
		com2 = (chr2^b64chars.indexOf(hash.charAt(j)));
		com2 += j;
		if(j===hash.length-1)j=8; else j++;
		com3 = (chr3^b64chars.indexOf(hash.charAt(j)));
		com3 += j;
		if(j===hash.length-1)j=16; else j++;

		enc1 = com1 >> 2;
		enc2 = ((com1 & 3) << 4) | (com2 >> 4);
		enc3 = isNaN(com2) ? 64:(((com2 & 15) << 2) | (com3 >> 6));
		enc4 = isNaN(com3) ? 64:(com3 & 63);
		
		encoded += b64chars.charAt(enc1) + b64chars.charAt(enc2) + b64chars.charAt(enc3) + b64chars.charAt(enc4);
	}
	return encoded+"==";
}

function decoder(code, hash) {
	var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var decoded = '';
	var j = 0;
	
	var chr1, chr2, chr3,
		com1, com2, com3,
		enc1, enc2, enc3, enc4;
		
	code = code.slice(0,-2);
		
	for (var i=0; i<code.length;) {
		enc1 = b64chars.indexOf(code.charAt(i++));
		enc2 = b64chars.indexOf(code.charAt(i++));
		enc3 = b64chars.indexOf(code.charAt(i++));
		enc4 = b64chars.indexOf(code.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr1 -= j;
		com1 = chr1^b64chars.indexOf(hash.charAt(j));
		if(j===hash.length-1)j=0; else j++;
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr2 -= j;
		com2 = chr2^b64chars.indexOf(hash.charAt(j));
		if(j===hash.length-1)j=8; else j++;
		chr3 = ((enc3 & 3) << 6) | enc4;
		chr3 -= j;
		com3 = chr3^b64chars.indexOf(hash.charAt(j));
		if(j===hash.length-1)j=16; else j++;
		
		if(com1 !== 0) decoded = decoded + String.fromCharCode(com1);
		
		if (enc3 < 64 && com2 !== 0) decoded += String.fromCharCode(com2);
		if (enc4 < 64 && com3 !== 0) decoded += String.fromCharCode(com3);
	}
	return decoded;
}

mp.gui.execute("window.location = 'package://html/index.html'");
mp.game.ui.displayRadar(false);
mp.players.local.freezePosition(true);
mp.game.cam.destroyAllCams(false);
mp.gui.chat.show(false);
mp.gui.chat.safeMode = false;
let cam = mp.cameras.new('default',{x:402.8, y:-1000.6, z:99.0},{x:0.0,y:0.0,z:0.0},90.0); 
cam.setActive(true); 
mp.game.cam.renderScriptCams(true, false, 3000, true, false);
mp.players.local.setHeading(180);
mp.players.local.model = mp.game.joaat("MP_M_Freemode_01");
mp.players.local.setRotation(0.0, 0.0, -185.0, 2, true);
//mp.players.local.setRotation(180, 0, 0, 5, true);

mp.events.add('guiStarted', () => {
	/*var clientside = require('clientside.js');
	for (var i = 0; i < clientside.length; i++) {
		mp.game.graphics.notify(clientside[i].name + " loading")
		eval(decoder(clientside[i].code, clientside[i].hash));
	}*/
	/*if(clientside.length === i) {*/
	require('libs/nativeui.js');
	require('clientside.js/atm.js');
	require('clientside.js/auth.js');
	require('clientside.js/bus.js');
	require('clientside.js/control.js');
	require('clientside.js/draw.js');
	require('clientside.js/discord.js');
	require('clientside.js/fly.js');
	require('clientside.js/main.js');
	require('clientside.js/money.js');
	require('clientside.js/nametag.js');
	require('clientside.js/police.js');
	require('clientside.js/phone.js');
	require('clientside.js/raycast.js');
	require('clientside.js/license.js');
	require('clientside.js/location.js');
	require('clientside.js/speedometer.js');


	global.clientsideLoaded=true;	
	let storage = mp.storage.data === undefined ? "" : mp.storage.data
	let name = storage.name !== undefined ? storage.name : mp.players.local.name
	let password = storage.password !== undefined ? storage.password : ""
	mp.gui.execute(`window.setLogin('${name}', '${password}');`);
	mp.gui.execute(`window.setGui('login');`);	
	//}
});