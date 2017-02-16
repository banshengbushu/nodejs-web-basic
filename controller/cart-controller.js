const Carts = require('../model/cart');
const async = require('async');
const httpCode = require('../config/httpCode');

class CartController {
  getAll(req, res, next) {
    Carts.find({}).populate('items').exec((err, carts)=> {
      if (err) {
        return next(err);
      }
      Carts.count({}, (err, totalCount)=> {
        return res.status(httpCode.OK).send({carts, totalCount});
      });
    })
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