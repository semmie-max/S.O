import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublishedPostBySlug } from "../lib/api.js";
import Footer from "../components/Footer.jsx";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPublishedPostBySlug(slug)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="p-8 text-sm text-muted">Loading...</div>;
  }

  if (error || !post) {
    return (
      <>
        <div className="p-8 text-sm text-muted">
          Post not found. <Link to="/blog" className="underline">Back to writing</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8">
      <Link to="/blog" className="text-sm text-muted underline">
        Back to Blog
      </Link>

      <h1 className="mt-4 font-display text-3xl italic text-accent">{post.title}</h1>
      {post.subtitle && (
        <p className="mt-2 text-base italic text-muted">{post.subtitle}</p>
      )}
      <p className="mt-2 text-xs text-muted">
        {new Date(post.published_at).toLocaleDateString()}
      </p>

      {post.cover_image_url && (
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="mt-6 w-full rounded-md object-cover"
        />
      )}

      <div className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-ink">
        {post.content}
      </div>

      {post.locked && (
        <div className="mt-8 rounded-md border border-line bg-paper p-6 text-center">
          <p className="text-sm text-muted">
            This is a paid post. Subscribe to read the full content.
          </p>
        </div>
      )}
      </div>
      <Footer />
    </>
  );
}