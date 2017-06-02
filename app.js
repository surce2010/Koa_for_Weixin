var Koa = require('koa');
var path = require('path');
var wechat = require('./wechat/g');
var util =require('./libs/util');
var wechat_file = path.join(__dirname, './config/wechat.txt');
var config = {
	wechat: {
		appID: 'wxbd5496ca8ff2f172',
		appSecret: 'c239146ea79caef703bf7d2b1c33fff1',
		token: 'zhangcui',
		getAccessToken: function() {
			return util.readFileAsync(wechat_file);
		},
		saveAccessToken: function(data) {
			var d = JSON.stringify(data);
			return util.writeFileAsync(wechat_file, d);
		}
	}
};

var app = new Koa();

app.use(wechat(config.wechat));

app.listen(80);