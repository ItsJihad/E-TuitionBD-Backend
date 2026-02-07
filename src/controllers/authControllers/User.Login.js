import asyncHandler from "../../utils/AsyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/User.model.js";

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "enter valid infos");
  }

  const LoggedUser = await User.findOne({ email });

  if (!LoggedUser) {
    throw new ApiError(
      404,
      "No User Found , check your email address properly",
    );
  }

  const success = await LoggedUser.ValidatePass(password);
  if (success === true) {
    const AccessToken = await LoggedUser.AccessTokenGenerator();
    const RefreshToken = await LoggedUser.RefreshTokenGenerator();
    LoggedUser.refreshToken = RefreshToken;
    await LoggedUser.save({ validateBeforeSave: false });

    const ResponseData = await User.findById(LoggedUser._id).select(
      "-password -refreshToken -_id -createdAt -updatedAt",
    );





    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .cookie("accessToken", AccessToken, options)
      .cookie("refreshToken", RefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            ResponseData,
            AccessToken,
            RefreshToken,
          },
          "User Logged In Successfully ",
        ),
      );
  } else {
    throw new ApiError(401, "Invalid Password");
  }
});

export default LoginUser;
