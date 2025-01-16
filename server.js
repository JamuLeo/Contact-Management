//LEO REMEMBER TO INSTALL THIS ONCE YOU HAVE INTERNET NETWORK CONNECTION BACK! "npm install express-async-handler"
/* mongodb details
username:ADMIN
password:FGBROC
databasename:contacts-backend 

*/
const express=require("express");
const errorHandler=require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv =require("dotenv").config();

  connectDb();
  
  const app =express();
  const port =process.env.PORT || 5000;

  app.use(express.json());
  app.use("/api/contacts",require("./routes/contactRoutes"));
  app.use(errorHandler);

  app.listen(port,()=>{
    console.log("Server is running on port ${port}");
  });