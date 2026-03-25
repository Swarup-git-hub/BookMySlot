
const router = require("express").Router();

router.post("/login",(req,res)=>{
    res.json({token:"demo-token", role:"STUDENT"});
});

module.exports = router;
