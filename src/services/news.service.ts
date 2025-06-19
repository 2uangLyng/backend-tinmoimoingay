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

  static async update(
    id: number,
    data: Partial<CreateNewsDto>
  ): Promise<News | null> {
    const existingNews = await this.findById(id);
    if (!existingNews) {
      throw new Error(`News with ID ${id} not found`);
    }

    const updatedData: Prisma.NewsUpdateInput = {
      ...data,
      slug: data.title
        ? slugify(data.title, { lower: true })
        : existingNews.slug,
      pubDate: data.pubDate ? new Date(data.pubDate) : existingNews.pubDate,
    };

    // Tìm category từ tên nếu có
    if (data.categoryName) {
      const category = await prisma.category.findUnique({
        where: { name: data.categoryName },
      });
      if (category) {
        updatedData.category = { connect: { id: category.id } };
      } else {
        throw new Error(`Category '${data.categoryName}' not found`);
      }
    }

    return prisma.news.update({
      where: { id },
      data: updatedData,
    });
  }

  static async delete(id: number): Promise<News | null> {
    const existingNews = await this.findById(id);
    if (!existingNews) {
      throw new Error(`News with ID ${id} not found`);
    }

    return prisma.news.delete({
      where: { id },
    });
  }

  static async findBySlug(slug: string): Promise<News | null> {
    return prisma.news.findUnique({
      where: { slug },
      include: { category: true },
    });
  }

  static async search(query: string): Promise<{ news: any[]; total: number }> {
    const keywords = query
      .split(/\s+/) // tách theo dấu cách
      .filter((k) => k.length > 1) // bỏ từ quá ngắn
      .map((word) => ({
        OR: [
          { title: { contains: word, mode: Prisma.QueryMode.insensitive } },
          { content: { contains: word, mode: Prisma.QueryMode.insensitive } },
        ],
      }));

    const where: Prisma.NewsWhereInput = {
      AND: keywords as Prisma.NewsWhereInput[],
    };

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        include: { category: true },
        orderBy: { pubDate: "desc" },
      }),
      prisma.news.count({ where }),
    ]);

    return { news, total };
  }
}     
