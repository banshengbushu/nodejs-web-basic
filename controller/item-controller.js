const Items = require("../model/item");
const httpCode = require('../config/httpCode');
const async = require('async');

class ItemController {
  getAll(req, res, next) {
    async.series({
      items: (done)=> {
        Items.find({}).populate('category').exec(done);
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
    const _id = req.params.itemId;

    Items.findById(_id).populate('category').exec((err, item)=> {
      if (err) {
        return next(err)
      }
      if (!item) {
        return res.status(httpCode.NOT_FOUND);
      }
      return res.status(httpCode.OK).send(item);
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
    const _id = req.params.itemId;

    Items.findByIdAndRemove(_id, (err, item)=> {
      if (err) {
        return next(err);
      }
      if (!item) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      return res.sendStatus(httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const _id = req.params.itemId;
    Items.findByIdAndUpdate(_id, req.body, (err, item)=> {
      if (err) {
        return next(err);
      }
      if (!item) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }

      return res.sendStatus(httpCode.NO_CONTENT);
    })
  }
}
module.exports = ItemController;