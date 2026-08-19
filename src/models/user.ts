import mongoose from "mongoose"
import  {Schema, model, } from "mongoose"

// In mongoose Number and String.the first letter is capital
//
const userSchema = new mongoose.Schema ({
    fullname : {
        type:String,
        required :true,
    } ,
    email:{
        type : String,
        required:true,
        unique:true,
        lowercase:true
    } ,
    password:{
        type:String,
        required:true
    } ,
    role:{
        type:String,
        enum:["Member,Trainer"],
        default:"Member"
    }


})
export const User = mongoose.model("User",userSchema)



