import { User } from "../../models/User.model.js";
import { ApiError } from "../../utils/ApiError.js";
import asyncHandler from "../../utils/AsyncHandler.js";

export const GetUserRole = asyncHandler(async (req, res) => {
  const { email } = req.CurrentUser;

  const FindUserInDB = await User.findOne({ email: email }).select(
    "-__v -createdAt -updatedAt",
  );
  if (!FindUserInDB) {
    throw new ApiError(404, "User Not Found");
  }

  return res.status(200).json(FindUserInDB);
});
