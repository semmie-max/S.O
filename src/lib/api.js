const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getToken() {
  return localStorage.getItem("admin_token");
}

export function setToken(token) {
  localStorage.setItem("admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("admin_token");
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export async function login(password) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Login failed");
  }

  const data = await res.json();
  setToken(data.token);
  return data;
}

export async function getPublishedPosts() {
  const res = await fetch(`${API_BASE_URL}/api/posts`);
  if (!res.ok) throw new Error("Failed to load posts");
  return res.json();
}

export async function getPublishedPostBySlug(slug) {
  const res = await fetch(`${API_BASE_URL}/api/posts/${slug}`);
  if (!res.ok) throw new Error("Failed to load post");
  return res.json();
}

export async function getAllPostsAdmin() {
  const res = await fetch(`${API_BASE_URL}/api/admin/posts`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to load posts");
  return res.json();
}

export async function getPostByIdAdmin(id) {
  const res = await fetch(`${API_BASE_URL}/api/admin/posts/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to load post");
  return res.json();
}

export async function createPost(formData) {
  const res = await fetch(`${API_BASE_URL}/api/admin/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to create post");
  }
  return res.json();
}

export async function updatePost(id, formData) {
  const res = await fetch(`${API_BASE_URL}/api/admin/posts/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to update post");
  }
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API_BASE_URL}/api/admin/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to delete post");
}