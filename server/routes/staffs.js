var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Staffs = require("../models/staffs")

mongoose.connect('mongodb://niulanstaffs1:123456@127.0.0.1:27017/niulanstaffs');
// mongoose.connect('mongodb://127.0.0.1:27017/niulanstaffs');

mongoose.connection.on("connected",function(){
  console.log("MongoDB connected success.");
});
mongoose.connection.on("error",function(){
  console.log("MongoDB connected fail.");
});
mongoose.connection.on("disconnected",function(){
  console.log("MongoDB disconnected.");
});

router.get("/",function(req,res,next){
  Staffs.find({},function (err,doc) {
    if(err){
      res.json({
        staus:"1",
        msg:err.message
      });
    }else{
      res.json({
        staus:"0",
        msg:"",
        result:{
          count:doc.length,
          list:doc
        }
      });
    }
  })
});

router.post("/login",function(req,res,next){
  var param={
    staffId:req.body.staffId,
    password:req.body.password
  }
  Staffs.findOne(param,function(err,doc){
    if(err){
      res.json({
        status:"1",
        msg:err.message
      });
    }else{
      if(doc){
        let docObj = doc.toObject();
        res.cookie("staffId",docObj.staffId,{
          path:"/",
          maxAge:1000*60*60
        });
        res.json({
          status:"0",
          msg:"",
          result:{
            staffId:docObj.staffId
          }
        });
      }else{
        res.json({
          status:"1",
          msg:"",
          result:""

        });
      }
    }
  })
});

router.post("/adminLogin",function(req,res,next){
  var param={
    staffId:req.body.staffId,
    password:req.body.password
  }
  Staffs.findOne(param,function(err,doc){
    if(err){
      res.json({
        status:"1",
        msg:err.message
      });
    }else{
      if(doc){
        let docObj = doc.toObject();
        res.cookie("staffId",docObj.staffId,{
          path:"/",
          maxAge:1000*60*60
        });
        res.json({
          status:"0",
          msg:"",
          result:{
            staffId:docObj.staffId
          }
        });
      }else{
        res.json({
          status:"1",
          msg:"",
          result:""

        });
      }
    }
  })
});

router.post("/logOut",function (req,res,next) {
  res.cookie("staffId","",{
    path:"/",
    maxAge:-1
  })
  res.json({
    status:"0",
    msg:"",
    result:""
  })
});
router.post("/getData",function (req,res,next) {
  let staffId = req.cookies.staffId;
  Staffs.findOne({staffId:staffId},function(err,doc){
    if(err){
      res.json({
        status:"1",
        meg:err.message
      });
    }else{
      if(doc){
        let docObj = doc.toObject();
        console.log("docObj:"+docObj);
        res.json({
          status:"0",
          msg:"",
          result:{
            currentStaff:docObj
          }
        });
      }
    }
  })
});

router.post("/deleteData",function(req,res,next){
  let staffId = req.cookies.staffId;
  let workTimeDate = req.body.date;
  Staffs.update({staffId:staffId},{$pull:{"workTime":{"date":workTimeDate}}},function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:""
      })
    }else{
      res.json({
        status:"0",
        msg:"",
        result:"deleteDate success"
      });
    }
  });
});

router.post("/insertWorkTime",function(req,res,next){
  let currentStaffId = req.body.currentStaffId;
  let date = req.body.date;
  let startTime = req.body.startTime;
  let endTime = req.body.endTime;
  let restTime = req.body.restTime;
  let insertWorkTime={
    currentStaffId,
    date,
    startTime,
    endTime,
    restTime,
  };
  Staffs.update({staffId:currentStaffId},{$push:{"workTime":insertWorkTime}},function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:""
      })
    }else{
      res.json({
        status:"0",
        msg:"",
        result:"insertWorkTime success"
      });
    }
  });
});
  router.post("/confirmDate",function(req,res,next){
    let staffId=req.body.staffId;
    Staffs.findOne({staffId:staffId},function(err,doc){
      if(err){
        res.json({
          status:"1",
          meg:err.message
        });
      }else{
        console.log("confirmed:"+doc.confirmed);
        doc.confirmed=true;
        doc.save();
        res.json({
          status:"0",
          msg:"",
          result:"comfirmDate success"
        });
      }
    })
  });
module.exports=router;
