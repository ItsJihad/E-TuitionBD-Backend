import { application } from "../../../models/Application.model.js";
import { Post } from "../../../models/Post.model.js";
import { User } from "../../../models/User.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

export const ApproveApplications = asyncHandler(async (req, res) => {
  const { applicationid } = req.params;
  const { status } = req.body; 
  const { email } = req.CurrentUser;


  const applicationInDB = await application.findById(applicationid);
  if (!applicationInDB) {
    throw new ApiError(404, "Application not found");
  }


  const postId = applicationInDB.posts;

  const postInDB = await Post.findById(postId);
  if (!postInDB) {
    throw new ApiError(404, "Post not found");
  }


  const studentId = postInDB.student;


  const studentInDB = await User.findById(studentId);
  if (!studentInDB) {
    throw new ApiError(404, "User not found");
  }

  if (studentInDB.email !== email) {
    throw new ApiError(403, "You are not authorized to approve this application");
  }

  const updatedApplication = await application.findByIdAndUpdate(
    applicationid,
    { $set: { status: status || "approved" } },
    { new: true, runValidators: true }
  ).select("-createdAt -updatedAt -__v");

  return res.status(200).json(
    new ApiResponse(200, updatedApplication, "Application approved successfully")
  );
});
