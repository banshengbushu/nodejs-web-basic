const {Router} = require('express');
const CartController =require( '../../controller/CartController');

const router = Router();
const cartCtrl = new CartController();

router.get('/', cartCtrl.getAll);
router.get('/:id', cartCtrl.getCart);
router.post('/', cartCtrl.addCart);
router.delete('/:id', cartCtrl.removeCart);
router.put('/:id', cartCtrl.updateCart);
router.post('/:id', cartCtrl.addItem);

module.exports = router;
