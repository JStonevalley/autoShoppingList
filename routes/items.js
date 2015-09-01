var express = require('express');
var models = require('../models/model');
var ItemModel = models.getItemModel();

var router = express.Router();

router.get('/getItem', function(req, res, next) {
  name = (req.query.name).toLowerCase();
  listId = req.query.listId;
  ItemModel.find({name: name, listId: listId}, function(err, items){
    if (err){
      console.error(err);
      res.send(err);
      return;
    }
    console.log(items);
    if (items.length > 0){
      var item = items[0];
      res.send(item);
    }
    else{
      res.send({});
    }
  });
});

router.get('/searchItems', function(req, res, next) {
  name = (req.query.name).toLowerCase();
  listId = req.query.listId;
  ItemModel.find({name: new RegExp('^'+name), listId: listId}, function(err, items){
    if (err){
      console.error(err);
      res.send(err);
      return;
    }
    console.log(items);
    if (items.length > 0){
      res.send(items);
    }
    else{
      res.send([]);
    }
  });
});

router.get('/newItem', function(req, res, next) {
  name = (req.query.name).toLowerCase();
  listId = req.query.listId;
  if (req.query.unit){
    unit = (req.query.unit).toLowerCase();
  }
  else{
    unit = "";
  }
  var item = new ItemModel({ name: name, listId: listId, unit: unit });
  item.save(function (err, item){
    if (err){
      console.error(err);
      res.send(err);
      return;
    }
    else {
      console.log(item.name + ' saved to db.');
      res.send(item);
    }
  });
});

module.exports = router;
