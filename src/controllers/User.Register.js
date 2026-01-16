import  asyncHandler  from "../utils/AsyncHandler.js"

const RegisterUser = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"IDK"
    })
})

export default RegisterUser