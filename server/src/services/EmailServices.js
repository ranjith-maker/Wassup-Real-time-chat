import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({

service : 'gmail',
auth:{

user:process.env.MAIL_USER,
pass : process.env.MAIL_PASS,

}
     
})


transporter.verify((error , success )=>{

if(error){
    console.error('Gmail services connection failed',error);
    
}else{
    console.log('Gmail configured properly and ready to send email',success);
    
}

})



export const sendOtptoEmail  = async(email,otp,)=>{

    //  console.log("Sending OTP email to:", email);

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

      <p style="margin-top: 20px;">Thanks & Regards,<br/> Ranjith's Wassup Security Team </p>

      <hr style="margin: 30px 0;" />

      <small style="color: #777;">This is an automated message. Please do not reply.</small>
    </div>
  `

const info = await transporter.sendMail({

    from: process.env.MAIL_USER,
    to : email,
    subject : "Ranjith's Wassup Verification OTP",
    html
})

  // console.log("Email sent:", info.messageId);

}









