import { Router } from 'express';
import { getAllCategories, createCategory, getNewsByCategory } from '../controllers/category.controller';

const router = Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.get('/:category', getNewsByCategory); // Reuse the same handler for search

export default router; 