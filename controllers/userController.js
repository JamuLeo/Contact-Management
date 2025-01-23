
const asyncHandler =require("express-async-handler");
const User =require("../models/userModel");
const bcrypt=require("bcrypt");//for hashing password
const jwt=require("jsonwebtoken");//for generating access tokens after login

//@desc Register a user 
//@route POST /api/users/register
//@desc access public
//registering new user in our system

const registerUser= asyncHandler(async(req,res)=>{
    //receiving username,email and password from the json body 
   const{ username,email,password}=req.body;

   //checking if all field of username,email and password are available
   if(!username || !email || !password){
    res.status(400);
    throw new Error("All fields are mandatory!");
   }

   //checking if user email is not already in use ie. if user is not already registered
   const userAvailable=await User.findOne({email});
   if(userAvailable){
    res.status(400);
    throw new Error("user already registered");
   }
   //if all conditions are met  then hash password
   const hashedPassword=await bcrypt.hash(password,10);

   //returning the hashed password  
   console.log("Hashed password",hashedPassword);

   //creating the user with the username,email and the hashed password 
   const user=await User.create({
    username,
    email,
    password:hashedPassword,
   });

   console.log('User created ${user}');
   if(user){
    res.status(201).json({_id:user.id,email:user.email });
   }else{
    res.status(400);
    throw new Error("User data is not valid");  
 }
  
});



//@desc Login a user 
//@route POST /api/users/login
//@desc access public
//a user login in our system
//using jsonweb token 
/*whenever user wants to login with a password and
email and they match the ones in our database provide that user
with access token*/
const loginUser= asyncHandler(async(req,res)=>{
    //getting email and password from json body header(fetching)
    const{email,password}= req.body;
    if(!email || password){
        res.status(400);
        throw new Error("All fields are mandatory"); 
         
    }
    //interacting with our User table in our database to match user login record with those in database User table using email as primary key
    const user=await User.findOne({email});
    //compare password with hashedpassword
    if(user && (await bcrypt.compare(password,user.password)) ){
        //if entered password matches one stored in User table in our database,provide access token
       const accessToken=jwt.sign({ 
        //creating access token payload,accesstoken secret defined in .env file but has to be strong enough(auto generate if possible) and expiration period of our token
        user:{
            username:user.username,
            email:user.email,
            id:user.id,
        },

       },process.env.ACCESS_TOKEN_SECRET,
       {expiresIn:"1m"}
    );
        res.status(200).json({accessToken});
    }else{
      res.status(401);
      throw new Error("invalid credentials");
    }
});

//@desc get current logged user 
//@route GET /api/users/current
//@desc access private
//a user login in our system

const currentUser= asyncHandler(async(req,res)=>{
   

});


module.exports={
    registerUser,
    loginUser,
    currentUser
}

