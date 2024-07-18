const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require('/home/panda/Desktop/project/models/listings');
const wrapAsync=require("/home/panda/Desktop/project/utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("/home/panda/Desktop/project/schema.js");
const Review=require("/home/panda/Desktop/project/models/reviews.js");
const {isLoggedIn,isOwner,validateReview,isReviewAuthor}=require("/home/panda/Desktop/project/middleware.js");

const reviewController=require("/home/panda/Desktop/project/contollers/reviews.js");

//review route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
//deleting the review
router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.destroyReview))
module.exports=router;