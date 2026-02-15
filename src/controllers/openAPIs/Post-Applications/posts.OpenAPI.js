import asyncHandler from "../../../utils/AsyncHandler.js";
import { Post } from "../../../models/Post.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";

export const AllPostsByUsers = asyncHandler(async (req, res) => {
  const allPosts = await Post.find({ status: "approved" })
    .limit(6)
    .select("-createdAt -updatedAt -student -__v");

  return res.status(200).json(new ApiResponse(200, allPosts, "all new posts"));
});
