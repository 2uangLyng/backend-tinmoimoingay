export interface CreateCategoryDto {
  name: string;
}

export interface CreateNewsDto {
  title: string;
  description?: string;
  link: string;
  thumbnail?: string;
  content: string;
  pubDate: string;
  categoryName: string;
}

export interface PaginationQuery {
  page?: string;
  pageSize?: string;
  category?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
