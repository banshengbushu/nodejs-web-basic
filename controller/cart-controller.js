const Carts = require('../model/cart');
const async = require('async');
const httpCode = require('../config/httpCode');

const loadUri = (items)=> {
  const newItem = items.map(({item, count})=> {
    return {uri: `items/${item}`, count}
  });
  return newItem;
};

class CartController {
  getAll(req, res, next) {
    async.series({
      items: (done)=> {
        Carts.find({}, (err, docs)=> {
          let carts = docs.map((doc)=> {
            let cart = doc.toJSON();
            cart.items = loadUri(cart.items);
            return cart;
          });
          done(null, carts);
        });
      },
      totalCount: (done)=> {
        Carts.count(done);
      }

    }, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const _id = req.params.cartId;

    Carts.findById(_id, (err, cart)=> {
      if (err) {
        return next(err)
      }
      if (!cart) {
        return res.status(httpCode.NOT_FOUND);
      }
      return res.status(httpCode.OK).send(cart.toJSON());
    })
  }

  create(req, res, next) {
    Carts.create(req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.CREATED).send({uri: `carts/${doc._id}`});
    })
  }

  delete(req, res, next) {
    const _id = req.params.cartId;

    Carts.findByIdAndRemove(_id, (err, cart)=> {
      if (err) {
        return next(err);
      }
      if (!cart) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      return res.sendStatus(httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const _id = req.params.cartId;

    Carts.findByIdAndUpdate(_id, req.body, (err, cart)=> {
      if (err) {
        return next(err);
      }
      if (!cart) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      return res.sendStatus(httpCode.NO_CONTENT);
    })
  }
}

module.exports = CartController;