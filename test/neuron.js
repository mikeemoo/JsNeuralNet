var neuron = new Neuron(10);
var inputs = [
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random()
];
var output = neuron.output(inputs);

test("Validate neuron", function () {

    strictEqual(neuron.weights.length, 10, "The neuron has 10 weights");
    strictEqual(typeof output, "number", "The output is a number");
    ok(output >= -1 && output <= 1, "The output should be between -1 and 1");

    inputs.push(Math.random());

    throws(function() {
        neuron.output(inputs);
    }, 'output() with an inccorect number of arguments throws an InvalidArgumentError');

});