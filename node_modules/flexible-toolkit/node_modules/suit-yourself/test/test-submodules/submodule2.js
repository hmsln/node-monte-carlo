'use strict';

module.exports = function (submoduleArgument) {
	return function () {
		return submoduleArgument;
	};
}