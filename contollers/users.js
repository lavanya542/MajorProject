const User=require("models/user.js");
module.exports.renderSignUpForm=(req,res)=>{
    res.render("views/users/signup.ejs");
};
module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    const newUser=new User({username,email});
    let registereduser=await User.register(newUser,"hello");
    req.flash("success","Welcome to wanderlust");
    res.redirect("/listings");

    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
    
}
module.exports.renderLoginForm=(req,res)=>{
    res.render("views/users/login.ejs")
}
module.exports.login=async(req,res)=>{
    req.flash("success","welocme to wanderlust!");
    res.redirect(res.locals.redirectUrl);
}
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are successfully logged out");
        res.redirect("/listings");
    });
}