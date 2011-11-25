function NeuralNetwork(numInputs, numOutputs, numHidden, arena){

	// temporarily moved these out of the constructor.
	// the logic doesnt seem right for these two.

	var numPerHidden = numInputs;
	var inputWeightSize = numInputs;

	var layers = [];
	var inputLayer = new NeuronLayer(numInputs, inputWeightSize + 1);

	var lastLayerSize = numInputs;
	for (var i = 0; i < numHidden; i++) {
		layers.push(new NeuronLayer(numPerHidden, lastLayerSize + 1));
		lastLayerSize = numPerHidden;
	}

	var outputLayer = new NeuronLayer(numOutputs, lastLayerSize + 1);

	this.weightCount = function() {
		var count = inputLayer.numWeights();
		for (var i=0; i<layers.length; i++){
			count += layers[i].numWeights();
		}
		count += outputLayer.numWeights();
		return count;
	}

	this.outputs = function(inputs){
		var lastOutputs = inputLayer.outputs(inputs);
		for (var i=0; i<layers.length; i++){
			lastOutputs = layers[i].outputs(lastOutputs);
		}
		return outputLayer.outputs(lastOutputs);
	}

	this.layers = function(){
		var ls = [inputLayer];
		for (var i=0; i<layers.length;i++){
			ls.push(layers[i]);
		}
		ls.push(outputLayer);
		return ls;
	}

	this.weights = function(w){
		// set
		if (typeof w != 'undefined'){
			var offset = inputLayer.numWeights();
			var p = w.slice(0, offset);
			inputLayer.weights(p);
			for (var i=0; i<layers.length; i++){
				var layer = layers[i];
				layer.weights(w.slice(offset, offset + layer.numWeights()));
				offset += layer.numWeights();
			}
			outputLayer.weights(w.slice(offset, offset + outputLayer.numWeights()));
		// get
		}else {
			var ret = []
			ret = ret.concat(inputLayer.weights());
			for (var i=0; i<layers.length; i++){
				ret = ret.concat(layers[i].weights());
			}
			ret = ret.concat(outputLayer.weights());
			return ret;
		}
		return this;
	}
}