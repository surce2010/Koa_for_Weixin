var createXML= require('./createXML');

function autoReply(message, wechat) {
	if (message.MsgType === 'event') {
		if (message.Event === 'subscribe') {
			if (message.EventKey) {
				console.log('扫码进入');
			}
			var now = new Date().getTime();
			return Promise.resolve(createXML({
				ToUserName: message.FromUserName,
				FromUserName: message.ToUserName,
				MsgType: 'text',
				Content: 'Hello!!'
			}));
		}else if (message.Event === 'unsubscribe') {
			console.log('取关');
		}else if (message.Event === 'LOCATION') {
			return Promise.resolve(createXML({
				ToUserName: message.FromUserName,
				FromUserName: message.ToUserName,
				MsgType: 'text',
				Content: `位置：${message.Latitude},${message.Longitude},${message.Precision}`
			}));
		}else if (message.Event === 'CLICK') {
			return Promise.resolve(createXML({
				ToUserName: message.FromUserName,
				FromUserName: message.ToUserName,
				MsgType: 'text',
				Content: `点击事件`
			}));
		}else if (message.Event === 'SCAN') {
			return Promise.resolve(createXML({
				ToUserName: message.FromUserName,
				FromUserName: message.ToUserName,
				MsgType: 'text',
				Content: `关注后扫码`
			}));
		}else if (message.Event === 'VIEW') {
			console.log(`点击链接：${message.EventKey}`);
		}
	}else if (message.MsgType === 'text') {
		var content = message.Content;
		if (content === '1') {
			return Promise.resolve(createXML({
				ToUserName: message.FromUserName,
				FromUserName: message.ToUserName,
				MsgType: 'text',
				Content: `ahahahahhah`
			}));
		}else if (content === '2') {
			return Promise.resolve(createXML({
				ToUserName: message.FromUserName,
				FromUserName: message.ToUserName,
				MsgType: 'news',
				Articles: [
					{
						Title: '张璀测试',
						Description: '图文消息描述',
						PicUrl: 'http://f10.baidu.com/it/u=3038573891,4200009349&fm=72',
						Url: 'http://www.baidu.com'
					},
					{
						Title: '张璀测试',
						Description: '图文消息描述',
						PicUrl: 'http://f10.baidu.com/it/u=3038573891,4200009349&fm=72',
						Url: 'http://www.baidu.com'
					}
				]
			}));
		}else if (content === '5') {
			return new Promise(function(resolve, reject) {
				wechat.uploadMaterial('image', __dirname + '/2.png')
				.then(function(data) {
					var xml = createXML({
						ToUserName: message.FromUserName,
						FromUserName: message.ToUserName,
						MsgType: 'image',
						MediaId: data.media_id
					});
					resolve(xml);
				});
			});
		}else {
			return Promise.resolve(createXML({
				ToUserName: message.FromUserName,
				FromUserName: message.ToUserName,
				MsgType: 'text',
				Content: `( ⊙ o ⊙ )啊？`
			}));
		}
	}
}

module.exports = autoReply;