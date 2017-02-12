let Categories = require('../model/category');
let Items = require('../model/item');
let async = require('async');

export default class CategoryController {
  getAll(req, res, next) {
    Categories.find((err, categories)=> {
      if (err) {
        next(err);
      }
      res.send(categories);
    })
  }

  getCategory(req, res, next) {
    const _id = req.params.id;
    Categories.findOne({_id},(err, category)=> {
      if (err) {
        next(err);
      }
      res.send(category);
    });
  }

  addCategory(req, res, next) {
    const name = req.body.name;
    Categories.create({name}, (err)=> {
      if (err) {
        next(err);
      }
      res.send(201);
    })
  }


  removeCategory(req, res, next) {
    const _id = req.params.id;

    Categories.findOneAndRemove({_id}, (err)=> {
      if (err) {
        next(err);
      }
      res.sendStatus(204);
    })

  }

  updateCategory(req, res, next) {
    const _id = req.params.id;
    const name = {name: req.body.name};

    Categories.update({_id}, name, (err)=> {
      if (err) {
        next(err);
      }
      res.sendStatus(204);

    });
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
        Categories.findOne({id}, (err, category)=> {
          if (err) {
            done(err);
          }
          category.items.push(data._id);
          category.save(done);
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
        Categories.findOne({_id}, (err, category)=> {
          done(err, category);
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