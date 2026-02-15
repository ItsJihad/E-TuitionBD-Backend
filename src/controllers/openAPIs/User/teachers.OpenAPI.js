import { User } from "../../../models/User.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

export const allTeachers= asyncHandler(async(req,res)=>{
   const result = await User.find({role:"teacher"}).limit(4).select(" -phone -role -createdAt -updatedAt -__v")


  return res
    .status(201)
    .json(new ApiResponse(201, result, "all teacher details"));



})
