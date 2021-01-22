const express = require("express");
var async = require('async');
const router = express.Router();
var bodyParser = require("body-parser");
var db = require("./db");


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

router.post("/addnote", async function (req, res) {

    
  var query = "INSERT INTO `mas_note`(Note,Date) VALUES ('"+req.body.note+"','"+req.body.date+"')";

    console.log(query);
    
      db.query(query, async function (err, response) {
        if (err) {
          console.log(err.message); 
          res.send({ status: 0, msg: "Failed", data: [] }); 
        }
            else {
              res.send({ status: 0, msg: "Note saved", data: []  });
        }
      })
});

router.put("/updatenote", function (req, res) {

  var query = "UPDATE  `mas_note` SET Note = '" + req.body.note + "',Date = '" + req.body.date + "' WHERE NoteId=" + req.body.noteId + "";



  console.log(query)

  db.query(query, function (err, response) {
    if (err) {
      console.log(err.message)
    }
    else {
      res.send({ status: 0, msg: "Updated", data: response });
    }
  })
})

module.exports = router;

