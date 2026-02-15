import { Post } from "../../models/Post.model.js";
import { ApiError } from "../../utils/ApiError.js";
import asyncHandler from "../../utils/AsyncHandler.js";

export const AllPrivateTuitionPosts = asyncHandler(async(req,res)=>{

    const {uid}=req.CurrentUser
    
    
    if(!uid){
        throw new ApiError(403,"unauthorized access")
    }
        
        
    const FindAllPosts= await Post.find({status:"approved"}).select("-createdAt -updatedAt -__v")

    return res.status(200).json(FindAllPosts)


})