var _ = require("underscore"),
	Cell = require("cell"),
	handlebars = require("handlebars");

var defaults = {
	store: "cerberus.db",
	pingLimit: 20 // per second (per IP)
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

	// initiate store
	this.store = new Cell({ store: this.options.store });

	// return the process method (for Express.js to ping)
	return _.bind( this.process, this );
}

Cerberus.prototype = {

	process: function( req, res, next ){
		// record IP
		var ip = this._findIP( req, res );

		// check latest ping
		this.check( ip, function( valid ){
			if( valid ){
				next();
			} else {
				res.end(); // error message?
			}
		});

	},

	check: function( ip, callback ){
		// variables
		var self = this;
		var data = {};
		var now = (new Date()).getTime();

		data[ip] = {
			timestamp: now
		};

		// first get the latest data for the IP
		this.store.get( ip, function( record ){
			if( !record ){
				data.pings = 1;
				self.store.set(data); // no wait?
				return callback(true);
			}
			data = _.extend({}, record, data);
			data.pings++;
			//
			// allow upto pingLimit pings ( using milliseconds)
			if( now - record.timestamp < (1000 / this.options.pingLimit) ){
				callback(false);
			} else {
				callback(true);
			}
		});

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
