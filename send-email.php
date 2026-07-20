<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(['success' => false, 'error' => 'Invalid JSON input']);
    exit();
}

$name = isset($data['name']) ? htmlspecialchars($data['name']) : 'N/A';
$organization = isset($data['organization']) ? htmlspecialchars($data['organization']) : 'N/A';
$email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : '';
$phone = isset($data['phone']) ? htmlspecialchars($data['phone']) : 'N/A';
$service = isset($data['service']) ? htmlspecialchars($data['service']) : 'General Inquiry';
$message = isset($data['message']) ? htmlspecialchars($data['message']) : 'N/A';

$resendApiKey = 're_UYu1MErj_LRrSLioUNW9JfjUjZyApesz9';
$senderEmail = 'Zeno-Sky Mission Control <contact@india.zenosky.in>';
$adminReceiver = 'contact@zenosky.in';

$adminHtml = "
<!DOCTYPE html>
<html>
<head><meta charset='utf-8'/></head>
<body style='background-color:#030712; color:#f9fafb; font-family:sans-serif; padding:30px 15px;'>
  <div style='max-width:580px; margin:0 auto; background:#070e20; border:1px solid rgba(56,189,248,0.3); border-radius:16px; padding:32px;'>
    <div style='font-family:monospace; color:#38bdf8; font-size:11px; letter-spacing:2px;'>// NEW TRANSMISSION · MISSION CONTROL</div>
    <h1 style='font-size:24px; color:#fff;'>New Inquiry from Zeno-Sky Website</h1>
    <div style='font-family:monospace; font-size:11px; color:#64748b; margin-top:16px;'>NAME</div>
    <div style='font-size:16px; color:#f1f5f9;'>{$name}</div>
    <div style='font-family:monospace; font-size:11px; color:#64748b; margin-top:16px;'>ORGANIZATION</div>
    <div style='font-size:16px; color:#f1f5f9;'>{$organization}</div>
    <div style='font-family:monospace; font-size:11px; color:#64748b; margin-top:16px;'>EMAIL</div>
    <div style='font-size:16px; color:#38bdf8;'>{$email}</div>
    <div style='font-family:monospace; font-size:11px; color:#64748b; margin-top:16px;'>PHONE</div>
    <div style='font-size:16px; color:#f1f5f9;'>{$phone}</div>
    <div style='font-family:monospace; font-size:11px; color:#64748b; margin-top:16px;'>SERVICE</div>
    <div style='font-size:16px; color:#c084fc;'>{$service}</div>
    <hr style='border:none; height:1px; background:rgba(255,255,255,0.1); margin:24px 0;'/>
    <div style='font-family:monospace; font-size:11px; color:#64748b;'>MESSAGE</div>
    <div style='font-size:15px; color:#f8fafc; white-space:pre-wrap;'>{$message}</div>
  </div>
</body>
</html>
";

$customerHtml = "
<!DOCTYPE html>
<html>
<head><meta charset='utf-8'/></head>
<body style='background-color:#030712; color:#f9fafb; font-family:sans-serif; padding:30px 15px;'>
  <div style='max-width:580px; margin:0 auto; background:#070e20; border:1.5px solid #38bdf8; border-radius:20px; padding:36px;'>
    <div style='font-family:monospace; color:#38bdf8; font-size:11px; letter-spacing:2.5px;'>// TRANSMISSION RECEIVED</div>
    <h1 style='font-size:26px; color:#fff;'>Thank you, {$name}.</h1>
    <p style='color:#cbd5e1;'>We've received your signal at Mission Control. A Zeno-Sky specialist will get back to you within 24 hours (Earth time).</p>
    <div style='background:rgba(255,255,255,0.03); border:1px solid rgba(56,189,248,0.3); border-radius:12px; padding:18px; margin:24px 0;'>
      <div style='font-family:monospace; font-size:10px; color:#38bdf8;'>// YOUR MESSAGE</div>
      <div style='color:#f8fafc;'>{$message}</div>
    </div>
    <hr style='border:none; height:1px; background:rgba(255,255,255,0.08); margin:28px 0 20px 0;'/>
    <div style='font-weight:800; color:#fff;'>ZENOSKY AEROSPACE & DEFENCE</div>
    <div style='font-size:12px; color:#94a3b8;'>Engineering the Future of Space Missions</div>
  </div>
</body>
</html>
";

// Helper function to send email via Resend API
function sendResendEmail($apiKey, $from, $to, $subject, $html) {
    $ch = curl_init('https://api.resend.com/emails');
    $payload = json_encode([
        'from' => $from,
        'to' => [$to],
        'subject' => $subject,
        'html' => $html
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response, true);
}

// 1. Send Admin Email
$adminResult = sendResendEmail($resendApiKey, $senderEmail, $adminReceiver, "New Transmission - Inquiry from {$name} ({$service})", $adminHtml);

// 2. Send Customer Email if provided
$customerResult = null;
if (!empty($email)) {
    $customerResult = sendResendEmail($resendApiKey, $senderEmail, $email, "Transmission Received - Zeno-Sky Mission Control", $customerHtml);
}

echo json_encode([
    'success' => true,
    'adminId' => isset($adminResult['id']) ? $adminResult['id'] : null,
    'customerId' => isset($customerResult['id']) ? $customerResult['id'] : null
]);
