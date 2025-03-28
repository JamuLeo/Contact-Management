const mongoose  = require("mongoose")

const connectDb=async ()=>{
  try{
  const connect=await mongoose.connect(process.env.CONNECTION_STRING); //CONNECTION_STRING to connect to our database
  console.log("connected to db",
    connect.connection.host,
    connect.connection.name);
  }catch(err){
    console.log(err);
    process.exit(1);
  }
}
module.exports=connectDb