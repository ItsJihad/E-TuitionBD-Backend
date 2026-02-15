import { User } from "../../../models/User.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import asyncHandler from "../../../utils/AsyncHandler.js";

export const GetAllUsers=asyncHandler(async(req,res)=>{
    const AllTheUsersOfTheApp= await User.find().select("-__v -createdAt -updatedAt")
    if(!AllTheUsersOfTheApp){
        throw new ApiError(500,"MAYBE DB CRASHED")
    }
    return res.status(200).json(AllTheUsersOfTheApp)
})