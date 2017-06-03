var request = require('request-promise');

var prefix = 'https://api.weixin.qq.com/cgi-bin';
var api = {
	accessToken: prefix + '/token?grant_type=client_credential'
};

function Wechat(opts) {
	var that = this;
	this.appID = opts.appID;
	this.appSecret = opts.appSecret;
	this.getAccessToken = opts.getAccessToken;
	this.saveAccessToken = opts.saveAccessToken;

	this.getAccessToken()
		.then(function(data) {
			try {
				data = JSON.parse(data);
				console.log('1',data);
			} catch(e) {
				console.log('2','update');
				return that.updateAccessToken();
			}
			if (that.isValidAccessToken(data)) {
				return Promise.resolve(data);
			}else {
				return that.updateAccessToken();
			}
		})
		.then(function(data) {
			that.access_token = data.access_token;
			that.expires_in = data.expires_in;
			console.log('access_token',that.access_token);
			console.log('expires_in',that.expires_in);
			that.saveAccessToken(data);
		});
}
Wechat.prototype.isValidAccessToken = function(data) {
	if (!data || !data.access_token || !data.expires_in) {
		return false;
	}
	console.log('4', data);
	var access_token = data.access_token;
	var expires_in = data.expires_in;
	var now = (new Date().getTime());
	if (now < expires_in) {
		console.log('true');
		return true;
	}else {
		console.log('false');
		return false;
	}
};
Wechat.prototype.updateAccessToken = function() {
	var appID = this.appID;
	var appSecret = this.appSecret;
	var url = api.accessToken + `&appid=${appID}&secret=${appSecret}`;

	return new Promise(function(resolve, reject) {
		request({url: url, json: true}).then(function(response) {
			console.log('3', response);
			var data = response;
			var now = new Date().getTime();
			var expires_in = now + data.expires_in*1000 - 20*1000;
			data.expires_in = expires_in;
			resolve(data);
		});
	});
	
};

module.exports = Wechat;