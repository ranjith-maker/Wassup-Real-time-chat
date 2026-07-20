import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import ConnectDB from './src/config/DB.js'
import cors from 'cors'
import dns from 'dns'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { errorHandler } from './src/utils/CommonError.js'
import cloudinaryConnect from './src/config/Cloudinary.js'
import authRouter from './src/routes/authRoutes.js'
import userRouter from './src/routes/userRoutes.js'
import chatRouter from './src/routes/chatRoutes.js'
import http from 'http'
import { initializeSocket } from './src/services/Socket.js'


// Make Node.js to prefer IPv4 over IPv6 to fix Nodemailer ENETUNREACH
dns.setDefaultResultOrder('ipv4first');



const app = express()
//creating a native server here
const server = http.createServer(app)
//initializing sockets here
const io = initializeSocket(server)
//for gloabl access via req. object
app.set('io', io);

// app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser())



app.use(cors({
    origin : 'https://wassup-real-time-chat-frontend.onrender.com',
    credentials: true

}))


app.use('/api/auth' , authRouter )

app.use('/api/user', userRouter)

app.use('/api/chat', chatRouter)




app.use(errorHandler)


// for MongoDB Atlas SRV lookups
dns.setServers([
 '1.1.1.1',
 '8.8.8.8'

])




const PORT = process.env.PORT
cloudinaryConnect()

ConnectDB()
.then(()=>{
    console.log('DB is connected')
    server.listen(PORT,()=>{
        console.log('Server is running on', PORT)
        
    })
    
}).catch((error)=>{
        console.log('DB Connection is failed',error)

})







