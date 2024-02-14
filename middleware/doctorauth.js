const { StatusCodes } = require("http-status-codes")
const Doctor=require('../model/doctorModel')


const doctorAuth=async(req,res,next)=>{
  try{
    let userId=req.userId
    let extUser=await Doctor.findById(userId)
    //validate user 
/*     if(!extUser)
      return res.status(StatusCodes.CONFLICT).json({msg:`requested user id not exsists`,success:false}) */
    if(Doctor.role!=='doctor')
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg:`unauthorized request.. access denied ...`,
      success:false})
    
      next()
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message,success:false})
  }
}
module.exports=doctorAuth