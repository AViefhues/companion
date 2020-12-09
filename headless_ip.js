#!/usr/bin/env node
var main = require('./app.js');
var fs = require("fs");
var path = require("path");
var system = main(true);
var os = require('os');
console.log("Starting");
function packageinfo() {
	var self = this;
	var fileContents = fs.readFileSync(__dirname + '/package.json');
	var object = JSON.parse(fileContents);
	return object;
};
var build = fs.readFileSync(__dirname + "/BUILD").toString().trim();
var pkg = packageinfo();
var ifaces = os.networkInterfaces();
if (process.argv.length < 3) {
	console.log("Usage: ./headless.js <address> [port]");
	console.log("");
	console.log("Example: ./headless.js 192.168.81.1");
	process.exit(1);
}
if (process.env.COMPANION_CONFIG_BASEDIR !== undefined) {
	system.emit('skeleton-info', 'configDir', process.env.COMPANION_CONFIG_BASEDIR);
}
else {
	system.emit('skeleton-info', 'configDir', process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] );
}
var port = '8000';
if (process.argv[3] != null) {
		port = process.argv[3];
}
setTimeout(function () {
	system.emit('skeleton-bind-ip', process.argv[2]);
	system.emit('skeleton-bind-port', port);
	system.emit('skeleton-ready');
	console.log("Started");
}, 1000);
