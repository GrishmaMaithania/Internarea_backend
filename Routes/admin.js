const express=require("express")
const router=express.Router();
const adminUsername='admin'
const adminPassword='Grishma0605'


router.post("/adminLogin",(req,res)=>{
    const {username,password}=req.body
    if (username===adminUsername||password===adminPassword){
        res.send("Admin is here")

    }
    else{
        res.statusCode(401).send("Unauthorized")
    }
})

module.exports=router