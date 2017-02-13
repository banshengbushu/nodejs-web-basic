const Carts = require('../model/cart');
const Items = require('../model/item');
const async = require('async');

class CartController {
  getAll(req, res, next) {
    Carts.find({}).populate('items').exec((err, carts)=> {
      if (err) {
        next(err);
      }
      res.send(carts);
    });
  }

  getCart(req, res, next) {
    const _id = req.params.id;

    Carts.findOne({_id}).populate('items').exec((err, cart)=> {
      if (err) {
        next(err)
      }
      res.send(cart);
    })
  }

  addCart(req, res, next) {
    const id = req.body.id;
    Carts.create({id}, (err)=> {
      if (err) {
        next(err);
      }
      res.sendStatus(201);
    })
  }

  removeCart(req, res, next) {
    const _id = req.params.id;

    Carts.findOneAndRemove({_id}, (err)=> {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    })
  }

  updateCart(req, res, next) {
    const _id = req.params.id;
    const cart = {id: req.body.id};
    Carts.update({_id}, cart, (err)=> {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    })
  }
}
module.exports = CartController;