import { Request, Response } from "express";
import { NewsService } from "../services/news.service";
import asyncHandler from "express-async-handler";
import { PaginationQuery } from "../types";

export const getAllNews = asyncHandler(
  async (req: Request<{}, {}, {}, PaginationQuery>, res: Response) => {
    const page = parseInt(req.query.page || "1");
    const pageSize = parseInt(req.query.pageSize || "10");
    const categorySlug = req.query.category;

    const { news, total } = await NewsService.findAll(
      categorySlug,
      page,
      pageSize
    );

    res.json({
      data: news,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  }
);

export const getNewsById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const news = await NewsService.findById(id);

  if (!news) {
    res.status(404).json({ message: "News not found" });
    return;
  }

  res.json(news);
});

export const createNews = asyncHandler(async (req: Request, res: Response) => {
  const news = await NewsService.create(req.body);
  res.status(201).json(news);
});

export const updateNews = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedNews = await NewsService.update(id, req.body);
  if (!updatedNews) {
    res.status(404).json({ message: "News not found" });
    return;
  }
  res.json(updatedNews);
});

export const deleteNews = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const news = await NewsService.findById(id);

  if (!news) {
    res.status(404).json({ message: "News not found" });
    return;
  }

  await NewsService.delete(id);
  res.status(204).send();
});

export const getNewsBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const news = await NewsService.findBySlug(slug);

    if (!news) {
      res.status(404).json({ message: "News not found" });
      return;
    }

    res.json(news);
  }
);
export const searchNews = asyncHandler(async (req: Request, res: Response) => {
  const query = req.params.query;

  const { news, total } = await NewsService.search(query);

  res.json({
    data: news,
    total,
  });
});
export const getFeaturedNews = asyncHandler(
  async (req: Request, res: Response) => {
    const { news, total } = await NewsService.getFeatured();

    if (news.length === 0) {
      res.status(404).json({ message: "News not found" });
      return;
    }

    res.status(200).json({
      data: news,
      total,
    });
  }
);

export const getLatestNews = asyncHandler(
  async (req: Request, res: Response) => {
    const { news, total } = await NewsService.getLatest();

    if (!news || news.length === 0) {
      res.status(404).json({ message: "News not found" });
      return;
    }

    res.json({
      data: news,
      total,
    });
  }
);
