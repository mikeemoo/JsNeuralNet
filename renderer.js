function Renderer(container, arena){

	var miniMapScale = 8;

	this.miniMap = document.createElement('canvas');
	this.miniMap.style.position = 'absolute';
	container.appendChild(this.miniMap);

	this.miniMapObjects = document.createElement('canvas');
	this.miniMapObjects.style.position = 'absolute';
	container.appendChild(this.miniMapObjects);

	this.render = function(ant){
		//this.resetMiniMap();
		var objectCtx = this.miniMapObjects.getContext("2d");
		objectCtx.fillStyle = "red";
		objectCtx.fillRect(
			ant.x * miniMapScale - 2,
			ant.y * miniMapScale - 2,
			4, 4
		);
		objectCtx.strokeStyle = "red";
		objectCtx.beginPath();
		objectCtx.moveTo(ant.x * miniMapScale, ant.y * miniMapScale);
		objectCtx.lineTo(
			(ant.x + Math.cos(ant.rotation) * 4) * miniMapScale,
			(ant.y + Math.sin(ant.rotation) * 4) * miniMapScale
		);
		objectCtx.closePath();
		objectCtx.stroke();
	}

	this.resetMiniMap = function(){
		this.miniMapObjects.width = this.miniMapObjects.width;
	}

	this.drawMiniMap = function() {
		this.miniMap.width = arena.mapWidth * miniMapScale;
		this.miniMap.height = arena.mapHeight * miniMapScale;
		this.miniMapObjects.width = this.miniMap.width;
		this.miniMapObjects.height = this.miniMap.height;
		var w = (arena.mapWidth * miniMapScale) + "px"
		var h = (arena.mapHeight * miniMapScale) + "px"
		this.miniMap.style.width = this.miniMapObjects.style.width = container.style.width = w;
		this.miniMap.style.height = this.miniMapObjects.style.height = container.style.height = h;

		var ctx = this.miniMap.getContext("2d");
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,this.miniMap.width,this.miniMap.height);
		// loop through all blocks on the map
		for (var y=0;y<arena.mapHeight;y++) {
			for (var x=0;x<arena.mapWidth;x++) {
				var wall = arena.map[y][x];
				if (wall > 0) {
					ctx.fillStyle = "rgb(200,200,200)";
					ctx.fillRect(				// ... then draw a block on the minimap
						x * miniMapScale,
						y * miniMapScale,
						miniMapScale,miniMapScale
					);
				}
			}
		}
	}
	this.drawMiniMap();
}