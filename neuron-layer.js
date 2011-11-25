function NeuronLayer(numNeurons, weightsPerNeuron, activationFunction){

	var neurons = [];

	for (var i = 0; i < numNeurons; i++){
		neurons.push(new Neuron(weightsPerNeuron));
	}

	this.numWeights = function(){
		return weightsPerNeuron * neurons.length;
	}

	this.weights = function(w){
		if (typeof w != 'undefined'){
			var c = 0;
			for (var i=0; i<neurons.length; i++){
				var tmpw = [];
				for (var p = 0; p < weightsPerNeuron; p++) {
					tmpw[p] = w[c];
					c++;
				}
				neurons[i].weights = tmpw;
			}
		}else {
			var ret = [];
			for (var a=0; a<neurons.length; a++){
				var w = neurons[a].weights;
				for (b = 0; b < w.length; b++) {
					ret.push(w[b]);
				}
			}
			return ret;
		}
		return this;
	}

	this.outputs = function(inputs){
		var out = [];
		for (var i=0; i<neurons.length; i++){
			out.push(neurons[i].output(inputs));
		}
		return out;
	}
}