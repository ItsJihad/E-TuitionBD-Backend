import asyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";
import uploaderOnCloudinary from "../services/cloudinary.js";

const RegisterUser = asyncHandler(async (req, res) => {
  const { email, password, name, username, role, phone } = req.body;

  if (
    [email, password, name, username, role].some((field) => {
      return field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All requied fields are needed to be field");
  }
  if (phone === "") {
    throw new ApiError(400, "All requied fields are needed to be field");
  }

  if (!email?.toString().includes("@")) {
    throw new ApiError(400, "enter a valid Email Address");
  }

  const isStrongPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  if (!isStrongPassword(password)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
    );
  }

  if (!phone === Number) {
    throw new ApiError(400, "Enter a valid number");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "user already exists");
  }

  const avatarLocalpath = req.files?.avatar?.[0]?.path;

  const coverLocalpath = req.files?.coverImage?.[0]?.path || "";

  if (!avatarLocalpath) {
    throw new ApiError(409, "upload Avatar");
  }

  const avatarOncloudinaty = await uploaderOnCloudinary(avatarLocalpath);
  

  const coverOncloudinaty = await uploaderOnCloudinary(coverLocalpath);

  if (!avatarOncloudinaty) {
    throw new ApiError(409, "upload Avatar Image");
  }

  const userReff = await User.create({
    email: email.toLowerCase(),
    password,
    name,
    username: username.toLowerCase(),
    role,
    phone: parseInt(phone),
    avatar: avatarOncloudinaty,
    coverImage: coverOncloudinaty,
  });

  const userFromDB = await User.findById(userReff._id).select(
    " -password -refreshToken"
  );

  if (!userFromDB) {
    throw new ApiError(500, "server Error");
  }

  if (userFromDB) {
    return res
      .status(201)
      .json(new ApiResponse(200, userFromDB, "Registration Successfull"));
  }
});

export default RegisterUser;
