'use strict';

var customErrorFactory = require('custom-error-factory');

module.exports = function () {
	
	//define custom error
	var InvalidParametersError = customErrorFactory(TypeError,
		'Invalid_Parameters_Error',
		'Invalid parameters have been passed to module suit-yourself');
		
	//turns arguments into an actual array for convenience's sake
    var args = Array().slice.call(arguments);
    
  	//get path of folder containing submodules
	var path = args[0];   
    
    //list of available submodules
    var availableSubmodules = args[1];
	
	//isolate remaining arguments
	var toRequireArgs = args.slice(2);
	
  	//if path or availableSUbmodules is undefined, we can't proceed further: throw error
	if (path === undefined || availableSubmodules === undefined || toRequireArgs === undefined) {
		throw new InvalidParametersError();
	}
	
	//arguments to pass to submodules
	var toRequire = [];
	
	//check that t
    if (Object.prototype.toString.call(toRequireArgs[0]) === '[object Object]') {    
		//if only some submodules are to be required: store the list passed as argument
    	if (toRequireArgs[0].requireMode === 'specific') {
    		toRequire = toRequireArgs[0].requireList;
    	} else if (toRequireArgs[0].requireMode === 'all') {//if all submodules are to be required
    		//passed arguments are to be applied to all submodules
    		for (var name in availableSubmodules) {
            	toRequire.push({name: name, args: toRequireArgs[0].args});
        	}
    	} else {
    		throw new InvalidParametersError();
    	}
    } else {
		throw new InvalidParametersError();
	}
    
    //object containing the submodules that are to be returned
    var toReturn = {};
    
	//require submodules from
    toRequire.forEach(function (s) {
    
		//require submodule
    	var submodule =  require(path + '/' + s.name + '.js');
    	
    	//if 'require' returns a factory, and arguments are to be passed, call it with those arguments
    	if (availableSubmodules[s.name].isFactory === true && s.args) {
    	
    		//if arguments aren't already an array, place them in one
    		toRequire[s.name] = Object.prototype.toString.call(s.args) != '[object Array]' ?
    			[s.args]:
    			s.args;
			
			//apply arguments to the factory that was supplied by the 'require' call
    		toReturn[s.name] = submodule.apply(null, toRequire[s.name]);
    	} else {
    		//else, just return the submodule
    		toReturn[s.name] = submodule;	
    	}
	});
	
    return toReturn;
};