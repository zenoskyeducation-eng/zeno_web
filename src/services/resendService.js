const RESEND_API_KEY = 're_UYu1MErj_LRrSLioUNW9JfjUjZyApesz9';
const SENDER_EMAIL = 'Zeno-Sky Mission Control <contact@india.zenosky.in>';
const ADMIN_RECEIVER = 'contact@zenosky.in';

export async function sendTransmissionEmails(formData) {
  const { name, organization, email, phone, service, message } = formData;

  const adminEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <style>
        body { background-color: #030712; color: #f9fafb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px 15px; margin: 0; }
        .container { max-width: 580px; margin: 0 auto; background: #070e20; border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 16px; padding: 32px; }
        .badge { font-family: monospace; color: #38bdf8; font-size: 11px; letter-spacing: 2px; margin-bottom: 12px; }
        h1 { font-size: 24px; font-weight: 800; margin-top: 0; color: #ffffff; }
        .field-label { font-family: monospace; font-size: 11px; letter-spacing: 1.5px; color: #64748b; margin-top: 20px; text-transform: uppercase; }
        .field-value { font-size: 16px; color: #f1f5f9; margin-top: 4px; font-weight: 500; }
        .link-value { color: #38bdf8; text-decoration: none; }
        .divider { height: 1px; background: rgba(255,255,255,0.1); margin: 24px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="badge">// NEW TRANSMISSION · MISSION CONTROL</div>
        <h1>New Inquiry from Zeno-Sky Website</h1>
        
        <div class="field-label">NAME</div>
        <div class="field-value">${name || 'N/A'}</div>

        <div class="field-label">ORGANIZATION</div>
        <div class="field-value">${organization || 'N/A'}</div>

        <div class="field-label">EMAIL</div>
        <div class="field-value"><a href="mailto:${email}" class="link-value">${email || 'N/A'}</a></div>

        <div class="field-label">PHONE</div>
        <div class="field-value">${phone || 'N/A'}</div>

        <div class="field-label">SERVICE</div>
        <div class="field-value" style="color: #c084fc;">${service || 'General Inquiry'}</div>

        <div class="divider"></div>

        <div class="field-label">MESSAGE</div>
        <div class="field-value" style="white-space: pre-wrap;">${message || 'N/A'}</div>
      </div>
    </body>
    </html>
  `;

  const customerEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <style>
        body { background-color: #030712; color: #f9fafb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px 15px; margin: 0; }
        .card { max-width: 580px; margin: 0 auto; background: #070e20; border: 1.5px solid #38bdf8; border-radius: 20px; padding: 36px; box-shadow: 0 0 30px rgba(56, 189, 248, 0.2); }
        .badge { font-family: monospace; color: #38bdf8; font-size: 11px; letter-spacing: 2.5px; margin-bottom: 16px; }
        h1 { font-size: 26px; font-weight: 800; margin-top: 0; color: #ffffff; }
        p { font-size: 15px; color: #cbd5e1; line-height: 1.6; }
        .msg-box { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; padding: 18px; margin: 24px 0; }
        .msg-title { font-family: monospace; font-size: 10px; color: #38bdf8; letter-spacing: 2px; margin-bottom: 8px; }
        .msg-content { color: #f8fafc; font-size: 14px; }
        .divider { height: 1px; background: rgba(255,255,255,0.08); margin: 28px 0 20px 0; }
        .footer-brand { font-weight: 800; font-size: 14px; letter-spacing: 1px; color: #ffffff; }
        .footer-sub { font-size: 12px; color: #94a3b8; margin-top: 2px; }
        .contact-row { margin-top: 14px; font-size: 12px; color: #38bdf8; }
        .bottom-tag { text-align: center; margin-top: 20px; font-family: monospace; font-size: 10px; color: #64748b; letter-spacing: 3px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">// TRANSMISSION RECEIVED</div>
        <h1>Thank you, ${name || 'Explorer'}.</h1>
        <p>We've received your signal at Mission Control. A Zeno-Sky specialist will get back to you within 24 hours (Earth time).</p>
        
        <div class="msg-box">
          <div class="msg-title">// YOUR MESSAGE</div>
          <div class="msg-content">${message || 'N/A'}</div>
        </div>

        <p style="font-size: 13px; color: #94a3b8;">
          Meanwhile, explore our capabilities at <a href="https://zenosky.in" style="color: #38bdf8; text-decoration: none;">zenosky.in</a> or reply directly to this email.
        </p>

        <div class="divider"></div>

        <div class="footer-brand">ZENOSKY AEROSPACE & DEFENCE</div>
        <div class="footer-sub">Engineering the Future of Space Missions</div>
        <div class="contact-row">
          📧 contact@zenosky.in &nbsp;|&nbsp; 📞 +91-8660260911 &nbsp;|&nbsp; 🌐 zenosky.in &nbsp;|&nbsp; 📍 Delhi & Bangalore, India
        </div>
      </div>
      <div class="bottom-tag">ISRO SPACE TUTOR CERTIFIED &nbsp;·&nbsp; MISSION READY</div>
    </body>
    </html>
  `;

  // 1. Attempt backend node server endpoint first
  try {
    const backendRes = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (backendRes.ok) {
      const data = await backendRes.json();
      if (data.success) return data;
    }
  } catch (e) {
    console.warn('Backend endpoint unavailable, using direct Resend API transmission');
  }

  // 2. Direct Resend API Transmission for Hostinger static deployment
  try {
    const adminFetch = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [ADMIN_RECEIVER],
        subject: `New Transmission - Inquiry from ${name || 'Website Visitor'} (${service})`,
        html: adminEmailHtml
      })
    });

    const customerFetch = email ? fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [email],
        subject: `Transmission Received - Zeno-Sky Mission Control`,
        html: customerEmailHtml
      })
    }) : Promise.resolve();

    const [adminRes] = await Promise.all([adminFetch, customerFetch]);
    const adminData = await adminRes?.json();
    return { success: true, adminId: adminData?.id };
  } catch (err) {
    console.error('Direct Resend API Error:', err);
    return { success: false, error: err.message };
  }
}
