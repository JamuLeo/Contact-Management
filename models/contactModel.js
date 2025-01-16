//this is a schema or table for contacts 

const mongoose=require("mongoose");

const contactSchema =moongoose.Schema({

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