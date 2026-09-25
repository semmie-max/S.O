// EDIT ME — point each of these at your real profiles.
const SOCIALS = {
  twitterHref: "https://x.com/your-handle",
  githubHref: "https://github.com/your-handle",
  spotifyHref: "https://open.spotify.com/user/your-handle",
  linkedinHref: "https://linkedin.com/in/your-handle",
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
        The best way to follow my work and thoughts is through{" "}
        
         <a href={SOCIALS.twitterHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold italic text-ink underline hover:text-accent"
        >
          X/Twitter
        </a>
        , where I actively share my development journey, from technical insights to project updates, or explore them on{" "}
        
        <a  href={SOCIALS.githubHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold italic text-ink underline hover:text-accent"
        >
          GitHub
        </a>
        , where you'll find messy late-night commits, half-finished experiments, and a few things I'm actually proud of. And because life without music would be unimaginable, you can also check out my playlists on{" "}
        
         <a href={SOCIALS.spotifyHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold italic text-ink underline hover:text-accent"
        >
          Spotify
        </a>
        . I'm also on a platform that I don't like so much,{" "}
        
         <a href={SOCIALS.linkedinHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold italic text-ink underline hover:text-accent"
        >
          LinkedIn
        </a>
        . Oh! And I recently started streaming on{" "}
        
         <a href={SOCIALS.twitchHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold italic text-ink underline hover:text-accent"
        >
          Twitch
        </a>
        !
      </p>
    </section>
  );
}