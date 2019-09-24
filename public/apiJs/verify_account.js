console.log('blah')
const token_to_email =  localStorage.getItem('c-token-email');

const  verifyCodeMsg = document.querySelector('[data-verify-code-msg]')
verifyCodeMsg.textContent = `We have sent a pin to ${token_to_email}. Please confirm your email.`;