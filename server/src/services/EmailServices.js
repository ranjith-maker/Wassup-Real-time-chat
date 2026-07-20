import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

// Check what Render resolves for smtp.gmail.com
dns.lookup("smtp.gmail.com", { all: true }, (err, addresses) => {
    console.log("========== DNS LOOKUP ==========");
    console.log(err);
    console.log(addresses);
    console.log("===============================");
});

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },

    family: 4,

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,

    tls: {
        rejectUnauthorized: false,
    },

    logger: true,
    debug: true,
});

// Verify SMTP connection when server starts
transporter.verify((err, success) => {
    console.log("========== TRANSPORT VERIFY ==========");

    if (err) {
        console.error("SMTP VERIFY FAILED");
        console.dir(err, { depth: null });
    } else {
        console.log("SMTP VERIFIED SUCCESSFULLY");
        console.log(success);
    }

    console.log("======================================");
});

export const sendOtptoEmail = async (email, otp) => {
    const html = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #075e54;">🔐 Wassup Web Verification</h2>

      <p>Hi there,</p>

      <p>Your one-time password (OTP) to verify your Wassup Web account is:</p>

      <h1 style="background: #e0f7fa; color: #000; padding: 10px 20px; display: inline-block; border-radius: 5px; letter-spacing: 2px;">
        ${otp}
      </h1>

      <p><strong>This OTP is valid for the next 5 minutes.</strong> Please do not share this code with anyone.</p>

      <p>If you didn’t request this OTP, please ignore this email.</p>

      <p style="margin-top: 20px;">Thanks & Regards,<br/>Ranjith's Wassup Security Team</p>

      <hr style="margin: 30px 0;" />

      <small style="color: #777;">This is an automated message. Please do not reply.</small>
    </div>
    `;

    try {
        const info = await transporter.sendMail({
            from: `"Wassup Support" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Ranjith's Wassup Verification OTP",
            html,
        });

        console.log("========== EMAIL SENT ==========");
        console.log(info);
        console.log("================================");

        return info;
    } catch (err) {
        console.log("========== SENDMAIL ERROR ==========");
        console.dir(err, { depth: null });
        console.log("====================================");

        throw err;
    }
};

