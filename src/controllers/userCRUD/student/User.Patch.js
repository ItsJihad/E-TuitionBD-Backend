import { Post } from "../../../models/Post.model.js";
import { User } from "../../../models/User.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

const UpdatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { email } = req.CurrentUser;
  const { subject, classLevel, budget, description, location } = req.body;

  const updateDetails = {
    subject: subject,
    classLevel: classLevel,
    budget: budget,
    description: description,
    location: location,
  };

  const TheUser = await User.findOne({ email });
  if (!TheUser) {
    throw new ApiError(401, "User not Found");
  }
  const userID = TheUser._id?.toString();
  const postReff = await Post.findById({ _id: postId });
  const postUserId = postReff?.student.toString();

  if (userID !== postUserId && TheUser.role !=="admin") {
    throw new ApiError(401, "Unauthorized");
  }

  const FindPost = await Post.findByIdAndUpdate(
    { _id: postId },
    { $set: updateDetails },
    { new: true, runValidators: true },
  ).select("-createdAt -updatedAt -__v -student");

  return res.status(200).json(new ApiResponse(200, FindPost, "Post Updated"));
});

export default UpdatePost;
