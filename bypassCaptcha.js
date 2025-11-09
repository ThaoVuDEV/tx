// Helper function to bypass captcha check for development
function bypassCaptcha() {
    return true; // Always return true to skip captcha validation
}

module.exports = bypassCaptcha;