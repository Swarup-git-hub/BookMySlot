
const router = require("express").Router();

router.get("/",(req,res)=>{
    res.json([
        {id:1,status:"AVAILABLE"},
        {id:2,status:"BOOKED"}
    ]);
});

module.exports = router;
