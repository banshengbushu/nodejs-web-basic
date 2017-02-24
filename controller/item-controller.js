const async = require('async');

const Items = require("../model/item");
const httpCode = require('../config/httpCode');
class ItemController {
  getAll(req, res, next) {
    async.series({
      items: (done)=> {
        Items.find({})
          .populate('category')
          .exec(done);
      },
      totalCount: (done)=> {
        Items.count(done);
      },
    }, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const itemId = req.params.itemId;

    Items.findById(itemId)
      .populate('category')
      .exec((err, doc)=> {
        if (err) {
          return next(err)
        }
        if (!doc) {
          return res.status(httpCode.NOT_FOUND);
        }
        return res.status(httpCode.OK).send(doc);
      })
  }

  create(req, res, next) {
    Items.create(req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.CREATED).send({uri: `items/${doc._id}`});
    })
  }

  delete(req, res, next) {
    const itemId = req.params.itemId;

    Items.findByIdAndRemove(itemId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      return res.sendStatus(httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    Items.findByIdAndUpdate(req.params.itemId, req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }

      return res.sendStatus(httpCode.NO_CONTENT);
    })
  }
}
module.exports = ItemController;