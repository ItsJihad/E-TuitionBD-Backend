import { Post } from "../../../models/Post.model.js";
import { User } from "../../../models/User.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

const GetAllPostByUser = asyncHandler(async (req, res) => {
  const { email } = req.CurrentUser;

  const FindUserInDB = await User.findOne({email})

  const PostDetails = await Post.find({student:FindUserInDB._id}).select("-__v -createdAt -updatedAt")

  return res.status(200).json(new ApiResponse(200, PostDetails, "all post by user"));
});

export default GetAllPostByUser;
