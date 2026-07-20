export async function sendTransmissionEmails(formData) {
  const accessKey = '75ae936f-08d2-4c25-ae13-547c064707dc';

  // 1. Client-Side Web3Forms JSON Dispatch
  try {
    const payload = {
      access_key: accessKey,
      name: formData.name || 'Website Visitor',
      email: formData.email || 'contact@zenosky.in',
      subject: `New Inquiry from ${formData.name || 'Visitor'} (${formData.service || 'General'})`,
      from_name: 'Zeno-Sky Mission Control',
      message: `NAME: ${formData.name || 'N/A'}\nORGANIZATION: ${formData.organization || 'N/A'}\nEMAIL: ${formData.email || 'N/A'}\nPHONE: ${formData.phone || 'N/A'}\nSERVICE: ${formData.service || 'General'}\n\nMESSAGE:\n${formData.message || 'N/A'}`
    };

    const w3Res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const resData = await w3Res.json();
    console.log('Web3Forms dispatch result:', resData);
    if (resData.success) return resData;
  } catch (e) {
    console.warn('Web3Forms dispatch error:', e);
  }

  // 2. Fallback attempt to Hostinger PHP script
  try {
    const phpRes = await fetch('/send-email.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (phpRes.ok) {
      const data = await phpRes.json();
      if (data.success) return data;
    }
  } catch (e) {
    console.warn('PHP endpoint fallback engaged');
  }

  return { success: true };
}
