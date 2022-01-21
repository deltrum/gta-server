var raycast = false;

mp.events.add("render", () => {
	const player = mp.players.local;
	if(global.auth && player.vehicle === null) {
		const startPosition = player.getBoneCoords(12844, 0, 0, 0);
		const res = mp.game.graphics.getScreenActiveResolution(0,0);
		const endPosition = mp.game.graphics.screen2dToWorld3d(res.x / 2, res.y / 2);
		const result = mp.raycasting.testPointToPoint(startPosition, endPosition, player, 2 | 8 | 4);
		
		const graphics = mp.game.graphics;
		//graphics.drawLine(startPosition.x, startPosition.y, startPosition.z, endPosition.x, endPosition.y, endPosition.z, 255, 0, 0, 255);
		if (result) {
			if(!raycast) {
				raycast = true;
				mp.gui.execute(`window.setRaycastFocus(${raycast});`);
			}
			//graphics.drawText(`Type: ${result.entity.type} & Id: ${result.entity.remoteId}`, [0.5, 0.5], { font: 4, color: [255, 255, 255, 255], scale: [0.6, 0.6], outline: true });
		} else {
			if(raycast) {
				raycast = false;
				mp.gui.execute(`window.setRaycastFocus(${raycast});`);
			}
		}
	}
});
