var express = require('express');
var models = require('../models/model');
var listModel = models.getListModel();

var router = express.Router();

router.get('/getList', function(req, res, next) {
  var name = (req.query.name).toLowerCase();
  listModel.find({name: name}, function(err, lists){
    if (err){
      console.error(err);
      res.send(err);
      return;
    }
    console.log(lists);
    if (lists.length > 0){
      var list = lists[0];
      res.send(list);
    }
    else{
      res.send({});
    }
  });
});

router.get('/newList', function(req, res, next) {
  name = (req.query.name).toLowerCase();
  var list = new listModel({ name: name });
  list.save(function (err, list){
    if (err){
      console.error(err);
      res.send(err);
      return;
    }
    else {
      console.log(list.name + ' saved to db.');
      res.send(list);
    }
 });
});

module.exports = router;
