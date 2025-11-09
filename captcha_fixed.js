let svgCaptcha = require('svg-captcha');

let Create = function(client, name){
	// Set fixed captcha text for testing
	let captchaText = 'toilagay';
	
	// Create a simple SVG with the fixed text
	let svgData = `<svg width="150" height="50" xmlns="http://www.w3.org/2000/svg">
		<rect width="150" height="50" fill="#99CC99"/>
		<text x="75" y="30" font-family="Arial, sans-serif" font-size="20" fill="black" text-anchor="middle" dominant-baseline="middle">${captchaText}</text>
	</svg>`;
	
	client.captcha = captchaText;
	let data = {};
	data['data'] = 'data:image/svg+xml;base64,' + Buffer.from(svgData).toString('base64');
	data['name'] = name;
	client.red({captcha: data});
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