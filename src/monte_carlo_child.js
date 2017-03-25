var program = require('./program.js');

process.on('message', function (msg) {
	
	//define bounds
	var nMin = msg[0];
	var nMax = msg[1];
	
	//start at lower bound
	var n = nMin;
	
	//declare the sum of the results of the simulations
	var sum = 0;
	
	while (n <= nMax) {
		
		sum += program(n, [nMin, nMax]);
		
		//only increment if upper bound hasn't been reached yet; else, break loop
		if (n <= nMax){
			n++;
		} else {
			break;
		}
	}
	
	process.send({msg: 'program_ran', sum: sum, nItersDone: nMax - nMin + 1, done: n == nMax});
});