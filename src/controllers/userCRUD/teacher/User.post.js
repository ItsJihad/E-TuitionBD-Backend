import { application } from "../../../models/Application.model.js";
import { Post } from "../../../models/Post.model.js";
import { User } from "../../../models/User.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

const TeachingApplication = asyncHandler(async (req, res) => {
  const { qualification, Experience, ExpectedSalary } = req.body;
  const { postId } = req.params;
  const {name, email}=req.CurrentUser

  if (
    [name, email, qualification, Experience, ExpectedSalary].some((field) => {
      return field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "field is empty");
  }

  const FindUser = await User.findOne({ email });

  const FindPost = await Post.findById({ _id: postId });

  if(!FindPost){
    throw new ApiError(404,"not found")
  }
const alreadyApplied = await application.findOne({
    teacher: FindUser._id,
    post:FindPost._id,
  });

  if (alreadyApplied) {
    throw new ApiError(409, "You have already applied to this post");
  }

  const Application_DB = await application.create({
    teacher: FindUser._id,
    posts: FindPost._id,
    qualification: qualification,
    experience: Experience,
    expectedSalary: ExpectedSalary,
  });

  const applicationDetails =await application.findById({_id:Application_DB._id}).select("-__v -createdAt -updatedAt")

  return res.status(201).json(new ApiResponse(201, applicationDetails, "applied"));
});

export default TeachingApplication;
