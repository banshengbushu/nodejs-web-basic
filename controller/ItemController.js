let Items = require("../model/item");

export default class ItemController {
  getAll(req, res, next) {
    Items.find({}).populate('category').exec((err, items)=> {
      if (err) {
        next(err);
      }
      res.send(items);
    })
  }

  getItem(req, res, next) {
    const _id = req.params.id;

    Items.findOne({_id}).populate('category').exec((err, item)=> {
      if (err) {
        next(err)
      }
      res.send(item);
    })
  }

  addItem(req, res, next) {
    const name = req.body.name;
    const price = req.body.price;
    Items.create({name, price}, (err)=> {
      if (err) {
        next(err);
      }
      res.sendStatus(201);
    })
  }

  removeItem(req, res, next) {
    const _id = req.params.id;

    Items.findOneAndRemove({_id}, (err)=> {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    })
  }

  updateItem(req, res, next) {
    const _id = req.params.id;
    const item = {name: req.body.name, price: req.body.price};
    Items.update({_id}, item, (err)=> {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    })
  }
}
