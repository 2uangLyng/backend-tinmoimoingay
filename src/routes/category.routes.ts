import { Router } from "express";
import {
  getAllCategories,
  createCategory,
  getNewsByCategory,
  getNewGroupsByCategory,
} from "../controllers/category.controller";

const router = Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.get("/by-category", getNewGroupsByCategory); // Get news by category
router.get("/:category", getNewsByCategory); // Reuse the same handler for search
export default router;
