'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String
}, {
  versionKey: false
});

module.exports = mongoose.model("Category", categorySchema);