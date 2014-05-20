## Cerberus

A middleware that tracks down malicious server activity

![Cerberus logo](http://imgur.com/Ow7ll0i)


## Features

* Recording all client IPs
* Limiting pings per IP (per sec)
* IP whitelist/blacklist


## Install

```
npm install cerberus
```

## Usage

Cerberus is predominantly used as an Express.js middleware
```
var cerberus = require( cerberus );

app.use( cerberus( options ) );
```

You can pass a number of options during initialization to configure the middleware.


## Options

...


## Methods

...


## Credits

Initiated by Makis Tracend ( [@tracend](http://github.com/tracend) )

Distributed through [Makesites.org](http://makesites.org/)


## License

Released under the [MIT license](http://makesites.org/licenses/MIT)
