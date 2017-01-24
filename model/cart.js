let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let cartSchema = new Schema({
  id: Number,
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
}, {
  versionKey: false
});

module.exports = mongoose.model("Cart", cartSchema);