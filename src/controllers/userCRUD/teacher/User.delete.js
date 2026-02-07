import { application } from "../../../models/Application.model.js";
import { Post } from "../../../models/Post.model.js";
import { User } from "../../../models/User.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

const DeleteApplication = asyncHandler(async (req, res) => {
  const { appID } = req.params;
  const { email } = req.body;

  if (!email || email === "") {
    throw new ApiError(401, "unauthorized attempt");
  }

  const FindApplication = await application.findById(appID);
  // console.log(FindApplication);
  if (!FindApplication) {
    throw new ApiError(404, "application not found");
  }

  const PostAuthor = FindApplication?.teacher.toString();
        console.log(PostAuthor);

  const FindUser = await User.findOne({ email });
  if(!FindUser){
    throw new ApiError(404,"User not found")
  }
  
  const UserID = FindUser._id?.toString();
  console.log(UserID);
  
  

  if (PostAuthor !== UserID) {
    throw new ApiError(401, "Email Didn't match");
  }
  await application.findOneAndDelete({_id:appID})

  return res.status(200).json(new ApiResponse(200, "Application Deleted"));
});

export default DeleteApplication;
