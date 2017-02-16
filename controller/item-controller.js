const Items = require("../model/item");
const httpCode = require('../config/httpCode');

class ItemController {
  getAll(req, res, next) {
    Items.find({}).populate('category').exec((err, items)=> {
      if (err) {
        next(err);
      }
      Items.count({}, (err, totalCount)=> {
        res.status(httpCode.OK).send({items, totalCount});
      });
    })
  }

  getOne(req, res, next) {
    const _id = req.params.id;

    Items.findById(_id).populate('category').exec((err, item)=> {
      if (err) {
        next(err)
      }
      if (!item) {
        res.status(httpCode.NOT_FOUND);
      }
      res.status(httpCode.OK).send(item);
    })
  }

  create(req, res, next) {

    Items.create(req.body, (err)=> {
      if (err) {
        next(err);
      }
      res.sendStatus(httpCode.CREATED);
    })
  }

  delete(req, res, next) {
    const _id = req.params.id;

    Items.findByIdAndRemove(_id, (err, item)=> {
      if (err) {
        next(err);
      }
      if (!item) {
        res.sendStatus(httpCode.NOT_FOUND);
      }
      res.sendStatus(httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const _id = req.params.id;
    Items.findByIdAndUpdate(_id, req.body, (err, item)=> {
      if (err) {
        next(err);
      }
      if (!item) {
        res.sendStatus(httpCode.NOT_FOUND);
      }

      res.sendStatus(httpCode.NO_CONTENT);
    })
  }
}
module.exports = ItemController;