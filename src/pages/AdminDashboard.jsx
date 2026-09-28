import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllPostsAdmin, deletePost, clearToken } from "../lib/api.js";
import DeleteButton from "../components/DeleteButton.jsx";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const data = await getAllPostsAdmin();
    setPosts(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  function handleLogout() {
    clearToken();
    navigate("/sb-portal-x7k2");
  }

  if (loading) {
    return <div className="p-8 text-sm text-muted">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl italic text-accent">Posts</h1>
        <div className="flex gap-3">
          <Link
            to="/sb-portal-x7k2/new"
            className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper"
          >
            New post
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-md border border-line px-4 py-2 text-sm text-ink"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="mt-8 divide-y divide-line">
        {posts.length === 0 && (
          <p className="py-6 text-sm text-muted">No posts yet.</p>
        )}

        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-semibold text-ink">{post.title}</p>
              <p className="text-xs text-muted">
                {post.status} · {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={`/sb-portal-x7k2/edit/${post.id}`}
                className="text-sm text-ink underline"
              >
                Edit
              </Link>
              <DeleteButton onDelete={() => handleDelete(post.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}