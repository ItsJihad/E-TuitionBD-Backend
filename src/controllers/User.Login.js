import asyncHandler from "../utils/AsyncHandler.js";

const LoginUser = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"LOGGED"
    })
})

export default LoginUser