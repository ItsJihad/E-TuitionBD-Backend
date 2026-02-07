import { Post } from "../../../models/Post.model.js";
import { User } from "../../../models/User.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

const DeletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { email } = req.body;

  const postobj = await Post.findById({ _id: postId });
  if(!postobj){
    throw new ApiError(404,"post not found")
  }
  const userId = postobj?.student;
  const theUser = await User.findById({ _id: userId });
  const theUserId = theUser._id.toString();

  const FindUser = await User.findOne({ email });
  if (!FindUser) {
    throw new ApiError(404, "nai");
  }
  const FindUser_id = FindUser?._id;
  const userrerID = FindUser_id.toString();

  if (theUserId !== userrerID) {
    throw new ApiError(404, "nai");
  }


  await Post.findOneAndDelete({ _id: postId });

  return res.status(201).json(new ApiResponse(201, "post deleted"));
});

export default DeletePost;
