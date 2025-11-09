let svgCaptcha = require('svg-captcha');
let svg2img    = require('svg2img');

let Create = function(client, name){
	let captcha = svgCaptcha.create({background:'#99CC99', noise:0});
	
	// Try svg2img first, fallback to SVG if failed
	svg2img(captcha.data, function(error, buffer) {
		if (error) {
			console.error('svg2img error:', error);
			// Fallback to raw SVG
			client.captcha = captcha.text;
			let data = {};
			data['data'] = 'data:image/svg+xml;base64,' + Buffer.from(captcha.data).toString('base64');
			data['name'] = name;
			client.red({captcha: data});
		} else {
			// Normal PNG processing
			client.captcha = captcha.text;
			let data = {};
			data['data'] = 'data:image/png;base64,' + buffer.toString('base64');
			data['name'] = name;
			client.red({captcha: data});
		}
	});
}

module.exports = function(data){
	switch(data){
		case 'signIn':
			Create(this, 'signIn');
			break;

		case 'signUp':
			Create(this, 'signUp');
			break;

		case 'giftcode':
			Create(this, 'giftcode');
			break;

		case 'forgotpass':
			Create(this, 'forgotpass');
			break;

		case 'transfer':
			Create(this, 'transfer');
			break;

		case 'chargeCard':
			Create(this, 'chargeCard');
			break;

		case 'withdrawXu':
			Create(this, 'withdrawXu');
			break;

		case 'withdrawCard':
			Create(this, 'withdrawCard');
			break;
		case 'momoController':
			Create(this, 'momoController');
			break;
		case 'bankingController':
			Create(this, 'bankingController');
			break;
	}
}