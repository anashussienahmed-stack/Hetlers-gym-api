import jwt from "jsonwebtoken"

const age_of_token = 3 * 60 * 60 

const generateToken = (id:string,role:string)=>{
        return jwt.sign(
        {id ,role },                   // {payload} 
        process.env.JWT_SECRET as string , // secret
        {expiresIn:age_of_token}           // {اضافات}

    )
}

export default generateToken // we can import generatetoken with any name and without {}
//if we use export const generatetoken , we should import with{} & with the same name



