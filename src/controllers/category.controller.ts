import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import asyncHandler from "express-async-handler";

export const getAllCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const categories = await CategoryService.getAll();
    res.json(categories);
  }
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("Request body:", req.body);

    const { name } = req.body;
    console.log("Creating category with name:", name);
    const category = await CategoryService.create(req.body);
    res.status(201).json(category);
  }
);

export const getNewsByCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { category } = req.params;
    const news = await CategoryService.getNewsByCategory(category);
    res.json(news);
  }
);
