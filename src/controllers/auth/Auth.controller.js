import asyncHandler from "../../utils/AsyncHandler.js";
import { User } from "../../models/User.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const AuthFirebaseUser = asyncHandler(async (req, res) => {
  const { email, displayName } = req.CurrentUser;
  const { role, phone } = req.body;

  if (role !== "student" && role !== "teacher") {
    throw new ApiError(401, "Only student or Teacher roles are Accepted");
  }

  const UserInDB = await User.findOne({ email: email }).select(
    "-__v -createdAt -updatedAt",
  );
  if (!UserInDB) {
    const CreateUserInDB = await User.create({
      name: displayName,
      email: email,
      role: role,
      phone: parseInt(phone),
    });

    console.log("User chilona ,Create korlam");
    const UpdatedUser = await User.findById({ _id: CreateUserInDB._id }).select(
      "-__v -createdAt -updatedAt",
    );
    return res.status(201).json(UpdatedUser);
  }

  console.log("User ase");
  return res.status(200).json(UserInDB);
});

export const GoogleAuth = asyncHandler(async (req, res) => {
  const { email } = req.CurrentUser;
  const UserInDB = await User.findOne({ email: email }).select(
    "-__v -createdAt -updatedAt",
  );
  if (!UserInDB) {
    const CreateUserInDB = await User.create({
      name: "GOOGLE USER",
      email: email,
      role: "student",
      phone: parseInt("01000000000"),
    });

    console.log("google signup");
    const UpdatedUser = await User.findById({ _id: CreateUserInDB._id }).select(
      "-__v -createdAt -updatedAt",
    );
    return res.status(201).json(UpdatedUser);
  }

  console.log("google login");
  return res.status(200).json(UserInDB);
});
