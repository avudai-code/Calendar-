var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
const router = express.Router();
var app = express();
var http = require("http").Server(app);




// api files
var version = "/api/v1";



app.use(version, require("./routes/note"));



var db =require("./routes/db");





// header access control

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// runing on port
app.set("port", 8152);
app.set("host", "0.0.0.0");
http.listen(app.get('port'), '0.0.0.0', function () {
  console.log(
    "Express server listening on port " +
    app.get("host") +
    ":" +
    app.get("port")
  );
});

