const Categories = require('../model/category');
const Items = require('../model/item');
const async = require('async');

class CategoryController {
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
    Categories.findOne({_id}, (err, category)=> {
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
}
module.exports = CategoryController;