const express= require("express");
const router =express.Router();
const validateToken=require("../middleware/validateTokenHandler");

const{registerUser,
    loginUser,
     currentUser}=require("../controllers/userController");

//router handler for registering user
router.post("/register",registerUser);

//router handler for a user login
router.post("/login",loginUser);

//router handler to get current user
//this is the only private routes here
router.get("/current",validateToken,currentUser);

module.exports=router;