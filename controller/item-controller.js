const Items = require("../model/item");
const httpCode = require('../config/httpCode');

class ItemController {
  getAll(req, res, next) {
    Items.find({}).populate('category').exec((err, items)=> {
      if (err) {
        return next(err);
      }
      Items.count({}, (err, totalCount)=> {
        return res.status(httpCode.OK).send({items, totalCount});
      });
    })
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

    Items.create(req.body, (err)=> {
      if (err) {
        return next(err);
      }
      return res.sendStatus(httpCode.CREATED);
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