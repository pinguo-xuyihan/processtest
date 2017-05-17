var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();

function parseXml (filename) {
	return new Promise(function (resolve, reject) {	
		var caseDetail = [];
		fs.readFile(filename, function(err, data) {
			if (err) {
				reject(err);
				return;
			}
		    parser.parseString(data, function (err, result) {
		    	if (err) {
		    		reject(err);
		    		return;
		    	}
		        result.testsuites.testsuite[0].testcase.forEach(function (caseItem) {
		        	var tmp = {};
		        	tmp.caseName = caseItem['$'].name;
		        	tmp.state = caseItem.failure && caseItem.failure.length ? 'failture' : 'success';
		        	tmp.failure = tmp.state === 'failture' ? caseItem.failure[0] : null;
		        	tmp.lastTime = caseItem['$'].time;

		        	caseDetail.push(tmp);
		        });

		        resolve(caseDetail);
		    });
		});
	});
}

module.exports = parseXml;
