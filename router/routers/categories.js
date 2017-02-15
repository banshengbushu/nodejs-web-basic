const {Router} =require('express');
const CategoriesController = require('../../controller/category-controller');

const router = Router();
const categoriesCtrl = new CategoriesController();

router.get('/', categoriesCtrl.getAll);
router.get('/:id', categoriesCtrl.getOne);
router.post('/', categoriesCtrl.create);
router.delete('/:id', categoriesCtrl.delete);
router.put('/:id', categoriesCtrl.update);

module.exports = router;