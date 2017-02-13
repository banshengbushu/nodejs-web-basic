const {Router}= require('express');
const ItemController = require('../../controller/ItemController');

const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.get('/:id', itemCtrl.getItem);
router.post('/', itemCtrl.addItem);
router.delete('/:id', itemCtrl.removeItem);
router.put('/:id', itemCtrl.updateItem);

module.exports = router;