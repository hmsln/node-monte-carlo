# Suit Yourself

```suit-yourself``` is an open source module that allows you to load submodules selectively from a source folder, and to pass parameters to them.

## Example
```javascript
var suitYourself = require('suit-yourself');

//path of the folder containing the submodules
var path = __dirname + '/submodules';

//available submodules
var availableSubmodules = {
	'submodule1': {},
    'submodule2': {
    	isFactory: true//indicates that sumodule2 returns a factory
    }
};

/*
object containing information about which submodules are to be required, and what arguments are to be passed to the submodules which return factories
*/
var toRequire = {
	//in 'specific' mode, submodules to require are listed in requireList; see below for 'all' mode
	requireMode: 'specific',
	//list of submodules to require, with arguments to pass
	requireList:[{
       name: 'submodule1'
    }, {
        name: 'submodule2',
        args: 'argument_to_this_submodule'
    }]
};

//import the submodules
var submodules = suitYourself(path, availableSubmodules, toRequire);
//use the submodules
//submodules.submodule1...
//submodules.submodule2...
```
### Require all submodules:
As seen above, submodules can be required one by one, with arguments being specified for each submodule; but you can also require all of them, and pass the same arguments to all which return factories.

To do this, the ```toRequire``` object should have this form:
```javascript
var toRequire = {
	//in 'all' mode, all submodules are required
	requireMode: 'all',
	//optional, this value is passed to all the submodules which return factories
	args: 'argument_to_all_submodules'
};
```

## Tests

The test spec is in ```/test/test.spec.js```, and the test suite is ```jasmine-node```, which you can install by
running ```npm install -g jasmine-node```

You can run the tests with the commands ```jasmine-node test``` or ```npm run test```

## Contact
Thank you for reading this far. If you have any bugs to report or improvements to suggest you can send me an email
at hubert.maslin@gmail.com.