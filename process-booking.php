<?php
// process-booking.php - PHP Handler for Booking Form Submissions

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
$country = isset($_POST['country']) ? trim($_POST['country']) : '';
$date = isset($_POST['date']) ? trim($_POST['date']) : '';
$time = isset($_POST['time']) ? trim($_POST['time']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($country) || empty($date) || empty($time)) {
    echo json_encode(['success' => false, 'message' => 'All required fields must be filled']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Validate date (must be in the future)
$selectedDate = strtotime($date);
$today = strtotime(date('Y-m-d'));
if ($selectedDate <= $today) {
    echo json_encode(['success' => false, 'message' => 'Please select a date in the future']);
    exit;
}

// Email configuration
$to = "support@softmark.com"; // Update this with your actual email
$subject = "New Consultation Booking - SoftMark";

// Format the date and time nicely
$formattedDate = date('l, F j, Y', strtotime($date));
$formattedTime = date('g:i A', strtotime($time));

// Get country name from code
$countries = [
    'US' => 'United States', 'UK' => 'United Kingdom', 'CA' => 'Canada', 'AU' => 'Australia',
    'DE' => 'Germany', 'FR' => 'France', 'IT' => 'Italy', 'ES' => 'Spain', 'NL' => 'Netherlands',
    'SE' => 'Sweden', 'NO' => 'Norway', 'DK' => 'Denmark', 'FI' => 'Finland', 'PL' => 'Poland',
    'CZ' => 'Czech Republic', 'AT' => 'Austria', 'CH' => 'Switzerland', 'BE' => 'Belgium',
    'PT' => 'Portugal', 'IE' => 'Ireland', 'NZ' => 'New Zealand', 'SG' => 'Singapore',
    'JP' => 'Japan', 'KR' => 'South Korea', 'IN' => 'India', 'PK' => 'Pakistan',
    'BD' => 'Bangladesh', 'LK' => 'Sri Lanka', 'AE' => 'United Arab Emirates',
    'SA' => 'Saudi Arabia', 'QA' => 'Qatar', 'KW' => 'Kuwait', 'BH' => 'Bahrain',
    'OM' => 'Oman', 'JO' => 'Jordan', 'LB' => 'Lebanon', 'EG' => 'Egypt', 'MA' => 'Morocco',
    'TN' => 'Tunisia', 'ZA' => 'South Africa', 'NG' => 'Nigeria', 'KE' => 'Kenya',
    'GH' => 'Ghana', 'UG' => 'Uganda', 'TZ' => 'Tanzania', 'RW' => 'Rwanda', 'ET' => 'Ethiopia',
    'BR' => 'Brazil', 'MX' => 'Mexico', 'AR' => 'Argentina', 'CO' => 'Colombia',
    'PE' => 'Peru', 'CL' => 'Chile', 'EC' => 'Ecuador', 'UY' => 'Uruguay', 'PY' => 'Paraguay',
    'BO' => 'Bolivia', 'VE' => 'Venezuela', 'GT' => 'Guatemala', 'HN' => 'Honduras',
    'SV' => 'El Salvador', 'NI' => 'Nicaragua', 'CR' => 'Costa Rica', 'PA' => 'Panama',
    'DO' => 'Dominican Republic', 'JM' => 'Jamaica', 'TT' => 'Trinidad and Tobago',
    'BB' => 'Barbados', 'BS' => 'Bahamas', 'LC' => 'Saint Lucia', 'GD' => 'Grenada',
    'VC' => 'Saint Vincent and the Grenadines', 'AG' => 'Antigua and Barbuda',
    'DM' => 'Dominica', 'KN' => 'Saint Kitts and Nevis'
];
$countryName = isset($countries[$country]) ? $countries[$country] : $country;

// Create email content
$email_content = "
<html>
<head>
    <title>New Consultation Booking</title>
    <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.5; color: #1f2937; margin: 0; padding: 0; background: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #8B5CF6, #6366F1); color: white; padding: 32px; text-align: center; }
        .content { padding: 32px; }
        .booking-card { background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #8B5CF6; }
        .field { margin-bottom: 16px; }
        .label { font-weight: 600; color: #374151; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .value { color: #1f2937; font-size: 14px; }
        .highlight { background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0; }
        .footer { background: #f8fafc; padding: 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1 style='margin: 0; font-size: 24px; font-weight: 700;'>📅 New Consultation Booking</h1>
            <p style='margin: 8px 0 0 0; opacity: 0.9;'>SoftMark Consultation Request</p>
        </div>
        <div class='content'>
            <div class='booking-card'>
                <h2 style='margin: 0 0 16px 0; color: #1f2937; font-size: 18px;'>Client Information</h2>
                <div class='field'>
                    <div class='label'>Full Name</div>
                    <div class='value'>" . htmlspecialchars($name) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Email Address</div>
                    <div class='value'>" . htmlspecialchars($email) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Country</div>
                    <div class='value'>" . htmlspecialchars($countryName) . "</div>
                </div>
            </div>

            <div class='highlight'>
                <h3 style='margin: 0 0 8px 0; color: #92400e; font-size: 16px;'>📅 Scheduled Consultation</h3>
                <div class='field'>
                    <div class='label'>Date & Time</div>
                    <div class='value' style='font-size: 16px; font-weight: 600; color: #1f2937;'>" . htmlspecialchars($formattedDate) . " at " . htmlspecialchars($formattedTime) . "</div>
                </div>
            </div>
            " . (!empty($message) ? "
            <div class='booking-card'>
                <h2 style='margin: 0 0 16px 0; color: #1f2937; font-size: 18px;'>Project Details</h2>
                <div class='field'>
                    <div class='label'>Message</div>
                    <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
            </div>" : "") . "
        </div>
        <div class='footer'>
            <p style='margin: 0 0 8px 0;'>Please confirm this consultation booking within 24 hours.</p>
            <p style='margin: 0; color: #9ca3af;'>Booking received: " . date('M j, Y \a\t g:i A') . " | SoftMark Website</p>
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
        'message' => 'Thank you! Your consultation has been booked successfully. We\'ll send you a confirmation email shortly with the meeting details.'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error booking your consultation. Please try again or contact us directly.'
    ]);
}
?>