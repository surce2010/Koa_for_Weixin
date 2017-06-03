var createXML= require('./createXML');

function autoReply(message) {
	this.status = 200;
	this.type = 'application/xml';

	if (message.MsgType === 'event') {
		if (message.Event === 'subscribe') {
			if (message.EventKey) {
				console.log('扫码进入');
			}
			var now = new Date().getTime();
			this.body = createXML({
				ToUserName: message.FromUserName,
				FromUserName: message.ToUserName,
				MsgType: 'text',
				Content: 'Hello!!'
			});
			return;
		}else if (message.Event === 'unsubscribe') {
			console.log('取关');
		}else if (message.Event === 'LOCATION') {
			this.body = createXML({
				ToUserName: message.FromUserName,
				FromUserName: message.ToUserName,
				MsgType: 'text',
				Content: `位置：${message.Latitude},${message.Longitude},${message.Precision}`
			});
			return;
		}else if (message.Event === 'CLICK') {
			this.body = createXML({
				ToUserName: message.FromUserName,
				FromUserName: message.ToUserName,
				MsgType: 'text',
				Content: `点击事件`
			});
			return;
		}else if (message.Event === 'SCAN') {
			this.body = createXML({
				ToUserName: message.FromUserName,
				FromUserName: message.ToUserName,
				MsgType: 'text',
				Content: `关注后扫码`
			});
			return;
		}else if (message.Event === 'VIEW') {
			console.log(`点击链接：${message.EventKey}`);
			return;
		}
	}else if (message.MsgType === 'text') {
		var content = message.Content;
		if (content === '1') {
			this.body = createXML({
				ToUserName: message.FromUserName,
				FromUserName: message.ToUserName,
				MsgType: 'text',
				Content: `ahahahahhah`
			});
			return;
		}else if (content === '2') {
			this.body = createXML({
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
			});
			return;
		}else {
			this.body = createXML({
				ToUserName: message.FromUserName,
				FromUserName: message.ToUserName,
				MsgType: 'text',
				Content: `( ⊙ o ⊙ )啊？`
			});
			return;
		}
	}
}

module.exports = autoReply;