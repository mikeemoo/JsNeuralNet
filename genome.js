function Genome(ants, chromoLength, mutationRate, crossOverRate){

	this.totalFitness = 0;
	this.worstFitness = 999999;
	this.bestFitness = 0;
	this.avgFitness = 0;
	this.fittestGenome = null;
	this.totalBest = 0;
	this.generation = 0;

	this.crossover = function (p1, p2, c1, c2){
		if (Math.random() > crossOverRate){
			for (var i = 0; i < p1.length; i++){
				c1[i] = p1[i];
				c2[i] = p2[i];
			}
			return;
		}
		var xPoint = Math.floor(Math.random() * (p1.length - 1));
		for (var i = 0; i < xPoint; i++){
			c1[i] = p1[i];
			c2[i] = p2[i];
		}
		for (var i = xPoint; i < p1.length; i++){
			c1[i] = p2[i];
			c2[i] = p1[i];
		}
	}

	this.mutate = function(c){
		for (var i = 0; i < c.length; i++){
			if (Math.random() < mutationRate){
				c[i] += (Math.random()*2)-1;
			}
		}
	}


	this.rouletteSelection = function(){
		var slice = Math.random() * this.totalFitness;
		var fitSoFar = 0;
		var chosenOne = null;
		for (var i=0; i<ants.length; i++){
			var ant = ants[i];
			fitSoFar += ant.fitness;
			if (fitSoFar > slice){
				chosenOne = ant;
				break;
			}
		}
		if (chosenOne == null){
			chosenOne = ants[i-1];
		}

		return chosenOne;
	}

	this.epoch = function (){
		this.reset();
		this.calcStats();
		var i = Math.floor(ants.length * 0.1);
		var newPop = this.grabBest(i);
		while (i < ants.length){
			var p1 = this.rouletteSelection().brain.weights();
			var p2 = this.rouletteSelection().brain.weights();
			var c1 = new Array(p1.length);
			var c2 = new Array(p2.length);
			this.crossover(p1, p2, c1, c2);
			this.mutate(c1);
			this.mutate(c2);
			newPop[i] = c1;
			if (i + 1 < ants.length) {
				newPop[i + 1] = c2;
			}
			i += 2;
		}
		//Put the new weights back into the population.
		for (var i = 0; i < ants.length; i++) {
			ants[i].brain.weights(newPop[i]);
		}

		this.generation += 1;

	}
	this.grabBest = function (num){
		ants.sort(function(a, b) { return (b.fitness - a.fitness); });
		var new_pop = [];
		for (var i=0; i<num; i++){
			new_pop.push(ants[i].brain.weights().slice(0));
		}
		return new_pop;
	}

	this.calcStats = function(){
		var highest = 0;
		var lowest = 999999;
		var best = null;
		for (var i=0; i<ants.length; i++){
			var ant = ants[i];
			var fitness = ant.fitness;
			this.totalFitness += fitness;
			if (fitness > highest){
				highest = fitness;
				best = ant;
			}
			if (fitness < lowest){
				lowest = fitness;
			}
		}
		this.worstFitness = lowest;
		this.bestFitness = highest;
		this.totalBest = Math.max(this.totalBest, this.bestFitness);
		if (this.bestFitness == this.totalBest){
			this.fittestGenome = best.brain.weights().slice(0);
		}
		this.avgFitness = this.totalFitness / ants.length;
	}

	this.reset = function(){
		this.totalFitness = 0;
		this.bestFitness = 0;
		this.avgFitness = 0;
		this.worstFitness = 0;
	}
}