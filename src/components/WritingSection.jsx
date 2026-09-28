import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishedPosts } from "../lib/api.js";

const MAX_POSTS = 4;

export default function WritingSection() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    getPublishedPosts()
      .then((data) => {
        if (!cancelled) {
          setPosts(data.slice(0, MAX_POSTS));
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mx-auto w-full max-w-2xl px-6 pb-16 sm:px-8">
      <h2 className="relative font-display text-2xl italic text-accent">
        Writing<span className="text-ink">.</span>
        <sup className="ml-0.5 font-display text-lg italic text-accent">2</sup>
      </h2>

      {status === "loading" && (
        <p className="mt-4 text-[14px] italic text-muted">Loading…</p>
      )}

      {status === "error" && (
        <p className="mt-4 text-[14px] italic text-muted">
          Couldn't load posts right now.
        </p>
      )}

      {status === "ready" && posts.length === 0 && (
        <p className="mt-4 text-[14px] italic text-muted">
          Currently between drafts.
        </p>
      )}

      {status === "ready" && posts.length > 0 && (
        <ul className="mt-4 space-y-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/blog/${post.slug}`}
                className="text-[14px] italic leading-relaxed text-muted transition-colors hover:text-ink"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/blog"
        className="mt-5 inline-block font-display text-[13px] italic text-muted underline underline-offset-2 hover:text-accent"
      >
        See more
      </Link>
    </section>
  );
}