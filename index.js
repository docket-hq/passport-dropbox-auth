/**
 * Module dependencies.
 */
var Strategy = require('./strategy');

/**
 * Framework version. ... not sure why this is here but examples have it
 */
require('pkginfo')(module, 'version');

/**
 * Expose constructors.
 */
exports.Strategy = Strategy;