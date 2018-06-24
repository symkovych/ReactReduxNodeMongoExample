//create user check email not used already
//validate password
//how work fetch
// while in app action '/users/checkAuthentication?type=text' ?type...
//addOrEditPosts componentWillReceiveProps
//redix-> index combineReducers
//redux-> store routeeMiddelware, thunkMiddelware
//registerServiceWorker

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var port = 3034;
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
//upload photo
const fileUpload = require('express-fileupload');

// connect to mongoDb
mongoose.connect('mongodb://localhost:27017/testDb');
var connection = mongoose.connection;

connection.once('connected', function () {
  console.log('-----connected to DB------');

  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

  app.use(bodyParser.json());

  app.use(express.static('src'));

  app.use(expressSession({ // почитайте і запишіть собі на що ці параетри впливають
    name: 'test', //If you have multiple apps running on the same hostname, then you need to separate the session cookies, for example set different names per app.
    key: 'testKey',
    secret: '1q2w3e4r5tdhgkdfhgejflkejgkdlgh8j0jge4547hh', //that to be safe use cookie
    resave: false, // resave session even it was not changed, mostly not needed
    rolling: true, // cookie will not be set on a response with an uninitialized session.
    saveUninitialized: false,
    store: new MongoStore({ //save in mongoDb the sessions
      url: 'mongodb://localhost:27017/testDb',
      autoReconnect: true,
      ssl: false
    }),

    cookie: {
      maxAge: 31 * 24 * 60 * 60 * 1000 // cookie deleted after 1 month
    }
  }));

  //upload photo

    app.use(fileUpload());

    app.post('/upload/:id', function(req, res) {
        var id = req.params.id;
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.sampleFile;

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('src/img/'+id+'.jpg', function(err) {
            if (err)
                return res.status(500).send(err);
            res.redirect('http://localhost:3000/myProfile');
        });
    });

    //add routes
  require('./routes/index')(app);

  app.listen(port, function () {
    console.log('server listening on port ' + port);
  });
});
// if connect error
connection.on('error', function (err) {
  console.log('Error', err);

  process.exit(1);
});

