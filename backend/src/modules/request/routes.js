
const router = require("express").Router();

router.post("/",(req,res)=>{
    res.json({message:"Request created"});
});

router.patch("/:id/approve",(req,res)=>{
    res.json({message:"Approved"});
});

module.exports = router;
