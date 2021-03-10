const express = require("express");
var async = require('async');
const router = express.Router();
var bodyParser = require("body-parser");
var db = require("./db");
const jwt= require("jsonwebtoken");
var  bcrypt = require('bcrypt');
const fileUpload = require('express-fileupload');





router.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.use(bodyParser());

router.post("/createjob",async function(req, res) {
  let job=req.body;
    var query = "INSERT INTO `tbl_pm_job`(job_title,job_description,job_skills_required,company_name,salary_range) VALUES ('"+job.job_title+"','"+job.job_description+"','"+job.job_skills_required+"','"+job.company_name+"','"+job.salary_range+"')";
      
      db.query(query, async function (err, response) {
        if (err) {
          console.log(err.message); 
          res.send({ status: 0, msg: "Failed", data: [] }); 
        }
            else {
              res.json({ status: 0, msg: "job created", data:[], });
        }
      })
    }); 



  router.get("/getjobs", function (req, res) {
  var query = "SELECT * FROM `tbl_pm_job`";
  db.query(query, function (err, response) {
    if (err) {
      console.log(err.message);
    } else {
      res.send({ status: 0, msg: "Success", data: response });
    }
  });
})

router.post("/getjobid", function (req, res) {
  var query = "SELECT * FROM `tbl_pm_job` WHERE id  ='" + req.body.Id + "'";
  db.query(query, function (err, response) {
    if (err) {
      console.log(err.message);
    } else {
      res.send({ status: 0, msg: "Success", data: response });
    }
  });
})

router.delete("/deletejob", function(req,res){ 
  var query = "DELETE FROM tbl_pm_job WHERE `id`='"+req.body.id+"' ";


  db.query(query,function(err,response){
    if(err){
      console.log(err.message);
    }else{
    //   res.send(response);
    res.send({ status: 0, msg: "Job Deleted Successfully", data: response });
    }  
  });
})

router.post("/applyjob",async function(req, res) {
  let job=req.body;
    var query = "INSERT INTO `tb1_pm_jobapplication`(job_id,job_title,candidate_name,candidate_skills,candidate_qualification,candidate_location) VALUES ('"+job.job_id+"','"+job.job_title+"','"+job.candidate_name+"','"+job.candidate_skills+"','"+job.candidate_qualification+"','"+job.candidate_location+"')";
      
      db.query(query, async function (err, response) {
        if (err) {
          console.log(err.message); 
          res.send({ status: 0, msg: "Failed", data: [] }); 
        }
            else {
              res.json({ status: 0, msg: "job Applied Successfully", data:[], });
        }
      })
    }); 






module.exports = router;
