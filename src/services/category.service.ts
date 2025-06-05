import { Category as PrismaCategory } from '.prisma/client';
import slugify from 'slugify';
import { CreateCategoryDto } from '../types';
import { prisma } from './prisma.service';

export class CategoryService {
  static async getAll(): Promise<PrismaCategory[]> {
    return prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  static async create(data: CreateCategoryDto): Promise<PrismaCategory> {
    const slug = slugify(data.name, { lower: true });
    return prisma.category.create({
      data: {
        name: data.name,
        slug
      }
    });
  }

  static async findBySlug(slug: string): Promise<PrismaCategory | null> {
    return prisma.category.findUnique({
      where: { slug }
    });
  }
} 