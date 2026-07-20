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

$name = !empty($data['name']) ? htmlspecialchars($data['name']) : 'Website Visitor';
$organization = !empty($data['organization']) ? htmlspecialchars($data['organization']) : 'N/A';
$email = !empty($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : '';
$phone = !empty($data['phone']) ? htmlspecialchars($data['phone']) : 'N/A';
$service = !empty($data['service']) ? htmlspecialchars($data['service']) : 'General Inquiry';
$message = !empty($data['message']) ? htmlspecialchars($data['message']) : 'N/A';

// Check all possible file paths for resend_key.secret on Hostinger
$resendApiKey = '';
$possiblePaths = [
    __DIR__ . '/resend_key.secret',
    isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] . '/resend_key.secret' : '',
    dirname(__DIR__) . '/resend_key.secret'
];

foreach ($possiblePaths as $p) {
    if (!empty($p) && file_exists($p)) {
        $content = trim(file_get_contents($p));
        if (!empty($content)) {
            $resendApiKey = $content;
            break;
        }
    }
}

if (empty($resendApiKey)) {
    $resendApiKey = getenv('RESEND_API_KEY') ?: '';
}

if (empty($resendApiKey)) {
    echo json_encode(['success' => false, 'error' => 'resend_key.secret file not found in public_html root']);
    exit();
}

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
        'to' => is_array($to) ? $to : [$to],
        'subject' => $subject,
        'html' => $html
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);
    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        $error_msg = curl_error($ch);
        curl_close($ch);
        return ['error' => $error_msg];
    }
    curl_close($ch);
    return json_decode($response, true);
}

// 1. Send Admin Email to contact@zenosky.in
$adminResult = sendResendEmail($resendApiKey, $senderEmail, $adminReceiver, "New Transmission - Inquiry from {$name} ({$service})", $adminHtml);

// 2. Send Customer Email if provided
$customerResult = null;
if (!empty($email)) {
    $customerResult = sendResendEmail($resendApiKey, $senderEmail, $email, "Transmission Received - Zeno-Sky Mission Control", $customerHtml);
}

echo json_encode([
    'success' => true,
    'adminResult' => $adminResult,
    'customerResult' => $customerResult
]);
