import { Router } from 'express';
import { getAllNews, getNewsById, createNews } from '../controllers/news.controller';

const router = Router();

router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/', createNews);

export default router; 