const {Router} =require('express');
const CategoriesController = require('../../controller/CategoryController');

const router = Router();
const categoriesCtrl = new CategoriesController();

router.get('/', categoriesCtrl.getAll);
router.get('/:id', categoriesCtrl.getCategory);
router.post('/', categoriesCtrl.addCategory);
router.delete('/:id', categoriesCtrl.removeCategory);
router.put('/:id', categoriesCtrl.updateCategory);
router.post('/:id', categoriesCtrl.addItem);

module.exports = router;