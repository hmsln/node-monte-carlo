'use-strict';

//definition of factory function
var customErrorFactory = function (TypeOfError, name, defaultMessage) {
    
    //has a default message been passed as argument?
    var _defaultMessage = defaultMessage == undefined ? '' : defaultMessage;
    
    //definition of the constructor to return
    var CustomError = function () {
        
		//name of custom error
		this.name = name;
        
		//default message of custom error
		this.message = _defaultMessage;
		
        var additionalproperties = {};
        
        /*
        -if an object has been passed as first argument, use it to set additional properties to instance
        -if a string has been passed as first argument, use it to overwrite default message
        */
		if (Object.prototype.toString.call(arguments[0]) == '[object Object]') {
            
			additionalproperties = arguments[0];
            //if a string has been passed as second argument, use it to overwrite default message
            if (Object.prototype.toString.call(arguments[1]) == '[object String]') {
                this.message = arguments[1];
            }
        } else if (Object.prototype.toString.call(arguments[0]) == '[object String]') {
            this.message = arguments[0];
        }
        
        //set additional properties if there are any
		for (var key in additionalproperties) {
			if (additionalproperties.hasOwnProperty(key)) {
				this[key] = additionalproperties[key];
			}
		}
		
        /*
        bind stack trace to instance, without capturing the lines where CustomError is defined, so the stack trace
        stops at the line where custom error is thrown
        */
       	Error.captureStackTrace(this, CustomError);
	}
    
    //custom error object inherits from parent error type
    CustomError.prototype = Object.create(TypeOfError.prototype);
	CustomError.prototype.constructor = CustomError;
    
    //overload toString method so custom error name is printed out as well
    CustomError.prototype.toString = function() {
    	return this.name + ' : ' + '\n' + this.stack;
	}
    
	//return custom error constructor
    return CustomError;
}

//export factory
module.exports = customErrorFactory;