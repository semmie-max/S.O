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
    <section className="mx-auto w-full max-w-3xl px-6 pb-20 sm:px-8">
      <h2 className="relative font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Writing.
        <sup className="ml-0.5 font-display text-lg font-bold italic text-accent">2</sup>
      </h2>

      {status === "loading" && (
        <p className="mt-5 text-[16px] leading-[1.75] text-muted sm:text-[17px]">Loading…</p>
      )}

      {status === "error" && (
        <p className="mt-5 text-[16px] leading-[1.75] text-muted sm:text-[17px]">
          Couldn't load posts right now.
        </p>
      )}

      {status === "ready" && posts.length === 0 && (
        <p className="mt-5 text-[16px] leading-[1.75] text-muted sm:text-[17px]">
          Currently between drafts.
        </p>
      )}

      {status === "ready" && posts.length > 0 && (
        <ul className="mt-5 space-y-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/blog/${post.slug}`}
                className="text-[16px] leading-[1.75] text-muted transition-colors hover:text-ink sm:text-[17px]"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/blog"
        className="relative mt-6 inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-muted transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100"
      >
        See more
      </Link>
    </section>
  );
}