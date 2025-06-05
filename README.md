# News API

A RESTful API built with Node.js, Express, Prisma, and PostgreSQL.

## Prerequisites

- Docker
- Docker Compose

## Setup and Running

1. Clone the repository
2. Build and start the containers:
```bash
docker-compose up --build
```

The API will be available at http://localhost:3000

## API Endpoints

### Categories
- GET /categories - Get all categories
- POST /categories - Create a new category
  ```json
  {
    "name": "Technology"
  }
  ```

### News
- GET /news - Get all news (with pagination)
  - Query parameters:
    - category (slug)
    - page (default: 1)
    - pageSize (default: 10)
- GET /news/:id - Get news by ID
- POST /news - Create a new news item
  ```json
  {
    "title": "News Title",
    "description": "News description",
    "link": "https://example.com/news",
    "thumbnail": "https://example.com/image.jpg",
    "pubDate": "2024-02-20T12:00:00Z",
    "categoryId": 1
  }
  ```

## Development

To run migrations manually:
```bash
docker-compose exec backend npm run migrate
```

To generate Prisma client:
```bash
docker-compose exec backend npm run generate
``` 