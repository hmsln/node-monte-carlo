'use strict';

var toolkit = require('flexible-toolkit')();

var child_process = require('child_process');
var os = require('os');

//get number of CPUs for child processes creation
var numCPUs = os.cpus().length;

var MC = function (f, options) {
	
	//declare lower and upper bounds of iterations range
	var nMin;
	var nMax;
	
	this.setProgram = function (newF, options) {
		f = newF;
	}
	
	this.setBounds = function (bound1, bound2) {
		nMin = bound1;
		nMax = bound2;
	}
	
	var MCloop = function () {
		
		//start at lower bound
		var n = nMin;
		
		//declare the sum of the results of the simulations
		var sum = 0;
		
		while (n <= nMax) {
			
			sum += f(n, [nMin, nMax]);
			
			//only increment if upper bound hasn't been reached yet; else, break loop
			if (n <= nMax){
				n++;
			} else {
				break;
			}
		}
		
		return {sum: sum, nIter: n, done: n == nMax};
	}
	
	this.run = function (bound1, bound2) {
		
		//record start time
		var t = Date.now();
		
		//var bounds = [bound2 == undefined ? bound1 : 0, bound2 == undefined ? bound1 : bound2];
		var nIters = bound2 - bound1 + 1; 

		var sum = 0;
		var nItersDone = 0;
		
		var latices = [];
		var n = bound1 - 1;
		var d =  parseInt(nIters / numCPUs);
		
		var conditions = [];
		
		for (let i = 0; i < numCPUs; i++) {
			n += 1;
			latices.push([n, n + d - 1]);
			n += d - 1;
		}

		latices[latices.length - 1][1] += nIters % numCPUs;
		console.log(latices);
		for (let i = 0; i < numCPUs; i++) {
			conditions.push(String(i));
		}
		
		var s = new toolkit['scheduled-action'](conditions, function () {

			//compute estimator
			var estimator = sum / nItersDone;
			
			//record elapsed time, and set it as an attribute of result; time is in milliseconds
			var dt = Date.now() - t;
			
			console.log({estimator: estimator, time: dt / 1000});
		});
		
		for (let i = 0; i < numCPUs; i++) {
			
			var c = child_process.fork('./src/monte_carlo_child.js');
			
			c.send([latices[i][0], latices[i][1]]);
			
			(function (i) {
				c.on('message', function (msg) {
					sum += msg.sum;
					nItersDone += msg.nItersDone;
					s.setTrue(String(i));
				});
			})(i);
		}
		
		return;
	}
	
	//set code at the end of constructor run
	if (f != undefined) {
		this.setProgram(f);
	}
}

module.exports = MC;