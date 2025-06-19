import { Category as PrismaCategory } from ".prisma/client";
import slugify from "slugify";
import { CreateCategoryDto } from "../types";
import { prisma } from "./prisma.service";

export class CategoryService {
  static async getAll(): Promise<PrismaCategory[]> {
    return prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async create(data: CreateCategoryDto): Promise<PrismaCategory> {
    const slug = slugify(data.name, { lower: true });
    return prisma.category.create({
      data: {
        name: data.name,
        slug,
      },
    });
  }

  static async findBySlug(slug: string): Promise<PrismaCategory | null> {
    return prisma.category.findUnique({
      where: { slug },
    });
  }

  static async getNewsByCategory(
    categorySlug: string,
    page = 1,
    pageSize = 10
  ): Promise<{ news: any[]; total: number }> {
    const category = await this.findBySlug(categorySlug);
    if (!category) {
      throw new Error(`Category '${categorySlug}' not found`);
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where: { categoryId: category.id },
        include: { category: true },
        orderBy: { pubDate: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.news.count({ where: { categoryId: category.id } }),
    ]);

    return { news, total };
  }
}
