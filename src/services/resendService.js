export async function sendTransmissionEmails(formData) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      // Direct fallback to http://localhost:3001/api/send-email if proxy not configured
      const directRes = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      return await directRes.json();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Proxy request failed, trying direct local backend http://localhost:3001/api/send-email...', error);
    try {
      const directRes = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      return await directRes.json();
    } catch (err) {
      console.error('Final transmission fetch error:', err);
      return { success: false, error: err.message };
    }
  }
}
