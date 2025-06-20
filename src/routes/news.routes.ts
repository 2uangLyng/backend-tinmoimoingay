import { Router } from "express";
import {
  getAllNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
  searchNews,
  getFeaturedNews,
  getLatestNews,
} from "../controllers/news.controller";

const router = Router();

router.get("/", getAllNews);
router.get("/featured", getFeaturedNews);
router.get("/latest", getLatestNews);
router.get("/:slug", getNewsBySlug);
router.post("/", createNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);
router.get("/search/:query", searchNews);

export default router;
