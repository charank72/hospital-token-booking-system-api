const mongoose=require('mongoose')
const doctorSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    trim:true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role:{
    type:String,
    default:"doctor",
    enum:["doctor","user"]
  }
},
  {
    collection:"doctors",
    timestamps:true,
  }
);
module.exports=mongoose.model("Doctor",doctorSchema)