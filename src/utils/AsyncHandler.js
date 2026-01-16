const asyncHandler = (outsiderFn)=>{
  return  (req,res,next)=>{
     Promise.resolve(outsiderFn(req,res,next)).catch((error)=>next(error))
    }
}
//
export default asyncHandler 
