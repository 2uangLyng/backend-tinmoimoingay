import { News, Prisma } from ".prisma/client";
import { CreateNewsDto } from "../types";
import { prisma } from "./prisma.service";
import slugify from "slugify";

export class NewsService {
  static async create(data: CreateNewsDto): Promise<News> {
    const slug = slugify(data.title, {
      lower: true,
    });

    // Tìm category từ tên
    const category = await prisma.category.findUnique({
      where: {
        name: data.categoryName,
      },
    });

    if (!category) {
      throw new Error(`Category '${data.categoryName}' not found`);
    }

    return prisma.news.create({
      data: {
        title: data.title,
        description: data.description,
        slug,
        thumbnail: data.thumbnail,
        content: data.content,
        pubDate: new Date(data.pubDate),
        categoryId: category.id,
      },
    });
  }

  static async findById(id: number): Promise<News | null> {
    return prisma.news.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  static async findAll(
    categorySlug?: string,
    page = 1,
    pageSize = 10
  ): Promise<{ news: News[]; total: number }> {
    const where: Prisma.NewsWhereInput = {};

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        include: { category: true },
        orderBy: { pubDate: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.news.count({ where }),
    ]);

    return { news, total };
  }
}
