const express=require("express");
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("Hi,I'm posts");
});
router.get("/:id",(req,res)=>{
    res.send("Hi,I'm get posts id");
});
router.post("/",(req,res)=>{
    res.send("Hi,I'm posts post");
});
router.delete("/",(req,res)=>{
    res.send("Hi,I'm posts delete");
});
module.exports=router;