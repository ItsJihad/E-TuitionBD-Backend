import asyncHandler from "../../utils/AsyncHandler.js";
import { User } from "../../models/User.model.js";

export const AuthFirebaseUser=asyncHandler(async(req,res)=>{

    const {email,name}=req.CurrentUser
    console.log(email);
    const {role,phone}=req.body

    const UserInDB= await User.findOne({email:email}).select("-__v -createdAt -updatedAt")
    if(!UserInDB){
        const CreateUserInDB= await User.create({
            name:name,
            email:email,
            role:role,
            phone:parseInt(phone)
        })

        console.log("User chilona ,Create korlam");
        const UpdatedUser= await User.findById({_id:CreateUserInDB._id}).select("-__v -createdAt -updatedAt")
        return res.status(201).json(UpdatedUser)
    }

    console.log("User ase");
        return res.status(200).json(UserInDB)


})




