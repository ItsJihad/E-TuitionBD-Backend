import { User } from "../../../models/User.model.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

export const AdminCreatesUser=asyncHandler(async (req,res)=>{

    const {email,name,role,phone}=req.body

    const CreateUserInDB= await User.create({
        email:email,
        name:name,
        role:role,
        phone:parseInt(phone)
    })
    
    return res.status(201).json(CreateUserInDB)

})