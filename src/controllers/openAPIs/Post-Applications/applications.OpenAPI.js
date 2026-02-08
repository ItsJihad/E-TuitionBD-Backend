import { ApiResponse } from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/AsyncHandler.js";
import {application} from "../../../models/Application.model.js";


export const LatesApplications = asyncHandler(async (req, res) => {
  const AllApplications = await application.find({ status: "approved" }).select("-__v -createdAt -updatedAt").limit(6);

  return res
    .status(200)
    .json(new ApiResponse(200, AllApplications, "all latest approved applications"));
});
