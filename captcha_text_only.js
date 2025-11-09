// Simple captcha replacement - always return fixed text
let Create = function(client, name){
	console.log('Creating simple text captcha for:', name);
	
	// Set fixed captcha text
	let captchaText = 'toibigay';
	
	// Create a simple text response instead of image
	client.captcha = captchaText;
	let data = {};
	data['data'] = captchaText; // Send text directly
	data['name'] = name;
	console.log('Sending text captcha:', captchaText);
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