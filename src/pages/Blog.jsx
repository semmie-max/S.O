import { useEffect, useState } from "react";
import { getPublishedPosts } from "../lib/api.js";
import BlogHoverList from "../components/BlogHoverList.jsx";
import Footer from "../components/Footer.jsx";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-8 text-sm text-muted">Loading...</div>;
  }

  return (
    <>
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <h1 className="font-display text-3xl italic text-accent">Blog.</h1>

        <div className="mt-8">
          {posts.length === 0 ? (
            <p className="text-sm text-muted">No posts yet.</p>
          ) : (
            <BlogHoverList posts={posts} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}