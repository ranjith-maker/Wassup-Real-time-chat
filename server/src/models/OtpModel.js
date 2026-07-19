import mongoose, { Mongoose } from "mongoose";
import validator from 'validator'



const otpSchema = new mongoose.Schema({

    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email address', value)
            }
        }
    },



otp :{
type :  String,
required :true
},



createdAt :{
    type: Date,
    default:Date.now,
    expires :300
} 

})



export default mongoose.model('OTP', otpSchema )
