import { User } from "../../../models/User.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

export const AdminUpdatesUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  
  const { email, name, role, phone } = req.body;
  const FindUserInDB = await User.findById({ _id: userId.toString() });
  if (!FindUserInDB) {
    throw new ApiError(404, "User not found");
  }

  if (FindUserInDB.role === "admin") {
    throw new ApiError(403, "Cannot modify admin");
  }

//   if(role==="admin"){
//     throw new ApiError(403,"cant assign admin")
//   }

  const Update = {
    email: email,
    name: name,
    role: role,
    phone:phone,
  };

  const FindNUpdateUser = await User.findByIdAndUpdate(
    { _id: userId },//find with what
    { $set: Update },//what to update
    { new: true, runValidators: true },//return the updated document
  ).select("-createdAt -updatedAt -__v -student");

return res.status(200).json(
  new ApiResponse(200, FindNUpdateUser, "User updated successfully")
);


});
