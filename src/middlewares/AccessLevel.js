import asyncHandler from "../utils/AsyncHandler.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";

export const AccessLevelChecker = asyncHandler(async (req, res, next) => {
  const { email } = req.CurrentUser;

  const FindUserInDB = await User.findOne({ email });
  if (!FindUserInDB) {
    throw new ApiError(404, "Access Denied");
  }

  if (FindUserInDB.role === "admin") {
    
    next()
  } else {
   
    throw new ApiError(403, "Forbidden Access");
  }
});
