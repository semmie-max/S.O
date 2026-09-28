import { Router } from "express";
import { getPublishedPosts, getPublishedPostBySlug } from "../controllers/posts.controller.js";

const router = Router();

router.get("/", getPublishedPosts);
router.get("/:slug", getPublishedPostBySlug);

export default router;