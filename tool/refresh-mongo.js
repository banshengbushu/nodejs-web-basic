const rawData = require('../raw-data/fixture');
const Item = require('../model/item');
const Category = require('../model/category');
const Cart = require('../model/cart');

const modelMap = {
  Item,
  Category,
  Cart
};

const docs = Object.keys(rawData);

module.exports = function refreshMongo(done) {
  docs.forEach((i)=> {
    modelMap[i].remove(()=> {
      modelMap[i].create(rawData[i], ()=> {
        docs.filter(doc=>doc !== i);
        if (docs.length === 0) {
          done();
        }
      })
    })
  })
};


