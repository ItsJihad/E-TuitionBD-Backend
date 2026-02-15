import { User } from "../../../models/User.model.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

export const FindTeacherID=asyncHandler(async(req,res)=>{

    const {id}=req.params
    console.log(id);
    
    const { email } = req.CurrentUser;
    if (!email || email === "") {
    throw new ApiError(401, "unauthorized attempt");
  }


    const FindTeacherInDB= await User.findById({_id:id}).select("-__v -updatedAt -createdAt -role")

    return res.status(200).json(FindTeacherInDB)
})