function Neuron(numWeights){
    this.weights = [];
    for (var i = 0; i < numWeights; i++){
        this.weights[i] = (Math.random() * 2) - 1;
    }
}
Neuron.prototype.output = function (inputs) {
    var total = 0;
    var threshold;
    var numInputs = inputs.length;
    for (var i=0; i < numInputs; i++){
        total += inputs[i] * this.weights[i];
    }
    threshold = this.weights[i];
    return 1 / (1 + Math.exp((-total) / threshold));
}