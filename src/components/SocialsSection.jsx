// EDIT ME — point each of these at your real profiles.
const SOCIALS = {
  twitterHref: "https://x.com/your-handle",
  githubHref: "https://github.com/your-handle",
  spotifyHref: "https://open.spotify.com/user/your-handle",
  linkedinHref: "https://www.linkedin.com/in/saraholotin?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  twitchHref: "https://twitch.tv/your-handle",
};

export default function SocialsSection() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 pb-16 sm:px-8">
      <h2 className="relative font-display text-2xl italic text-accent">
        Socials<span className="text-ink">.</span>
        <sup className="ml-0.5 font-display text-lg italic text-accent">3</sup>
      </h2>

      <p className="mt-4 text-[14px] leading-relaxed text-muted">
        Have something in mind? I’m always open to good ideas, interesting projects, and conversations that could become something more. Reach me via{" "}
        
         <a href={"mailto:saraholotin@gmail.com"}
          target="_blank"
          rel="noreferrer"
          className="font-semibold italic text-ink underline hover:text-accent"
        >
          Gmail 
        </a>
        , find me on{" "}
        
        <a  href={SOCIALS.linkedinHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold italic text-ink underline hover:text-accent"
        >
          Linkedin
        </a>
        , or{" "}
        
         <a href={SOCIALS.spotifyHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold italic text-ink underline hover:text-accent"
        >
          Schedule a meeting
        </a>
        .if you’d rather put a time on the calendar.
      </p>
    </section>
  );
}