import { Post } from "../../../models/Post.model.js";
import { User } from "../../../models/User.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";


const StudentPosts = asyncHandler(async (req, res) => {

  const {email} = req.CurrentUser
  const { subject, classLevel, description, location, budget } =req.body

  if (
    [subject, classLevel, description, location].some((element) => {
      return element?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All requied fields are needed to be field");
  }

  const FindUser = await User.findOne({ email });

  if (!FindUser) {
    throw new ApiError(401, "no user Found with this email");
  }

  const postData = await Post.create({
    student: FindUser._id,
    subject: subject,
    classLevel: classLevel,
    budget: budget,
    description: description,
    location: location,
  }).select("-createdAt -updatedAt -__v -student");;

  return res
    .status(201)
    .json(new ApiResponse(200, postData, "Post Successfull"));
});

export { StudentPosts };
