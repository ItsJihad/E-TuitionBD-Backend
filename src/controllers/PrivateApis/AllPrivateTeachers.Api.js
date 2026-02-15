import { User } from "../../models/User.model.js";
import { ApiError } from "../../utils/ApiError.js";
import asyncHandler from "../../utils/AsyncHandler.js";

export const AllPrivateTeachers = asyncHandler(async(req,res)=>{

    const {uid}=req.CurrentUser

    
    if(!uid){
        throw new ApiError(403,"unauthorized access")
    }
        
        
    const FindAllTeachers= await User.find().select("-createdAt -updatedAt -__v")

    return res.status(200).json(FindAllTeachers)


})