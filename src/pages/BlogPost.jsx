import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import { getPublishedPostBySlug } from "../lib/api.js";
import Footer from "../components/Footer.jsx";

// allow <u> (underline) through the sanitizer
const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), "u"],
};

// Tailwind's reset removes default spacing, so add it back
const mdComponents = {
  p: ({ node, ...props }) => <p className="mt-4 first:mt-0" {...props} />,
  a: ({ node, ...props }) => <a className="underline" {...props} />,
  h2: ({ node, ...props }) => (
    <h2 className="mt-6 text-lg font-semibold" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="mt-4 list-disc pl-5" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="mt-4 list-decimal pl-5" {...props} />
  ),
};

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

        <div className="mt-6 text-sm leading-relaxed text-ink">
          <ReactMarkdown
            remarkPlugins={[remarkBreaks]}
            rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
            components={mdComponents}
          >
            {post.content}
          </ReactMarkdown>
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