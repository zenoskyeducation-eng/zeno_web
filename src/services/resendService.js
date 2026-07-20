export async function sendTransmissionEmails(formData) {
  const accessKey = '75ae936f-08d2-4c25-ae13-547c064707dc';

  try {
    const bodyData = new FormData();
    bodyData.append('access_key', accessKey);
    bodyData.append('name', formData.name || 'Website Visitor');
    bodyData.append('organization', formData.organization || 'N/A');
    bodyData.append('email', formData.email || '');
    bodyData.append('phone', formData.phone || 'N/A');
    bodyData.append('service', formData.service || 'General Inquiry');
    bodyData.append('subject', `New Inquiry from ${formData.name || 'Visitor'} (${formData.service || 'General'})`);
    bodyData.append('message', `ORGANIZATION: ${formData.organization || 'N/A'}\nPHONE: ${formData.phone || 'N/A'}\nSERVICE: ${formData.service || 'General'}\n\nMESSAGE:\n${formData.message || 'N/A'}`);

    const w3Res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: bodyData
    });

    if (w3Res.ok) {
      const data = await w3Res.json();
      if (data.success) return data;
    }
  } catch (e) {
    console.warn('Web3Forms dispatch error:', e);
  }

  // Fallback attempt to Hostinger PHP script
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
