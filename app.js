const express = require("express");
const app = express();
const dbConnect = require("./db/dbConnect");
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./db/user");
const Compe = require("./db/compe");
const Appl = require("./db/applications")
const auth = require("./auth");
const Heroform = require("./db/heroform");
dbConnect();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// body parser configuration
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

app.post("/register", (request, response) => {
  // hash the passwords
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        name: request.body.name,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        error,
      });
    });
})
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ name: request.body.name })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
 
          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.name,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            id: user._id,
            name: user.name,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "name not found",
        e,
      });
    });
});

app.post("/compe", auth, (request, res) => {
  Compe.create(request.body)
  .then((competition)=> {
    res.statusCode =200;
    res.setHeader('Content-Type', 'application/json');
    res.json(competition);
  })
  .catch((error) => {
    res.status(400).send({
      message: "some error occured :(",
      error,
    });
  });
})
app.get("/compe", (req, res) =>{
  Compe.find({})
  .then((competitions)=> {
    res.statusCode=200;
    res.json(competitions)
  });
})
app.get("/compe/:compeid", (req, res) =>{
  Compe.findById(req.params.compeid)
  .then((competitions)=> {
    res.statusCode=200;
    res.json(competitions)
  }, (err) => next(err))
  .catch((err) => next(err));
})
app.put("/compe/:compeid", auth, (req, res) => {
  Compe.findByIdAndUpdate(req.params.compeid, {$set: req.body})
  .then((compe)=> {
    Compe.findById(compe._id)
    .then((competitions)=> {
      res.statusCode=200;
      res.json(competitions)
    }, (err) => next(err))
    .catch((err) => next(err));
  })
})
app.delete("/compe/:compeid", auth, (req, res) => {
  Compe.findByIdAndRemove(req.params.compeid)
      .then((resp) => { 
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
});
app.post("/appls", auth, (req, res) => {
  Appl.create(req.body)
  .then((appl)=> {
    res.statusCode =200;
    res.setHeader('Content-Type', 'application/json');
    res.json(appl);
  });
});
app.get("/appls", (req, res) =>{
  Appl.find({})
  .populate('userid')
  .then((appls)=> {
    res.statusCode=200;
    res.json(appls)
  });
})
app.get("/appls/:compeid",auth, (req, res) =>{
  Compe.findById(req.params.compeid)
  .then((competitions)=> {
    res.statusCode=200;
    res.json(competitions)
  }, (err) => next(err))
  .catch((err) => next(err));
})
app.put("/appls/:applid",auth, (req, res) => {
  Appl.findByIdAndUpdate(req.params.applid, {$set: req.body})
  .then((a)=> { 
    Appl.findById(a._id)
    .then((applications)=> {
      res.statusCode=200;
      res.json(applications)
    }, (err) => next(err))
    .catch((err) => next(err));
  })
})
app.post("/GDform", (req, res) => {
  Heroform.create(req.body)
  .then((appl)=> {
    res.statusCode =200;
    res.setHeader('Content-Type', 'application/json');
    res.json(appl);
  });
});

module.exports = app;