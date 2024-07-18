const Listing=require('/home/panda/Desktop/project/models/listings');
module.exports.index=async(req,res)=>{
    const alllistings= await Listing.find({});
    res.render("listings/index.ejs",{alllistings});
 
     }
module.exports.renderNewForm=(req,res)=>{
   
    res.render("listings/new.ejs");
    
 
 }
 module.exports.showListing=async(req,res,next)=>{
    let {id}=req.params;
    

 const listing=await Listing.findById({ _id: id}).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
       req.flash("error","Listing you are trying to find is not existed");
       res.render("/listings");
    }else{
       res.render("listings/show.ejs",{listing});
       console.log(listing.owner._id);

    }
    
}
module.exports.createListing=async(req,res,next)=>{
     
    const newListing=new Listing(req.body.listing);
    const url=req.file.path;
    const filename=req.file.filename;
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Enter valid Information");
    // };
    // if(!newListing.description){
    //     throw new ExpressError(400,"description is unavailable");
    // };
    // if(!newListing.price){
    //     throw new ExpressError(400,"price is unavailable");
    // };
    // if(!newListing.location){
    //     throw new ExpressError(400,"location is unavailable");
    // };
    // if(!newListing.country){
    //     throw new ExpressError(400,"country is unavailable");
    // };
    newListing.owner=req.user.id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","Listing Added Sucessfully");
    res.redirect(`/listings`);
}
module.exports.renderEditForm=async(req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById({ _id: id});
    let originalListingUrl=listing.image.url;
    originalListingUrl=originalListingUrl.replace("/upload","/upload/h_300,w_250");
    console.log( "this is orl",originalListingUrl);
    if(!listing){
       req.flash("error","Listing you are trying to find is not existed");
       res.render("/listings");
    }else{
       res.render("/home/panda/Desktop/project/views/listings/edit.ejs",{listing,originalListingUrl});
    }
    
    

}
module.exports.updateListing=async(req,res,next)=>{
    const { id } = req.params;
    const updateData = req.body.listing;
   

    
    
    const updatedListing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        updatedListing.image={url,filename};
        console.log(updatedListing.image.url);
        await updatedListing.save();
    }
    req.flash("success","Listing edited Sucessfully");
    res.redirect("/listings");
    
}
module.exports.destroyListing=async(req,res,next)=>{
    const { id } = req.params;

   let deleteListing= await Listing.findByIdAndDelete(id);
   console.log(deleteListing);
   req.flash("success","Listing deleted Sucessfully");
   res.redirect("/listings");
}