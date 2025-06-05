import { News, Prisma } from '.prisma/client';
import { CreateNewsDto } from '../types';
import { prisma } from './prisma.service';

export class NewsService {
  static async create(data: CreateNewsDto): Promise<News> {
    return prisma.news.create({
      data: {
        ...data,
        pubDate: new Date(data.pubDate)
      }
    });
  }

  static async findById(id: number): Promise<News | null> {
    return prisma.news.findUnique({
      where: { id },
      include: { category: true }
    });
  }

  static async findAll(categorySlug?: string, page = 1, pageSize = 10): Promise<{ news: News[]; total: number }> {
    const where: Prisma.NewsWhereInput = {};
    
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        include: { category: true },
        orderBy: { pubDate: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize
      }),
      prisma.news.count({ where })
    ]);

    return { news, total };
  }
} 