'use strict';

describe('suit yourself', function () {
	
  	var suitYourself = require('../src/suit-yourself.js');

  	var path = __dirname + '/test-submodules';

  	var availableSubmodules = {
    	'submodule1': {},
      	'submodule2': {
        	isFactory: true //requiring submodule2 returns a factory thhat can be called to return the actual submodule
      	}
  	};
  
  	//test argument that's going to be passed to submodule2
  	var argument = 'argument';
  
  	//get submodules
  	var submodules = suitYourself(path, availableSubmodules, {
  		requireMode:'specific',
  		requireList: [{
        		name: 'submodule1'
    		},
    		{
        		name: 'submodule2',
        		args: argument
    		}
    	]
    });
  
	it('loads specified submodule', function () {
        expect(submodules.submodule1('argument')).toEqual('argument');
    });
    
    it('loads specified submodule with specified arguments', function () {
        expect(submodules.submodule2()).toEqual('argument');
    });
    
    it('loads both submodules together', function () {
    	expect(submodules.submodule1('argument')).toEqual('argument');
        expect(submodules.submodule2()).toEqual('argument');
    });
});