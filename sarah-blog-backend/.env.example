import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import adminPostsRoutes from "./routes/admin.posts.routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/admin/posts", adminPostsRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});