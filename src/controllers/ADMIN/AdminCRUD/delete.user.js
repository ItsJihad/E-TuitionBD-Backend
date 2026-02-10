import { User } from "../../../models/User.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import asyncHandler from "../../../utils/AsyncHandler.js"

export const AdminDeletesUser=asyncHandler(async(req,res)=>{

    const {userId}=req.params
        
    const FindUserInDB=await User.findById({_id: userId .toString()})
    if(!FindUserInDB){
        throw new ApiError(404,"user doesn't exist")
    }
    await FindUserInDB.deleteOne()
       
    return res.status(200).json(200,"User Deleted")
})

