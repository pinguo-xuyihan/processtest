var parseXml = require('./util/parsexml');

parseXml(__dirname + '/util/log.xml').then(function (data) {
	console.log(data);
}, function (err) {
	console.log(err);
});