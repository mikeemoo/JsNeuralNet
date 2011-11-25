function Neuron(numWeights){
	this.weights = [];
	for (var i = 0; i < numWeights; i++){
		this.weights[i] = (Math.random()*2)-1;
	}
	this.output = function (inputs){
		var total = 0;
		var threshold;
		for (var i=0; i < inputs.length; i++){
		  total +=	inputs[i] * this.weights[i];
		}
		threshold = this.weights[i];
	    return 1 / (1 + Math.exp((-total) / threshold));
	}
}