var sha1 = require('sha1');
var Wechat = require('./wechat');
var getRawBody = require('raw-body');
var util = require('./util');
var autoReply = require('./autoReply');

module.exports = function(opts) {
	// var wechat = new Wechat(opts);
	// console.log(wechat);
	return function *(next) {
		var token = opts.token;
		var signature = this.query.signature;
		var nonce = this.query.nonce;
		var timestamp = this.query.timestamp;
		var echostr = this.query.echostr;
		var str = [token, timestamp, nonce].sort().join('');
		var sha = sha1(str);

		if (this.method === 'GET') {
			if (sha === signature) {
				this.body = echostr + '';
			}
		}else if (this.method === 'POST') {
			if (sha !== signature) {
				this.body = 'wrong';
				return false;
			}

			var data = yield getRawBody(this.req, {
				length: this.length,
				limit: '1mb',
				encoding: this.charset
			});

			var message = (yield util.parseXMLAsync(data)).xml;
			autoReply.bind(this, message)();
		}
	};
};