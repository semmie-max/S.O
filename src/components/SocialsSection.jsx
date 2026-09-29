// EDIT ME — point each of these at your real profiles.
const SOCIALS = {
  twitterHref: "https://x.com/your-handle",
  githubHref: "https://github.com/your-handle",
  spotifyHref: "https://open.spotify.com/user/your-handle",
  linkedinHref: "https://www.linkedin.com/in/saraholotin",
  twitchHref: "https://twitch.tv/your-handle",
  calendarHref: "https://calendly.com/your-handle", // EDIT ME: your booking link
};

export default function SocialsSection() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-20 sm:px-8">
      <h2 className="relative font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Socials.
        <sup className="ml-0.5 font-display text-lg font-bold italic text-accent">3</sup>
      </h2>

      <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.75] text-muted sm:text-[17px]">
        Have something in mind? I’m always open to good ideas, interesting projects, and conversations that could become something more. Reach me via{" "}
        
         <a href={"mailto:saraholotin@gmail.com"}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-ink underline decoration-ink/40 decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
        >
          Gmail 
        </a>
        , find me on{" "}
        
        <a  href={SOCIALS.linkedinHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-ink underline decoration-ink/40 decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
        >
          Linkedin
        </a>
        , or{" "}
        
         <a href={SOCIALS.calendarHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-ink underline decoration-ink/40 decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
        >
          Schedule a meeting
        </a>
        {" "}if you’d rather put a time on the calendar.
      </p>
    </section>
  );
}