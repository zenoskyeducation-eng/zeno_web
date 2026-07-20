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

$adminReceiver = 'contact@zenosky.in';
$subject = "New Inquiry from {$name} ({$service})";

$adminBody = "========================================\n";
$adminBody .= "ZENOSKY MISSION CONTROL - NEW TRANSMISSION\n";
$adminBody .= "========================================\n\n";
$adminBody .= "NAME: {$name}\n";
$adminBody .= "ORGANIZATION: {$organization}\n";
$adminBody .= "EMAIL: {$email}\n";
$adminBody .= "PHONE: {$phone}\n";
$adminBody .= "SERVICE: {$service}\n\n";
$adminBody .= "MESSAGE:\n{$message}\n\n";
$adminBody .= "========================================\n";

$headers = "From: Zeno-Sky Mission Control <contact@zenosky.in>\r\n";
if (!empty($email)) {
    $headers .= "Reply-To: {$email}\r\n";
}
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 1. Send Admin Email via Hostinger Native mail()
$adminSent = @mail($adminReceiver, $subject, $adminBody, $headers);

// 2. Send Customer Auto-Responder via Hostinger Native mail() if email provided
$customerSent = false;
if (!empty($email)) {
    $customerSubject = "Transmission Received - Zeno-Sky Mission Control";
    $customerBody = "Thank you, {$name}.\n\nWe have received your signal at Mission Control. A Zeno-Sky specialist will get back to you within 24 hours.\n\nYOUR MESSAGE:\n{$message}\n\n---\nZENOSKY AEROSPACE & DEFENCE\nEngineering the Future of Space Missions\nhttps://zenosky.in\n";
    $customerHeaders = "From: Zeno-Sky Mission Control <contact@zenosky.in>\r\nContent-Type: text/plain; charset=UTF-8\r\n";
    $customerSent = @mail($email, $customerSubject, $customerBody, $customerHeaders);
}

// 3. Fallback: If cURL Resend key exists, also try Resend
$possiblePaths = [
    __DIR__ . '/resend_key.secret',
    isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] . '/resend_key.secret' : ''
];

foreach ($possiblePaths as $p) {
    if (!empty($p) && file_exists($p)) {
        $resendApiKey = trim(file_get_contents($p));
        if (!empty($resendApiKey)) {
            $ch = curl_init('https://api.resend.com/emails');
            $payload = json_encode([
                'from' => 'Zeno-Sky Mission Control <contact@india.zenosky.in>',
                'to' => [$adminReceiver],
                'subject' => $subject,
                'html' => "<p><strong>NAME:</strong> {$name}</p><p><strong>ORGANIZATION:</strong> {$organization}</p><p><strong>EMAIL:</strong> {$email}</p><p><strong>PHONE:</strong> {$phone}</p><p><strong>SERVICE:</strong> {$service}</p><p><strong>MESSAGE:</strong> {$message}</p>"
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $resendApiKey
            ]);
            curl_exec($ch);
            curl_close($ch);
            break;
        }
    }
}

echo json_encode([
    'success' => true,
    'adminSent' => $adminSent,
    'customerSent' => $customerSent
]);
