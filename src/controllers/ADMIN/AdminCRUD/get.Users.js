import { User } from "../../../models/User.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

export const AdminGetsUser= asyncHandler(async(req,res)=>{

    const { userId } = req.params;
    
      const UserDetails = await User.findById({ _id: userId .toString() }).select(
        "-createdAt -updatedAt -_id -__v",
      );
      
      return res.status(200).json(new ApiResponse(200,UserDetails, "User Details"));



})