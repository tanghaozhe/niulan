var express = require('express');
var router = express.Router();

var Staff = require("./../models/staffs")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post("/login",function(req,res,next){
//   var param={
//     userName:req.body.userName,
//     userPwd:req.body.userPwd
//   }
// });
module.exports = router;
