const express=require("express");
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("Hi,I'm user ");
});
router.get("/:id",(req,res)=>{
    res.send("Hi,I'm get users id");
});
router.post("/",(req,res)=>{
    res.send("Hi,I'm users post");
});
router.delete("/",(req,res)=>{
    res.send("Hi,I'm users delete");
});
module.exports=router;