import express from 'express'
import { sendOtp, verifyOtp,logout } from '../controllers/authController.js'
import { uploadImagetoCloudinary } from '../utils/ImageUploader.js'
import upload from '../middlewares/multer.js'
import { authUser } from '../middlewares/authUser.js'
import rateLimit from 'express-rate-limit';


const authRouter = express.Router()

authRouter.post('/send-otp', sendOtp  )

authRouter.post('/verify-otp', verifyOtp);

authRouter.post('/logout-user' , logout )




export default authRouter





/**
 * 
 * 
const otpLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 2, // Limit each IP or phone endpoint to 2 OTP requests per minute
    message: {
        success: false,
        message: "Too many OTP requests. Please wait a minute before trying again."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

 * 
 */