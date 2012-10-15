function InvalidArgumentError() {
    Error.apply(this, arguments);
}

InvalidArgumentError.prototype = new Error();
InvalidArgumentError.prototype.constructor = InvalidArgumentError;
InvalidArgumentError.prototype.name = 'InvalidArgumentError';