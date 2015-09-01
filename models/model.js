var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('connected to mongodb');
});

module.exports = {

  getUserModel: function(){
    var userSchema = mongoose.Schema({
      email: String,
      password: String,
      listIds: [String],
      updated: {type: Date, default: Date.now},
    });
    return mongoose.model('User', userSchema);
  },

  getItemModel: function(){
    var itemSchema = mongoose.Schema({
      name: String,
      value: {type: Number, default: 1},
      quantity: {type: Number, default: 0},
      unit: String,
      listId: String,
      updated: {type: Date, default: Date.now},
    });
    return mongoose.model('Item', itemSchema);
  },

  getListModel: function(){
    var listSchema = mongoose.Schema({
      name: String,
      updated: {type: Date, default: Date.now},
    });
    return mongoose.model('List', listSchema);
  },
}
