var express = require('express');
var models = require('../models/model');
var UserModel = models.getUserModel();

var router = express.Router();

/* GET users listing. */
router.get('/getUser', function(req, res, next) {
  email = (req.query.email).toLowerCase();
  UserModel.find({email: email}, function(err, users){
    if (err) return console.error(err);
    if (users.length < 0){
      res.send(users[0]);
    }
    else{
      res.send({});
    }
  });
});

router.get('/newUser', function(req, res, next) {
  email = (req.query.email).toLowerCase();
  UserModel.find({email: email}, function(err, users){
    if (err){
      console.error(err);
      res.send(err);
      return;
    }
    if (users.length == 0){
      password = req.query.password;
      var user = new UserModel({ email: email, password: password });
      user.save(function (err, newUser){
        if (err){
          console.error(err);
          res.send(err);
          return;
        }
        else {
          console.log(newUser.email + ' saved to db.');
          res.send(user);
        }
     });
    }
    else{
      res.send({});
    }
  });
});

router.get('/addList', function(req, res, next) {
  email = (req.query.email).toLowerCase();
  UserModel.find({email: email}, function(err, users){
    if (err){
      console.error(err);
      res.send(err);
      return;
    }
    if (users.length > 0){
      var user = users[0];
      if(!(user.listIds.contains(req.query.listId))){
        user.listIds.push(req.query.listId);
        user.save(function (err, upUser){
          if (err){
            console.error(err);
            res.send(err);
            return;
          }
          else {
            console.log(upUser.email + ' updated with new lists: ' + upUser.listIds);
            res.send(upUser);
          }
        });
      }
    }
    else{
      res.send({});
    }
  });
});

module.exports = router;
