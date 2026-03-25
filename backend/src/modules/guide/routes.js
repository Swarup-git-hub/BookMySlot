
const router = require("express").Router();

router.get("/requests",(req,res)=>{
    res.json([{id:1,teamId:1}]);
});

module.exports = router;
