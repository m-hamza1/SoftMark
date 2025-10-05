<?php
// process-form.php - PHP Mailer for Form Submissions

// Set headers for CORS and JSON response
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$company = isset($_POST['company']) ? trim($_POST['company']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
if (empty($name) || empty($email)) {
    echo json_encode(['success' => false, 'message' => 'Name and Email are required']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Email configuration
$to = "support@softmark.com"; // Update this with your actual email
$subject = "New Free Trial Request - SoftMark";

// Create email content
$email_content = "
<html>
<head>
    <title>New Free Trial Request</title>
    <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.5; color: #1f2937; margin: 0; padding: 0; background: #f8fafc; }
        .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #8B5CF6, #6366F1); color: white; padding: 24px; text-align: center; }
        .content { padding: 24px; }
        .field { margin-bottom: 16px; padding: 12px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #8B5CF6; }
        .label { font-weight: 600; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .value { color: #1f2937; font-size: 14px; }
        .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1 style='margin: 0; font-size: 20px; font-weight: 700;'>🎉 New Trial Request</h1>
            <p style='margin: 8px 0 0 0; opacity: 0.9;'>SoftMark Free Trial Signup</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Full Name</div>
                <div class='value'>" . htmlspecialchars($name) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Email Address</div>
                <div class='value'>" . htmlspecialchars($email) . "</div>
            </div>
            " . (!empty($phone) ? "
            <div class='field'>
                <div class='label'>Phone Number</div>
                <div class='value'>" . htmlspecialchars($phone) . "</div>
            </div>" : "") . "
            " . (!empty($company) ? "
            <div class='field'>
                <div class='label'>Company</div>
                <div class='value'>" . htmlspecialchars($company) . "</div>
            </div>" : "") . "
            " . (!empty($message) ? "
            <div class='field'>
                <div class='label'>Message</div>
                <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>" : "") . "
        </div>
        <div class='footer'>
            Received: " . date('M j, Y \a\t g:i A') . " | SoftMark Website
        </div>
    </div>
</body>
</html>";

// Email headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: SoftMark Support <support@softmark.com>" . "\r\n"; // Company email
$headers .= "Reply-To: " . $email . "\r\n";

// Send email
if (mail($to, $subject, $email_content, $headers)) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your free trial request has been submitted successfully. We\'ll contact you soon!'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    ]);
}
?>