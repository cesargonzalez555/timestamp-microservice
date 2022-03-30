// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date", (req, res) => {
  let param = req.params.date;
  let date;
  let response;

  if (param.length === 0) {
    date = new Date();
    response = { 
      unix: date.getTime(),
      utc: date.toGMTString()
    }
  }
  else if (isNaN(Number(param))) {
    //No es int
    if (isNaN(Date.parse(param))) {
      response = { error : "Invalid Date" }
    }
    else {
       date = new Date(param);
       response = { 
         unix: date.getTime(),
         utc: date.toGMTString()
       }
    }
  }
  else {
    //Es int
    date = new Date(parseInt(param));
    response = { 
      unix: date.getTime(),
      utc: date.toGMTString()
    }
  }
  res.json(response);
});

app.get("/api/", (req, res) => {
  let date;
  let response;

    date = new Date();
    response = { 
      unix: date.getTime(),
      utc: date.toGMTString()
    }

  res.json(response);
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
