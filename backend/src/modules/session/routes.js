
const router = require("express").Router();

router.post("/",(req,res)=>{
    res.json({message:"Session created"});
});

module.exports = router;
