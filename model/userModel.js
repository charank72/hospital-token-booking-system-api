const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
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
  mobile:{
    type:String,
    required:true,
    trim:true,
    unique:[true,'mobile number already exsists']
  },
  token:{
    type:String,
    required:false,
    trim:true
  },
  gender:{
    type:String,
    required:true,
    enum:["male","female"]
  },
  role:{
    type:String,
    default:"user",
    enum:["doctor","user"]
  },
  issue:{
    type:String,
    required:false,
    trim:true
  }

},
  {
    collection:"users",
    timestamps:true,
  }
);
module.exports=mongoose.model("User",userSchema)