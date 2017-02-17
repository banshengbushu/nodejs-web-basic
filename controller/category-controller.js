const Categories = require('../model/category');
const Item = require('../model/item');
const httpCode = require('../config/httpCode');
const async = require('async');

class CategoryController {
  getAll(req, res, next) {
    Categories.find((err, categories)=> {
      if (err) {
        return next(err);
      }
      Categories.count({}, (err, totalCount)=> {
        return res.status(httpCode.OK).send({categories, totalCount});
      });
    })
  }

  getOne(req, res, next) {
    const _id = req.params.categoryId;
    Categories.findById(_id, (err, category)=> {
      if (err) {
        return next(err);
      }
      if (!category) {
        return res.status(httpCode.NOT_FOUND);
      }
      return res.status(httpCode.OK).send(category);
    });
  }

  create(req, res, next) {
    Categories.create(req.body, (err)=> {
      if (err) {
        return next(err);
      }
      return res.sendStatus(httpCode.CREATED);
    })
  }

  delete(req, res, next) {
    const _id = req.params.categoryId;

    async.waterfall([
      (done)=> {
        Item.findById(_id, done);
      },
      (docs, done)=> {
        if (docs) {
          done(true, null);
        } else {
          Categories.findByIdAndRemove(_id, (err, doc)=> {
            if (!doc) {
              done(false, null);
            }
            done(err, doc);
          });
        }
      }
    ], (err)=> {
      if (err === true) {
        return res.sendStatus(httpCode.BAD_REQUEST);
      }
      if (err === false) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(httpCode.NO_CONTENT);

    });
  }

  update(req, res, next) {
    const _id = req.params.categoryId;

    Categories.findByIdAndUpdate(_id, req.body, (err, category)=> {
      if (err) {
        return next(err);
      }
      if (!category) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }

      return res.sendStatus(httpCode.NO_CONTENT);

    });
  }
}
module.exports = CategoryController;