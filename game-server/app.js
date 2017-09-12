var pomelo = require('pomelo');
var dispatcher = require('./app/util/dispatcher');
var zhuoguiMgr = require('./app/domain/zhuoguiMgr');
// route definition for chat server
var chatRoute = function(session, msg, app, cb) {
  var chatServers = app.getServersByType('chat');

	if(!chatServers || chatServers.length === 0) {
		cb(new Error('can not find chat servers.'));
		return;
	}

	var res = dispatcher.dispatch(session.get('rid'), chatServers);

	cb(null, res.id);
};

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'chatofpomelo-websocket');

// app configuration
app.configure('production|development', 'connector', function(){
	app.set('connectorConfig',
		{
			connector : pomelo.connectors.hybridconnector,
			heartbeat : 3
		});
});

app.configure('production|development', 'gate', function(){
	app.set('connectorConfig',
		{
			connector : pomelo.connectors.hybridconnector,
		});
});

// app configure
app.configure('production|development', function() {
	// route configures
	app.route('chat', chatRoute);

	// filter configures
	app.filter(pomelo.timeout());
});
zhuoguiMgr.getInstance().init(app,2,3);
// start app
app.start();

process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});
