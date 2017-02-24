const Carts = require('../model/cart');
const async = require('async');
const httpCode = require('../config/httpCode');

const loadUri = (items)=> {
  return items.map(({item, count})=> {
    return {uri: `items/${item}`, count}
  });
};

class CartController {
  getAll(req, res, next) {
    async.series({
      items: (done)=> {
        Carts.find({}, (err, docs)=> {
          if (err) {
            return done(err);
          }
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
    const cartId = req.params.cartId;

    Carts.findByIdAndRemove(cartId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      return res.sendStatus(httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const cartId = req.params.cartId;

    Carts.findByIdAndUpdate(cartId, req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      return res.sendStatus(httpCode.NO_CONTENT);
    });
  }
}

module.exports = CartController;