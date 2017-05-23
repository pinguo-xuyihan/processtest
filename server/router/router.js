var express = require('express');
var parseXml = require('../util/parsexml');
var fs = require('fs');
var child_process = require('child_process');
var CaseConfig = require('../config/const.js').CaseConfig;

// get an instance of the express Router
var router = express.Router();

router.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

router.get('/case-detail/:id', function(req, res) {

	var id = req.params.id;
	var caseDetail = CaseConfig[id];
	if (fs.existsSync(caseDetail.caseLogPath)) {	
		parseXml(caseDetail.caseLogPath).then(function (data) {
			res.json(data);
		}, function (err) {
			res.status(500).send({ message: '500 server error' });
		});
	} else {
		res.status(400).send({ message: 'not ready' });
	}

});

router.get('/start-case/:id', function(req, res) {

	var id = req.params.id;
	var caseDetail = CaseConfig[id];
	child_process.exec(caseDetail.shPath, function (err, result) {
	    console.log(err, result)
	});
	res.json({status: 'start'});

});

router.get('/case-info/:id', function(req, res) {

	var id = req.params.id;
	var caseInfo = CaseConfig[id].caseInfo;
	res.json({caseInfo: caseInfo.caseArr});

});


module.exports = router;