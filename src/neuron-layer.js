/*globals InvalidArgumentError,Neuron*/
function NeuronLayer(numNeurons, weightsPerNeuron) {

    "use strict";

    var i;

    this.neurons = [];
    this.numNeurons = numNeurons;
    this.weightsPerNeuron = weightsPerNeuron;

    for (i = 0; i < this.numNeurons; i += 1) {
        this.neurons.push(new Neuron(this.weightsPerNeuron));
    }

}

NeuronLayer.prototype.numWeights = function () {

    "use strict";

    return this.weightsPerNeuron * this.neurons.length;
};

NeuronLayer.prototype.setWeights = function (weights) {

    "use strict";

    var c = 0, i, p, tmpw;

    if (!(weights instanceof Array)) {
        throw new InvalidArgumentError('Parameter w must be an array');
    }
    if (weights.length !== this.numWeights()) {
        throw new InvalidArgumentError('Parameter w must have a length of ' + this.weightsPerNeuron);
    }

    for (i = 0; i < this.neurons.length; i += 1) {
        tmpw = [];
        for (p = 0; p < this.weightsPerNeuron; p += 1) {

            if (typeof weights[c] !== 'number'  || weights[c] > 1 || weights[c] < -1) {
                throw new InvalidArgumentError('Neuron weights must be numbers between -1 and 1');
            }

            tmpw[p] = weights[c];
            c += 1;
        }
        this.neurons[i].weights = tmpw;
    }

};

NeuronLayer.prototype.getWeights = function () {

    "use strict";

    var a, b, weights = [], neuronWeights;

    for (a = 0; a < this.neurons.length; a += 1) {
        neuronWeights = this.neurons[a].weights;
        for (b = 0; b < neuronWeights.length; b += 1) {
            weights.push(neuronWeights[b]);
        }
    }
    return weights;

};

NeuronLayer.prototype.getOutputs = function (inputs) {

    "use strict";

    var out = [], i;

    for (i = 0; i < this.neurons.length; i += 1) {
        out.push(this.neurons[i].output(inputs));
    }

    return out;

};