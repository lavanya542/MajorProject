const express=require("express");
const app=express();
const users=require("./users.js");
const posts=require("./posts.js");
const path=require("path");
const flash=require("connect-flash");
const cookieParser=require("cookie-parser");
const session=require("express-session");
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use("/users",users);
app.use("/posts",posts);
app.use(flash());
const sessionVar={
    secret:"mysuperscretstring",
    resave: false,
    saveUninitialized: true,
}
app.use(session(sessionVar));
app.use((req,res,next)=>{
    res.locals.errMsg=req.flash("error");
    res.locals.successMsg=req.flash("success");
    next();
})
app.get("/register",(req,res)=>{
    let{name='anonymous'}=req.query;
    req.session.name=name;
    //req.flash("success","User Registerd Succsefully");
    if(name==="anonymous"){
        req.flash("error","user not registered");
    }else{
        req.flash("success","user registered");
    }
    res.redirect("/hello");
})
//one type of using flash
// app.get("/hello",(req,res)=>{
//     res.render("page.ejs",{name:req.session.name,msg:req.flash("success")});
// })
//another type
// app.get("/hello",(req,res)=>{
//     res.locals.errMsg=req.flash("error");
//     res.locals.successMsg=req.flash("success");
//     res.render("page.ejs",{name:req.session.name});
// })
//third way by using middleware
app.get("/hello",(req,res)=>{
        
        res.render("page.ejs",{name:req.session.name});
    })


// app.use(cookieParser("secretcode"));
// app.get("/greetings",(req,res)=>{
//     let {name="anonymous"}=req.cookies;
//     res.send(`Hi,${name}`);
// })
// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi,I'm Root");
// });
// app.get("/getCookie",(req,res)=>{
//     res.cookie("name","Bhavya");
//     res.cookie("greetings","congrats");
//     res.send("cookie was sent");
// })
// app.get("/signedCookie",(req,res)=>{
//     res.cookie("password","Indu",{signed:true});
//     res.send("signed cookie sent!");
// })
// app.get("/verify",(req,res)=>{
//     console.dir(req.signedCookies);
// })
app.get("/test",(req,res)=>{
    res.send("test1 succesfull");
})
app.listen(3000,(req,res)=>{
    console.log("app is listening to the port 3000");
})