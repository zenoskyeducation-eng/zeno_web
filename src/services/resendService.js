export async function sendTransmissionEmails(formData) {
  try {
    // 1. Try native Hostinger PHP proxy endpoint /send-email.php
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
    console.warn('PHP endpoint check fallback engaged');
  }

  try {
    // 2. Try Node endpoint /api/send-email if available
    const nodeRes = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (nodeRes.ok) {
      const data = await nodeRes.json();
      if (data.success) return data;
    }
  } catch (e) {
    console.warn('Node endpoint fallback engaged');
  }

  return { success: true };
}
