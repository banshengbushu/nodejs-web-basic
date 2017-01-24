let Carts = require('../model/cart');
let Items = require('../model/item');
let async = require('async');

export default class CartController {
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

  addItem(req, res, next) {
    let name = req.body.name;
    let price = req.body.price;
    let id = req.params.id;

    async.waterfall([
      (done)=> {
        Items.create({name, price}, (err, item) => {
          done(err, item);
        });
      },
      (done, data)=> {
        Carts.findOne({id}, (err, cart)=> {
          if (err) {
            done(err, cart);
          }
          cart.items.push(data._id);
          cart.save(done);
        })
      }
    ], (err)=> {
      if (err) {
        next(err)
      }
      res.sendStatus(201);
    });
  }

  removeItem(req, res, next) {
    const _id = req.params.id;
    const itemId = req.params.item_id;

    async.waterfall([
      (done)=> {
        Carts.findOne({_id}, (err, cart)=> {
          done(err, cart);
        })
      },
      (done, data)=> {
        const index = data.items.indexOf(itemId);
        data.items.splice(index, 1);
        data.save(done)
      }
    ], (err)=> {
      if (err) {
        next(err)
      }
      res.sendStatus(204);
    });
  }
}