import AsyncHandler from "../../../utils/AsyncHandler.js";
import { User } from "../../../models/User.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { application } from "../../../models/Application.model.js";

const allOpenStudents = AsyncHandler(async (req, res) => {
  const result = await User.find({ role: "student" })
    .limit(4)
    .select(
      " -phone -role -createdAt -updatedAt  -__v",
    );

  return res
    .status(201)
    .json(new ApiResponse(201, result, "heres the details"));
});

export default allOpenStudents;
