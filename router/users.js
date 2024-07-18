const express=require("express");
const router=express.Router();
const User=require("/home/panda/Desktop/project/models/user.js");
const wrapAsync=require("/home/panda/Desktop/project/utils/wrapAsync.js");
const passport=require("passport");
const{saveUrl}=require("/home/panda/Desktop/project/middleware.js");
const userController=require("/home/panda/Desktop/project/contollers/users.js");
router.route("/signup")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.login);



router.get("/logout",userController.logout);
module.exports=router;