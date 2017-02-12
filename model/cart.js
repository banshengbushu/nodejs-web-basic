let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let cartSchema = new Schema({
  userId: String,
  items: [{
    count: Number,
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  }]
}, {
  versionKey: false
});

module.exports = mongoose.model("Cart", cartSchema);