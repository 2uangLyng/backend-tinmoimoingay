import { Router } from "express";
import {
  getAllNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
  searchNews,
} from "../controllers/news.controller";

const router = Router();

router.get("/", getAllNews);
router.get("/:slug", getNewsBySlug);
router.post("/", createNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);
router.get("/search/:query", searchNews); // Assuming searchNews is defined in the controller

export default router;
