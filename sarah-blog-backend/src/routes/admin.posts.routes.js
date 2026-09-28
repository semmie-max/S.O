import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../middleware/auth.js";
import {
  getAllPostsAdmin,
  getPostByIdAdmin,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(requireAuth);

router.get("/", getAllPostsAdmin);
router.get("/:id", getPostByIdAdmin);
router.post("/", upload.single("coverImage"), createPost);
router.put("/:id", upload.single("coverImage"), updatePost);
router.delete("/:id", deletePost);

export default router;