'use strict';

var customErrorFactory = require('../index.js');

var testErrorType = TypeError;
var testErrorName = 'Invalid_Delay_Granularity_Error';
var testErrorDefaultMessage = 'This is not a recognized time period. Try: \'seconds\', \'minutes\', \'hours\', \'days\', \'weeks\' or \'years\'.';

var testErrorAdditionalProperties = {
	foo: 'bar'
};

var overwritingMessage = 'peekaboo!';

var InvalidDelayGranularityHRError = customErrorFactory(testErrorType,
	testErrorName,
	testErrorDefaultMessage);

describe('custom error factory', function () {
	
	beforeEach(function () {
		
		this.message = '';
		
    	this.addMatchers({
    		//returns true if the object has the same properties as the expected object
      		toHaveProperties: function(expected) {
				
				var message = '';

				var oneNotFound = false;
				
				for (var key in expected) {
					
					if (expected.hasOwnProperty(key) && (!this.actual.hasOwnProperty(key) || expected[key] != this.actual[key])) {	
						oneNotFound = true;	
						message += (message == '' ? '' : ', ');
						message += 'expected ' + expected[key] + ' at key ' + key;
					}
				}
				
				this.message = function () {
					return message;
				}
				
				return !oneNotFound;
			}
      		
    	});
  	});
  	
    describe('with one parameter to constructor (additional properties)', function () {
        var e = new InvalidDelayGranularityHRError(testErrorAdditionalProperties);
        
        it('is an instance of Error', function () {
            expect(e instanceof Error).toEqual(true);
        });
        
        it('is an instance of specified error type', function () {
            expect(e instanceof testErrorType).toEqual(true);
        });
        
        it('has the specified name', function () {
            expect(e.name).toEqual(testErrorName);
        });
        
        it('has a stack property', function () {
            expect(e.stack).not.toBeUndefined();
        });
        
        it('has the specified default message', function () {
            expect(e.message).toEqual(testErrorDefaultMessage);
        });
        
        it('has the specified additional property', function () {
            expect(e).toHaveProperties(testErrorAdditionalProperties);
        });
    });
    
    describe('with two parameters to constructor (additional properties and overwriting message)', function () {

        var e = new InvalidDelayGranularityHRError(testErrorAdditionalProperties, overwritingMessage);
        
        it('has the specified overwriting message', function () {
            expect(e.message).toEqual(overwritingMessage);
        });
        
        it('still has the specified additional property', function () {
            expect(e).toHaveProperties(testErrorAdditionalProperties);
        });
    });
});