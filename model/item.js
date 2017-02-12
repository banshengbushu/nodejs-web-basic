'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let itemSchema = new Schema({
  name: String,
  price: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
}, {
  versionKey: false
});

module.exports = mongoose.model("Item", itemSchema);


