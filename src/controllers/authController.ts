
import { Request,Response,NextFunction } from "express"
import { User } from "../models/user" //the model to deal with MongoDB -> ليتعامل مع قاعده البيانات (سواء انشاء او تعديل او غيره)
import bcrypt from "bcryptjs"
import generateToken from "../other/generateToken"
//////////////////////////////////////////////////////////////
export const signup = async (req:Request,res:Response)=>{
 
  try  

   {
     const { fullname , email , password, role} = req.body

     if(!fullname || !email || !password)
         return res.status(400).json({message:"Fullname & email & password are required"})

     const user = await User.findOne({email:email}) // or ({email})..the fist email is the field in MongoDB , the second is the variable that we recieved from req.body

     if (user)
         return res.status(400).json({msg:"This User is already exists"})

     const password_with_hash = await bcrypt.hash(password,10)

     await User.create({
         fullname:fullname,  //or fullname
         email,             //or email:email
         password:password_with_hash,
         role:role || "Member"// the user maynot send the role
     })

    res.status(201).json({msg:"Created Successfully"})

 } catch(err){
      res.status(500).json({error:"Server error"})
 }

}//func
////////////////////////////////////////////////////////////

export async function signin (req:Request,res:Response)
{
try
  {
    const {email,password} = req.body
    
    if ( !email || !password)
        return res.status(400).json({msg:"All fields are required"})

    const user = await User.findOne( {email : email} )
    if ( !user)
        return res.status(400).json({err:"Invalid Email or Password"})

    const valid_password = await bcrypt.compare(password,user.password)

    if (!valid_password)
        return res.status(400).json({err:"Invalid Email or Password"})

// _id -> is an Objectid not a string
    const token =generateToken(user._id.toString(),user.role)
    
    const maxAge_Milli = 3 * 60 * 60 * 1000
//cookies take time in milli
    res.cookie("token",token,{httpOnly:true,maxAge:maxAge_Milli})

    return res.status(200).json( {msg:"Login Successfull"} )

 } catch (err) { 
    res.status(500).json({msg:"Server error"})
  }

}//func









