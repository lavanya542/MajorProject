const mongoose=require("mongoose");
const initData=require('/home/panda/Desktop/project/init/data.js');
const Listing=require('/home/panda/Desktop/project/models/listings');
// const MONGO_URL="mongodb://127.0.0.1:27017/wonderlust";
// const dbUrl=process.env.ATLASDB_URL;
// main().then(()=>{
//     console.log("connected to DB");
// }).catch((err)=>{
//     console.log(err);
// })
// async function main(){
//     await mongoose.connect(dbUrl,{
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
// };
const initDB=async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,owner:"669659fa878b845130045319", 
    }));
    await Listing.insertMany(initData.data);/*because we require data as object*/
    console.log("data was initialised");

};
initDB();