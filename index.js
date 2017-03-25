'use strict';

var MC = require('./src/run-monte-carlo.js');

module.exports = MC;

var testMC = new MC();
testMC.run(1, 10000000000);