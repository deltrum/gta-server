"use strict";

mp.Vector3.Distance = function (v1, v2){
	return Math.abs(Math.sqrt(Math.pow((v2.x - v1.x),2) +
									Math.pow((v2.y - v1.y),2)+
									Math.pow((v2.z - v1.z),2)));
}

mp.Vector3.Distance2D = function (v1, v2){
	return Math.abs(Math.sqrt(Math.pow((v2.x - v1.x),2) +
									Math.pow((v2.y - v1.y),2)));
}
