var layer = new NeuronLayer(2, 10);
var weights = layer.getWeights();
var weights_length = weights.length;

test('Validate layer', function () {

    strictEqual(layer.neurons.length, 2, 'There are two neurons in the layer');
    strictEqual(layer.numNeurons, 2, 'numNeurons should be 2');
    strictEqual(weights_length, 20, 'There are 20 weights returned from the weights() method');

    for (var i = 0; i < weights_length; i++) {
        ok(weights[i] >= -1 && weights[i] <= 1, 'Weights should be beween -1 and 1');
    }

    throws(function() {
        layer.getOutputs(weights.slice().push(Math.random()));
    });

    throws(function() {
        layer.getOutputs(weights.slice().pop());
    });

    throws(function() {
        var w = weights.slice()[0] = Math.random();
        layer.getOutputs(w);
    });

});