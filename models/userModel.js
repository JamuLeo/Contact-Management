const mongoose=require("mongoose");


const userSchema =mongoose.Schema({

    username:{
       type:String,
       required:[true,"please add a user name"],
    },

    email:{
        type:String,
        required:[true,"please add a user email"],
        unique:[true,"email address already taken"]
    },

    password:{
        type:String,
        required:[true,"please add a user password"],
    },   
},
{
    timestamps:true,
}
);


module.exports=mongoose.model("User",userSchema);