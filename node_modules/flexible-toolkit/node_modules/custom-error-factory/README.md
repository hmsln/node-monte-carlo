# Custom Error Factory

```custom-error-factory``` is an open source module that exposes a factory function to create instantiable custom error classes, extending native error types.

Using custom error classes allows you to store more information,a nd in a clearer way, than in a standard object. This can make custom errors easier to retrieve and analyse once being logged.

Install with the command ```npm install custom-error-factory```

## Creating a custom error class

You can create a custom error type using the function ```customErrorFactory```,
which returns the constructor of the custom error class.

```js
//built-in error class to inherit from
var type = TypeError;

//custom error name
var name = 'Invalid_Delay_Granularity_Error';

//custom error message (can be overwritten at the instance level)
var defaultMessage = 'This is not a recognized time period. Try: \'seconds\', \'minutes\', \'hours\'.';

var InvalidDelayGranularityError = customErrorFactory(type,
	name,
	defaultMessage);
```

You can then create an instance of this custom error class:

```js
var e = new InvalidDelayGranularityHRError();
```

You can pass additional properties to the constructor:
```js
var obj = {
	foo: 'bar'
};

var e = new InvalidDelayGranularityError(obj);
```

You can also overwrite the default message:

```js
var e = new InvalidDelayGranularityHRError('overwritten message');
```

And also overwrite the default message and pass additional properties at the same time:

```js
var obj = {
	foo: 'bar'
};

var e = new InvalidDelayGranularityHRError(obj, 'overwritten message');
```

## Tests

The test spec is in ```/test/test.spec.js```, and the test suite is ```jasmine-node```, which you can install by
running ```npm install -g jasmine-node```

You can run the tests with the commands ```jasmine-node test``` or ```npm run test```

## To do

Perhaps some integration with an error logging library? This would be a good way to leverage the extra information
that can be stored in a custom error object.

Thank you for reading this far. If you have any bugs to report or improvements to suggest you can send me an email
at hubert.maslin@gmail.com.