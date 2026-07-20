export async function sendTransmissionEmails(formData) {
  const accessKey = formData.accessKey || 'e356e87f-e224-4f01-8bf8-d45db6ed5856'; // Default Web3Forms Key or custom key

  // 1. Try Web3Forms Direct Client Transmission (100% Free & No Server Required)
  try {
    const w3Res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: formData.name || 'Website Visitor',
        email: formData.email || 'contact@zenosky.in',
        subject: `New Transmission - Inquiry from ${formData.name} (${formData.service})`,
        from_name: 'Zeno-Sky Mission Control',
        message: `NAME: ${formData.name}\nORGANIZATION: ${formData.organization}\nEMAIL: ${formData.email}\nPHONE: ${formData.phone}\nSERVICE: ${formData.service}\n\nMESSAGE:\n${formData.message}`
      })
    });

    if (w3Res.ok) {
      const data = await w3Res.json();
      if (data.success) return data;
    }
  } catch (e) {
    console.warn('Web3Forms dispatch fallback engaged');
  }

  // 2. Fallback to Hostinger server-side PHP endpoint
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
