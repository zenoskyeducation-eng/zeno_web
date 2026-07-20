const RESEND_API_KEY = 're_fqkFUP6v_NgiZK8xcb6JRQ8S5gfoUE4Jc';

async function testResend() {
  console.log('Testing new Resend API key...');
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
        subject: 'Test Transmission from New Resend API Key',
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
