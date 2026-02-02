import { application } from "../models/Application.model.js";
import { Post } from "../models/Post.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

const TeachingApplication = asyncHandler(async (req, res) => {
  const { name, email, qualification, Experience, ExpectedSalary } = req.body;
  const { postId } = req.params;

  if (
    [name, email, qualification, Experience, ExpectedSalary].some((field) => {
      return field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "field is empty");
  }

  const FindUser = await User.findOne({ email });

  const FindPost = await Post.findById({ _id: postId });

  const Application_DB = application.create({
    teacher: FindUser._id,
    posts: FindPost,
    qualification: qualification,
    experience: Experience,
    expectedSalary: ExpectedSalary,
  });

  return res.status(201).json(new ApiResponse(201, Application_DB, "applied"));
});

export default TeachingApplication;
