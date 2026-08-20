import { Request,Response,NextFunction } from "express";
import validator from "validator"


const validateSignup = (req:Request,res:Response ,next:NextFunction)=>
{
    const {fullname,email,password } = req.body

    if (!fullname || !email || !password)
        return res.status(400).json({err:"fullname and email and password are rerquired"})



    if( ! validator.isEmail(email) )
        return res.status(400).json({err:"Invalid Email Format"})

    
    const isStrong = validator.isStrongPassword(password,
        {
            minLength : 8,
            minLowercase : 1,
            minUppercase :1,
            minNumbers:1,
            minSymbols:1
        }
    )
    if ( !isStrong )
        return res.status(400).json({err:"password must be at least 8 characters , with uppercase , lowercase ,number and a symbol"})


    next()
}

export default validateSignup