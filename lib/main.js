var _ = require("underscore"),
	cell = require("cell"),
	handlebars = require("handlebars");

var defaults = {

};

Main = function( options ){
	// when the middleware is initiated...

	var cerberus = new Cerberus( options );

	return cerberus;
}

var Cerberus = function( options ){
	//fallbacks
	options = options || {};

	this.options = _.extend( defaults, options );

	// return the process method (for Express.js to ping)
	return _.bind( this.process, this );
}

Cerberus.prototype = {

	process: function( req, res ){

	}
};

module.exports = Main;
