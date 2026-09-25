// EDIT ME — swap in your real posts and the actual link at the bottom.
const POSTS = [
  {
    title: "From Local to Production: Deploy the Latest Nuxt Stack with Docker",
    href: "https://example.com/blog/nuxt-docker",
  },
  {
    title: "How To Securely Share Environment Variables With Your Team",
    href: "https://example.com/blog/env-variables",
  },
  {
    title: "How Raycast Became My Ultimate Sidekick",
    href: "https://example.com/blog/raycast-sidekick",
  },
  {
    title: "5 Amazing Raycast Snippets for Enhancing Your Nuxt (Vue) Projects",
    href: "https://example.com/blog/raycast-snippets",
  },
];

// Point this at your blog/writing index page.
const SEE_MORE_HREF = "https://example.com/writing";

export default function WritingSection() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 pb-16 sm:px-8">
      <h2 className="relative font-display text-2xl italic text-accent">
        Writing<span className="text-ink">.</span>
        <sup className="ml-0.5 font-display text-lg italic text-accent">2</sup>
      </h2>

      <ul className="mt-4 space-y-3">
        {POSTS.map(({ title, href }) => (
          <li key={title}>
            
           <a   href={href}
              target="_blank"
              rel="noreferrer"
              className="text-[14px] italic leading-relaxed text-muted transition-colors hover:text-ink"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>

      
       <a href={SEE_MORE_HREF}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-block font-display text-[13px] italic text-muted underline underline-offset-2 hover:text-accent"
      >
        See more
      </a>
    </section>
  );
}