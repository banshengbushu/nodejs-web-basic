const Categories = require('../model/category');
const httpCode = require('../config/httpCode');

class CategoryController {
  getAll(req, res, next) {
    Categories.find((err, categories)=> {
      if (err) {
        next(err);
      }
      const totalCount = categories.length;
      res.status(httpCode.OK).send({categories, totalCount});
    })
  }

  getOne(req, res, next) {
    const _id = req.params.id;
    Categories.findOne({_id}, (err, category)=> {
      if (err) {
        next(err);
      }
      if (!category) {
        res.status(httpCode.NOT_FOUND);
      }
      res.status(httpCode.OK).send(category);
    });
  }

  create(req, res, next) {
    const name = req.body.name;
    Categories.create({name}, (err)=> {
      if (err) {
        next(err);
      }
      res.sendStatus(httpCode.CREATED);
    })
  }


  delete(req, res, next) {
    const _id = req.params.id;

    Categories.findOneAndRemove({_id}, (err, category)=> {
      if (err) {
        next(err);
      }
      if (!category) {
        res.sendStatus(httpCode.NOT_FOUND);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })

  }

  update(req, res, next) {
    const _id = req.params.id;
    const name = {name: req.body.name};

    Categories.update({_id}, name, (err, category)=> {
      if (err) {
        next(err);
      }
      if (!category) {
        res.sendStatus(httpCode.NOT_FOUND);
      }

      res.sendStatus(httpCode.NO_CONTENT);

    });
  }
}
module.exports = CategoryController;