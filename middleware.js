const Listing=require('/home/panda/Desktop/project/models/listings.js');
const ExpressError=require("/home/panda/Desktop/project/utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("/home/panda/Desktop/project/schema.js");
const Review=require("/home/panda/Desktop/project/models/reviews.js");

module.exports.isLoggedIn=(req,res,next)=>{
     req.session.redirectUrl=req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash("error","YOu must be logged ");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveUrl=(req,res,next)=>{
    res.locals.redirectUrl=req.session.redirectUrl||"/listings";
    next();
}
module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You dont have permission");
         return res.redirect(`/listings${id}`);
    }
    next();

}
module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(',');
        throw new ExpressError(400,error);
    }
    else{
        next();
    }

}
module.exports.validateReview=(req,res,next)=>{
    
    console.log(req.body);
    let {error}=reviewSchema.validate(req.body);
    
   
    if(error){
        
        let errMsg=error.details.map((el)=>el.message).join(',');
        throw new ExpressError(404,errMsg);
        
    }
    else{
        next();
    }
    
}
module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review= await Review.findById(reviewId);
    console.log("listing id",id);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You dont have permission");
        return res.redirect(`/listings/${id}`);
    }
    next();

}