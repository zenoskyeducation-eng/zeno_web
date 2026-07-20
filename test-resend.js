const RESEND_API_KEY = 're_UYu1MErj_LRrSLioUNW9JfjUjZyApesz9';

async function testResend() {
  console.log('Testing Resend API call...');
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Zeno-Sky Mission Control <contact@india.zenosky.in>',
        to: ['contact@zenosky.in'],
        subject: 'Test Transmission from Resend API',
        html: '<p>Test email from Zeno-Sky Aerospace</p>'
      })
    });

    const data = await res.json();
    console.log('Resend API Response Status:', res.status);
    console.log('Resend API Response Data:', data);
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}

testResend();
