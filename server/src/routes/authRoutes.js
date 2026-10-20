import express from 'express'
import { registerUser, loginUser,  logout } from '../controllers/authController.js'
import { uploadImagetoCloudinary } from '../utils/ImageUploader.js'
import upload from '../middlewares/multer.js'
import { authUser } from '../middlewares/authUser.js'
import rateLimit from 'express-rate-limit';


const authRouter = express.Router()

authRouter.post('/register-user', registerUser  )

authRouter.post('/login-user', loginUser  );

authRouter.post('/logout-user' , logout )













export default authRouter





