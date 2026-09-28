import { randomUUID } from "crypto";
import streamifier from "streamifier";
import pool from "../config/db.js";
import cloudinary from "../config/cloudinary.js";

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function uploadImageToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "blog_posts" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

export async function getPublishedPosts(req, res) {
  const [rows] = await pool.query(
    `SELECT id, title, subtitle, slug, cover_image_url, is_paywalled, published_at
     FROM posts
     WHERE status = 'published'
     ORDER BY published_at DESC`
  );
  res.json(rows);
}

export async function getPublishedPostBySlug(req, res) {
  const { slug } = req.params;

  const [rows] = await pool.query(
    `SELECT id, title, subtitle, slug, cover_image_url, content, is_paywalled, published_at
     FROM posts
     WHERE slug = ? AND status = 'published'
     LIMIT 1`,
    [slug]
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: "Post not found" });
  }

  const post = rows[0];

  if (post.is_paywalled) {
    const preview = post.content.slice(0, 400);
    return res.json({ ...post, content: preview, locked: true });
  }

  res.json({ ...post, locked: false });
}

export async function getAllPostsAdmin(req, res) {
  const [rows] = await pool.query(
    `SELECT id, title, subtitle, slug, cover_image_url, is_paywalled, status, created_at, updated_at, published_at
     FROM posts
     ORDER BY created_at DESC`
  );
  res.json(rows);
}

export async function getPostByIdAdmin(req, res) {
  const { id } = req.params;

  const [rows] = await pool.query(`SELECT * FROM posts WHERE id = ? LIMIT 1`, [id]);

  if (rows.length === 0) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(rows[0]);
}

export async function createPost(req, res) {
  try {
    const { title, subtitle, content, isPaywalled, status } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const id = randomUUID();
    const slug = `${slugify(title)}-${id.slice(0, 8)}`;
    const finalStatus = status === "published" ? "published" : "draft";
    const paywalled = isPaywalled === "true" || isPaywalled === true;

    let coverImageUrl = null;

    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(req.file.buffer);
      coverImageUrl = uploadResult.secure_url;
    }

    const publishedAt = finalStatus === "published" ? new Date() : null;

    await pool.query(
      `INSERT INTO posts (id, title, subtitle, slug, cover_image_url, content, is_paywalled, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, subtitle || null, slug, coverImageUrl, content, paywalled, finalStatus, publishedAt]
    );

    res.status(201).json({ id, slug });
  } catch (err) {
    console.error("createPost error:", err);
    res.status(500).json({ error: err.message || "Failed to create post" });
  }
}export async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { title, subtitle, content, isPaywalled, status } = req.body;

    const [existingRows] = await pool.query(`SELECT * FROM posts WHERE id = ? LIMIT 1`, [id]);

    if (existingRows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    const existing = existingRows[0];
    const finalStatus = status === "published" ? "published" : "draft";
    const paywalled = isPaywalled === "true" || isPaywalled === true;

    let coverImageUrl = existing.cover_image_url;

    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(req.file.buffer);
      coverImageUrl = uploadResult.secure_url;
    }

    const publishedAt =
      finalStatus === "published" ? existing.published_at || new Date() : existing.published_at;

    await pool.query(
      `UPDATE posts
       SET title = ?, subtitle = ?, cover_image_url = ?, content = ?, is_paywalled = ?, status = ?, published_at = ?
       WHERE id = ?`,
      [
        title || existing.title,
        subtitle ?? existing.subtitle,
        coverImageUrl,
        content || existing.content,
        paywalled,
        finalStatus,
        publishedAt,
        id,
      ]
    );

    res.json({ id });
  } catch (err) {
    console.error("updatePost error:", err);
    res.status(500).json({ error: err.message || "Failed to update post" });
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  await pool.query(`DELETE FROM posts WHERE id = ?`, [id]);
  res.status(204).send();
}