import { Post } from "../../../models/Post.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

const GetPostDetails = asyncHandler(async(req,res)=>{
const {postId}=req.params
console.log(postId);


const postDetails = await Post.findById({_id:postId}).select("-createdAt -updatedAt -_id -__v")

return res.status(200).json(new ApiResponse(200,postDetails,"here u go"))

})

export default GetPostDetails