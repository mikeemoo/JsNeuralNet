function Neuron(numWeights) {

    "use strict";

    var i;

    this.weights = [];

    for (i = 0; i < numWeights; i += 1) {
        this.weights[i] = (Math.random() * 2) - 1;
    }

}
Neuron.prototype.output = function (inputs) {

    if (inputs.length != this.weights.length - 1) {
        throw new InvalidArgumentError();
    }

    "use strict";

    var total = 0,
        i,
        threshold,
        numInputs = inputs.length;

    for (i = 0; i < numInputs; i += 1) {
        total += inputs[i] * this.weights[i];
    }

    threshold = this.weights[i];

    return 1 / (1 + Math.exp((-total) / threshold));
};