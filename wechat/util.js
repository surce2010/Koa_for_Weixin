var xml2js = require('xml2js');

exports.parseXMLAsync = function(xml) {
	return new Promise(function(resolve, reject) {
		xml2js.parseString(xml, {
			trim: true,
			explicitArray: false
		}, function(err, content) {
			if (err) {
				reject(err);
			}
			resolve(content);
		});
	});
};