const captcha = require('./captcha.js');

// Mock client object for testing
const mockClient = {
    captcha: '',
    red: function(data) {
        console.log('Captcha generated successfully!');
        console.log('Captcha text:', this.captcha);
        console.log('Data type:', data.captcha.data.substring(0, 50) + '...');
        console.log('Name:', data.captcha.name);
        console.log('Full SVG preview:', Buffer.from(data.captcha.data.split(',')[1], 'base64').toString());
    }
};

// Test captcha generation
console.log('Testing fixed captcha generation...');
captcha.call(mockClient, 'signUp');