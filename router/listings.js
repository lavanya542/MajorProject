const express=require("express");
const router=express.Router();
const Listing=require('/home/panda/Desktop/project/models/listings.js');
const wrapAsync=require("/home/panda/Desktop/project/utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("/home/panda/Desktop/project/schema.js");
const {isLoggedIn,isOwner,validateListing}=require("/home/panda/Desktop/project/middleware.js");
const listingController=require("/home/panda/Desktop/project/contollers/listings.js")
const multer  = require('multer')
const {storage}=require("../cloudconfig.js")
const upload = multer({ storage })
//Index route
router.route("/")
.get(wrapAsync(listingController.index))
.post(validateListing,upload.single('listing[image]'),
 wrapAsync(listingController.createListing)
     
     //let {title,description,image,price,location,country}=req.body;
     //let listing=req.body.listing; //listing[titile] it gives an javascript object if .listing not there it give listing object
     //so we can write above code as also like this
     
 );

  //new listing route
router.get("/new",isLoggedIn,listingController.renderNewForm);
 //show route
 router.route("/:id")
 .get(wrapAsync(listingController.showListing))
 .put(isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
 .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

 //create route
 
 //Edit file
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
 //update route
 
 //delete route
 
 module.exports=router;