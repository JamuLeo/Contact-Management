const express= require("express");
const router =express.Router();
const{registerUser,
    loginUser,
     currentUser}=require("../controllers/userController");

//router handler for registering user
router.post("/register",registerUser);

//router handler for a user login
router.post("/login",loginUser);

//router handler to get current user
router.get("/current",currentUser);

module.exports=router;