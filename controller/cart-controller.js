const Carts = require('../model/cart');
const async = require('async');
const httpCode = require('../config/httpCode');

class CartController {
  getAll(req, res, next) {
    Carts.find({}).populate('items').exec((err, carts)=> {
      if (err) {
        next(err);
      }
      Carts.count({}, (err, totalCount)=> {
        res.status(httpCode.OK).send({carts, totalCount});
      });
    })
  }

  getOne(req, res, next) {
    const _id = req.params.id;

    Carts.findById({_id}).populate('items').exec((err, cart)=> {
      if (err) {
        next(err)
      }
      if (!cart) {
        res.status(httpCode.NOT_FOUND);
      }
      res.status(httpCode.OK).send(cart);
    })
  }

  create(req, res, next) {
    Carts.create(req.body, (err)=> {
      if (err) {
        next(err);
      }
      res.sendStatus(httpCode.CREATED);
    })
  }

  delete(req, res, next) {
    const _id = req.params.id;

    Carts.findByIdAndRemove({_id}, (err, cart)=> {
      if (err) {
        next(err);
      }
      if (!cart) {
        res.sendStatus(httpCode.NOT_FOUND);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const _id = req.params.id;

    Carts.findByIdAndUpdate(_id, req.body, (err, cart)=> {
      if (err) {
        next(err);
      }
      if (!cart) {
        res.sendStatus(httpCode.NOT_FOUND);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }
}
module.exports = CartController;