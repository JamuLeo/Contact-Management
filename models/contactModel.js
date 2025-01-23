//this is a schema or table for contacts 
//the user id associates every user with a specific id as primary key and get only associated routes to that user
const mongoose=require("mongoose");

const contactSchema =moongoose.Schema({
  user_id:{
    type:mongoose.Schema.Types.objectId,
    required:true,
    ref:"User",
  },

  name:{
     type:String,
     required:[true,"please add contact name "],
  },

  email:{
    type:String,
    required:[true,"please add contact email "],
  },

  phone:{
    type:String,
    required:[true,"please add contact phone number "],
  },
  
},
{
    timestamps:true,
  }
  ); 


  module.exports=mongoose.model("contact",contactSchema);