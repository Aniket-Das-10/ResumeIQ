export function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

export function getOTPHtml(email, otp) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification - ResumeIQ</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f7fa;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            }
            .header {
                background-color: #4f46e5;
                padding: 30px;
                text-align: center;
                color: #ffffff;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 700;
                letter-spacing: 1px;
            }
            .content {
                padding: 40px;
                text-align: center;
            }
            .content h2 {
                color: #111827;
                margin-top: 0;
                font-size: 20px;
            }
            .content p {
                line-height: 1.6;
                color: #6b7280;
                font-size: 16px;
            }
            .otp-code {
                display: inline-block;
                margin: 30px 0;
                padding: 15px 30px;
                background-color: #f3f4f6;
                border: 2px dashed #4f46e5;
                border-radius: 12px;
                font-size: 32px;
                font-weight: 800;
                color: #4f46e5;
                letter-spacing: 8px;
            }
            .footer {
                padding: 20px;
                text-align: center;
                background-color: #f9fafb;
                color: #9ca3af;
                font-size: 12px;
            }
            .footer a {
                color: #4f46e5;
                text-decoration: none;
            }
            @media only screen and (max-width: 600px) {
                .container {
                    margin: 0;
                    width: 100%;
                    border-radius: 0;
                }
                .content {
                    padding: 30px 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>ResumeIQ</h1>
            </div>
            <div class="content">
                <h2>Verify Your Email</h2>
                <p>Hello,</p>
                <p>Thank you for choosing ResumeIQ. Use the following dynamic verification code to complete your registration. This code will expire in 5 minutes.</p>
                
                <div class="otp-code">${otp}</div>
                
                <p>We've sent this code to <strong>${email}</strong>.</p>
                <p>If you didn't request this code, you can safely ignore this email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 ResumeIQ. All rights reserved.</p>
                <p>Elevate your career with AI-powered resumes.</p>
            </div>
        </div>
    </body>
    </html>`;
}
