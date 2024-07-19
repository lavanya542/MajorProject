if(process.env.NODE_ENC!="production"){
    require("dotenv").config()
}

const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require('./models/listings.js');
const ejs=require('ejs');
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const dbUrl=process.env.ATLASDB_URL;
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

const Review=require("./models/reviews.js");
const listingsRouter=require("./router/listings.js");
const reviewsRouter=require("./router/reviews.js");
const userRouter=require("./router/users.js");
const session=require("express-session");
const mongostore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js")
const store=mongostore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});
store.on("error",()=>{
    console.log("ERROR!IN MONGO SESSION STORE",error);
})
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cokkie:{
        expires:Date.now()*3*24*60*60*1000,
        MaxAge:3*24*60*60*1000,
        httpOnly:true,
    },
}


main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(dbUrl);
};
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,'/public')));

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    console.log(res.locals.currUser);
    next();
})
// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"student123@gmail.com",
//         username:"student",
//     });
//     let registereduser=await User.register(fakeUser,"hello");
//     res.send(registereduser);
// })
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter)





// app.get("/testListings",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My new villa",
//         description:"By the beach",
//         price:1200,
//         location:"hyderabad",
//         country:"India",

//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("succesfull storage");


// });
app.get("/",(req,res)=>{
    res.redirect("/listings");
})
app.post("/search",async(req,res)=>{
    let {listingName}=req.body;
    
    let listing=await Listing.findOne({title:listingName});
    console.log(listing);
    res.render("./listings/show.ejs",{listing});
})
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found!"));
})
app.use((err,req,res,next)=>{
    
    let {status=500,message="some thing went wrong"}=err;
    res.status(status).render('./includes/error.ejs',{message});
    //res.status(status).send(message);
    

 });

app.listen(8080,()=>{
    console.log('port is listening');
});
