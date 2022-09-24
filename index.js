// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/", function (req, res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:date", function (req, res) {
  try {
    const paramDate = req.params.date;

    if (!Math.floor(new Date(Number(paramDate)).getTime()) && new Date(`${paramDate}`).toUTCString() === "Invalid Date") {
      res.json({ error: "Invalid Date" })

    }else if (new Date(`${paramDate}`).toUTCString() === "Invalid Date") {
      res.json({
        unix: Math.floor(new Date(Number(paramDate)).getTime()),
        utc: new Date(Number(paramDate)).toUTCString(),
      });
    } else {
      res.json({
        unix: Math.floor(new Date(paramDate).getTime()),
        utc: new Date(paramDate).toUTCString(),
      });
    }
  } catch {
    error => console.log(error.message);
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log(
    "Your app is listening on port " + `http://localhost:${process.env.PORT}`
  );
});
