const Listing=require('models/listings.js');
const Review=require("models/reviews.js");
module.exports.createReview=async(req,res,next)=>{
    let listings=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    
    listings.reviews.push(newReview);
    await listings.save();
    await newReview.save();
    req.flash("success","Review added Sucessfully");
    console.log(newReview);
    console.log("review saved");
    res.redirect(`/listings/${listings._id}`);
}
module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted Sucessfully");
    res.redirect(`/listings/${id}`);

}