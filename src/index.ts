import express from "express";
import categoryRoutes from "./routes/category.routes";
import newsRoutes from "./routes/news.routes";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(
  cors({
    origin: "*", // Allow all origins for simplicity; adjust as needed
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/categories", categoryRoutes);
app.use("/news", newsRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
