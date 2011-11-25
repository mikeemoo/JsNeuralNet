function Ant(brain, renderer){

	this.brain = brain;
	this.active = true;

	this.x = 2;
	this.y = 2;
	this.frames = 0;
	this.rotation = 0;

	this.fitness = 0;
	this.shake = 0;

	var speed = 1;
	var moveSpeed = 0.18;
	var twoPI = Math.PI * 2;


	this.update = function(arena){
		this.frames++;
		var rays = arena.castRays(this);
		rays.push((this.rotation/Math.PI)-1);
		var output = brain.outputs(rays);

		if (renderer != null){
			renderer.render(this);
		}

		var rot = (output[0] * twoPI)-Math.PI;

		this.rotation += rot;

		if (!this.move(arena) || this.frames > this.x*10){
			this.fitness = this.x - ((this.shake*this.x)/100);
			this.active = false;
		}else {
			this.shake += Math.abs(rot);
		}


	}

	this.reset = function(){
		this.fitness = 0;
		this.rotation = 0;
		this.x = 2;
		this.y = 2;
		this.frames = 0;
		this.shake = 0;
		this.active = true;
		if (renderer != null){
			renderer.resetMiniMap();
		}
	}

	this.move = function(arena) {
		var moveStep = speed * moveSpeed;
		var r = this.rotation;
		while (this.rotation < 0) this.rotation += twoPI;
		while (this.rotation >= twoPI) this.rotation -= twoPI;
		var newX = this.x + Math.cos(this.rotation) * moveStep;
		var newY = this.y + Math.sin(this.rotation) * moveStep;
		if (arena.isBlocking(newX, newY)) {
			return false;
		}
		this.x = newX;
		this.y = newY;

		return true;
	}

}