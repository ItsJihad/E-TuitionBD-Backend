import { Post } from "../../../models/Post.model.js";
import { User } from "../../../models/User.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

const DeletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { email } = req.body;
  // console.log(postId);

  const postobj = await Post.findById(postId.toString());
  if (!postobj) {
    throw new ApiError(404, "post not found");
  }

  const userId = postobj?.student;
  const theUser = await User.findById( userId.toString() );
  const theUserId = theUser._id?.toString();

  const FindUser = await User.findOne({ email });
  if (!FindUser) {
    throw new ApiError(404, "invalid User");
  }
  const FindUser_id = FindUser?._id;
  const userrerID = FindUser_id.toString();

  if (theUserId !== userrerID) {
    throw new ApiError(404, "not Found");
  }

  await Post.findOneAndDelete({ _id: postId });

  return res.status(201).json(new ApiResponse(201, "post deleted"));
});

export default DeletePost;
