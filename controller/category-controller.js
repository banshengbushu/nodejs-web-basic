const async = require('async');
const Categories = require('../model/category');
const Item = require('../model/item');
const httpCode = require('../config/httpCode');


class CategoryController {
  getAll(req, res, next) {
    async.series({
      items: (done)=> {
        Categories.find({}, done);
      },
      totalCount: (done)=> {
        Categories.count(done);
      }

    }, (err, result)=> {
      if (err) {
        return next(err);
      }

      return res.status(httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;
    Categories.findById(category, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.status(httpCode.NOT_FOUND);
      }
      return res.status(httpCode.OK).send(doc);
    });
  }

  create(req, res, next) {
    Categories.create(req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.CREATED).send({uri: `categories/${doc._id}`});
    })
  }

  delete(req, res, next) {
    const category = req.params.categoryId;

    async.waterfall([
      (done)=> {
        Item.findOne({category}, done);
      },
      (docs, done)=> {
        if (docs) {
          return done(true, null);
        } else {
          Categories.findByIdAndRemove(category, (err, doc)=> {
            if (!doc) {
              return done(false, null);
            }
            return done(err, doc);
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
    const categoryId = req.params.categoryId;

    Categories.findByIdAndUpdate(categoryId, req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }

      return res.sendStatus(httpCode.NO_CONTENT);

    });
  }
}
module.exports = CategoryController;