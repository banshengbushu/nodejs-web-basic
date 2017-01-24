import {Router} from 'express';
import CategoriesController from '../../controller/CategoryController';

const router = Router();
const categoriesCtrl = new CategoriesController();


router.get('/', categoriesCtrl.getAll);
router.get('/:id', categoriesCtrl.getCategory);
router.post('/', categoriesCtrl.addCategory);
router.delete('/:id', categoriesCtrl.removeCategory);
router.put('/:id', categoriesCtrl.updateCategory);
router.post('/:id', categoriesCtrl.addItem);
router.delete('/:id/:item_id', categoriesCtrl.removeItem);

export default router;