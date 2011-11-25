function Arena(){

	this.map = [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
		[1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,0,0,0,0,1,1,1,0,0,0,1,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1],
		[1,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1],
		[1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	];

	var screenWidth = 320;
	var stripWidth = 4;
	var fov = 60 * Math.PI / 180;
	var numRays = 5;
	var fovHalf = fov / 2;
	var viewDist = (screenWidth/2) / Math.tan((fov / 2));
	var twoPI = Math.PI * 2;

 	this.mapWidth = this.map[0].length;
	this.mapHeight = this.map.length;


	this.isBlocking = function(x, y) {
		if (y < 0 || y >= this.mapHeight || x < 0 || x >= this.mapWidth)
			return true;

		return (this.map[Math.floor(y)][Math.floor(x)] != 0);

	}

	this.castRays = function(ant){
		var stripIdx = 0;
		var distances = [];
		for (var i=0;i<numRays;i++) {
			var rayScreenPos = (-numRays/2 + i) * stripWidth+2;
			var rayViewDist = Math.sqrt(rayScreenPos*rayScreenPos + viewDist*viewDist);
			var rayAngle = (Math.asin(rayScreenPos / rayViewDist) * 20);
			var dist = this.castSingleRay(
				ant,
				ant.rotation + rayAngle,
				stripIdx++
			);
			var ray = (Math.min(100, dist)/50)-1;
			if (isNaN(ray)){
				ray = 0;
			}
			distances.push(ray);
		}
		return distances;
	}

	this.castSingleRay = function (ant, rayAngle, stripIdx) {
		rayAngle %= twoPI;
		if (rayAngle < 0) rayAngle += twoPI;
		var right = (rayAngle > twoPI * 0.75 || rayAngle < twoPI * 0.25);
		var up = (rayAngle < 0 || rayAngle > Math.PI);
		var angleSin = Math.sin(rayAngle);
		var angleCos = Math.cos(rayAngle);
		var dist = 0;
		var xHit = 0;
		var yHit = 0;
		var textureX;
		var wallX;
		var wallY;
		var slope = angleSin / angleCos;
		var dX = right ? 1 : -1;
		var dY = dX * slope;
		var x = right ? Math.ceil(ant.x) : Math.floor(ant.x);
		var y = ant.y + (x - ant.x) * slope;
		while (x >= 0 && x < this.mapWidth && y >= 0 && y < this.mapHeight) {
			var wallX = Math.floor(x + (right ? 0 : -1));
			var wallY = Math.floor(y);
			if (this.map[wallY][wallX] > 0) {
				var distX = x - ant.x;
				var distY = y - ant.y;
				dist = distX*distX + distY*distY;
				textureX = y % 1;
				if (!right) textureX = 1 - textureX;
				xHit = x;
				yHit = y;
				break;
			}
			x += dX;
			y += dY;
		}
		var slope = angleCos / angleSin;
		var dY = up ? -1 : 1;
		var dX = dY * slope;
		var y = up ? Math.floor(ant.y) : Math.ceil(ant.y);
		var x = ant.x + (y - ant.y) * slope;
		while (x >= 0 && x < this.mapWidth && y >= 0 && y < this.mapHeight) {
			var wallY = Math.floor(y + (up ? -1 : 0));
			var wallX = Math.floor(x);
			wallX = Math.max(0, Math.min(this.mapWidth, wallX));
			wallY = Math.max(0, Math.min(this.mapHeight, wallY));
			if (this.map[wallY][wallX] > 0) {
				var distX = x - ant.x;
				var distY = y - ant.y;
				var blockDist = distX*distX + distY*distY;
				if (!dist || blockDist < dist) {
					dist = blockDist;
					xHit = x;
					yHit = y;
					textureX = x % 1;
					if (up) textureX = 1 - textureX;
				}
				break;
			}
			x += dX;
			y += dY;
		}
		if (dist){
		  //drawRay(xHit, yHit);
		  return dist;
		}
	}

}