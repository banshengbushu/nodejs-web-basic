const Carts = require('../model/cart');
const async = require('async');
const httpCode = require('../config/httpCode');

class CartController {
  getAll(req, res, next) {
    async.series({
      items: (done)=> {
        Carts.find({}).populate('items').exec(done)
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
    Carts.create(req.body, (err)=> {
      if (err) {
        return next(err);
      }
      return res.sendStatus(httpCode.CREATED);
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