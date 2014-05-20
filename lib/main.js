var _ = require("underscore"),
	Cell = require("cell"),
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

	process: function( req, res, next ){
		// record IP
		var ip = this._findIP( req, res );

		next();

	},

	// Private methods

	_findIP: function( req, res ){
		return req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;
	}
};

// Helpers


module.exports = Main;
