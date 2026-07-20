const RESEND_API_KEY = 're_iW7xPSB1_82yaAJgAnVxcVP1VKwHDtqJH';

async function testContactFormDispatch() {
  console.log('Testing new Full Access Resend API key...');
  const formData = {
    name: 'Raj',
    organization: 'SAM SAA',
    email: 'ravirajrtelkar008@gmail.com',
    phone: '8152815260',
    service: 'FreeFlyer Astrodynamics Software',
    message: 'Testing contact form transmission to contact@zenosky.in and customer auto-responder.'
  };

  const adminEmailHtml = `<p><strong>NAME:</strong> ${formData.name}</p><p><strong>ORGANIZATION:</strong> ${formData.organization}</p><p><strong>EMAIL:</strong> ${formData.email}</p><p><strong>PHONE:</strong> ${formData.phone}</p><p><strong>SERVICE:</strong> ${formData.service}</p><p><strong>MESSAGE:</strong> ${formData.message}</p>`;

  const customerEmailHtml = `<p>Thank you ${formData.name}, we received your message: "${formData.message}"</p>`;

  try {
    // 1. Dispatch Admin Email to contact@zenosky.in
    const adminRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Zeno-Sky Mission Control <contact@india.zenosky.in>',
        to: ['contact@zenosky.in'],
        subject: `New Transmission - Inquiry from ${formData.name} (${formData.service})`,
        html: adminEmailHtml
      })
    });
    const adminData = await adminRes.json();
    console.log('Admin Email Status:', adminRes.status, '| Response Data:', adminData);

    // 2. Dispatch Customer Auto-Responder Email to ravirajrtelkar008@gmail.com
    const customerRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Zeno-Sky Mission Control <contact@india.zenosky.in>',
        to: [formData.email],
        subject: `Transmission Received - Zeno-Sky Mission Control`,
        html: customerEmailHtml
      })
    });
    const customerData = await customerRes.json();
    console.log('Customer Email Status:', customerRes.status, '| Response Data:', customerData);

  } catch (err) {
    console.error('Dispatch Error:', err);
  }
}

testContactFormDispatch();
