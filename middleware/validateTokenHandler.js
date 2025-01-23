const asyncHandler =require("express-async-handler");
const jwt=require("jsonwebtoken");


const validateToken=asyncHandler(async(requestAnimationFrame,res,next)=>{
  /*setting that either 
  user can user the authorization under
   headers sections  or bearer under auth section to pass in access token to access
   private routes*/

    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startWith( "Bearer")){
        token=authHeader.split("")[1];//if one user Authorization as key then Bearer as value space then access token,split to get the access token
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(errorHandler,decoded)=>{
            if(err){
                res.status(401);
                throw new Error ("User is not authorized");
            }
          req.user=decoded.user; //returning the verified user extracted from the user info. embeded in the token
          next(); //appending user info. on the request.user property  
        });//then we need to verify that token by passing access token and secret key
   
        //if missing token 
        if(!token){
         res.status (401);
         throw new Error("User not authorized or missing token");  
        }

    }
});

module.exports=validateToken;