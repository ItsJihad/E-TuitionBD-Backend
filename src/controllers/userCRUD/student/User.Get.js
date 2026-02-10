import { Post } from "../../../models/Post.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

const GetPostDetails = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const postDetails = await Post.findById({ _id: postId.toString() }).select(
    "-createdAt -updatedAt -_id -__v",
  );

  return res.status(200).json(new ApiResponse(200, postDetails, "post details"));
});

export default GetPostDetails;
