import User from '../models/UserModel.js'
import Message from '../models/MessageModel.js'
import jwt from 'jsonwebtoken' 
import validator from 'validator'
import AppError , {catchAsync} from '../utils/CommonError.js'
import crypto from 'crypto';
import bcrypt from 'bcrypt'



export const registerUser = catchAsync(async(req, res , next)=>{

const { name, email, password } = req.body

if(!name || !email || !password){
    throw new AppError('All fields are mandatory',400)
}

if (!validator.isEmail(email)) {
    throw new AppError("Provide a valid email", 400);
}

if(!validator.isStrongPassword(password)){
    throw new AppError('"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."',400)
}

const existingUser = await User.findOne({ email });

if(existingUser){
      throw new AppError("User already exist with same emailID, go Login", 400);  
}

const hashPass = await bcrypt.hash(password ,  12)

const user = await User.create({
    name,  
    email,
    password : hashPass

})

user.password = undefined;

const token = user.getJWTToken()

res.cookie('token', token, {
    httpOnly : true,
    secure :true,
    sameSite: 'none',
    maxAge: 7*24*60*60*1000
})


res.status(201).json({
    success : true,
    message : 'New User created Successfully',
    data : user
})

})



export const loginUser = catchAsync(async(req ,res,next)=>{

const {email , password } = req.body
 
if(!email || !password){
    throw new AppError('Both Field is mandatory',400)
}

const user = await User.findOne({email}).select('+password')

if(!user){
    throw new AppError('User not found',400)

}

const checkPass = await bcrypt.compare(password , user.password )

if(!checkPass){
    throw new AppError('Invalid Credentials',400)

}

user.password = undefined;

const token = user.getJWTToken()

res.cookie('token', token, {
    httpOnly : true,
    secure :true,
    sameSite: 'none',
    maxAge: 7*24*60*60*1000
})


res.status(200).json({
    success : true,
    message: `${user.name},loggedin Successfully`,
    data : user

})


})




export const logout = catchAsync(async(req , res , next)=>{

res.clearCookie('token', {
        httpOnly: true, 
        secure: true,
        sameSite: 'none', 
    });

res.status(200).json({
    success : true,
    message : 'User Loggedout successfully'

})

})






// export const updateProfile = catchAsync(async(req , res, next)=>{

// const { username, agreed , bio } = req.body

// const user = req.user

// let file = req.file
// let profilePicture = req.body.profilePicture

// if(file){
//     const result = await uploadImagetoCloudinary(file)

//  if (result) {
//     user.profilePicture = result.secure_url;
// }

// }else if(profilePicture){
//     user.profilePicture = profilePicture
// }

// if(username) user.username = username
// if(agreed) user.agreed = agreed
// if(bio) user.bio = bio 

// await user.save()


// return res.status(200).json({
//     success : true ,
//     message : 'Profile Created successfully',
//     data : req.user
// })

// })

