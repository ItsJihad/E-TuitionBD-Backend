import { User } from "../../models/User.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/AsyncHandler.js";

export const allTeachers= asyncHandler(async(req,res)=>{
   const result = await User.find({role:"teacher"}).limit(6).select(" -password -refreshToken -phone -role -createdAt -updatedAt -_id -email -__v")


  return res
    .status(201)
    .json(new ApiResponse(201, result, "heres the details"));



})
