import { useState } from "react";
import { Hand } from "lucide-react";
import { TextCharSlide } from "./ui/text-char-slide";

// EDIT ME: swap in your own details, bio, and links.
const PROFILE = {
  name: "Sarah Olotin",
  title: "Social Media Manager & Content Strategist",
  initials: "SO",
  avatarSrc: `${import.meta.env.BASE_URL}avatar.jpg`,
  location: "in your city", // EDIT ME

  // EDIT ME: swap in your real numbers.
  stats: [
    { value: "2", label: "Brands" },
    { value: "2024", label: "Working since" },
    { value: "1", label: "Product" },
  ],
};

const SOCIALS = [
  { label: "Gmail", href: "mailto:saraholotin@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saraholotin" },
];

function Avatar() {
  const [imageFailed, setImageFailed] = useState(false);
  const base = "h-20 w-20 shrink-0 rounded-md sm:h-24 sm:w-24";

  if (imageFailed) {
    return (
      <div
        className={`${base} flex items-center justify-center text-xl font-semibold text-white`}
        style={{ background: "linear-gradient(135deg, #4A453F 0%, #141312 100%)" }}
        aria-label={PROFILE.name}
      >
        {PROFILE.initials}
      </div>
    );
  }

  return (
    <img
      src={PROFILE.avatarSrc}
      alt={PROFILE.name}
      onError={() => setImageFailed(true)}
      className={`${base} object-cover`}
    />
  );
}

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pt-20 pb-10 sm:px-8 sm:pt-28">
      <div className="flex items-start gap-5 sm:gap-6">
        <Avatar />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <TextCharSlide
                as="h1"
                text={PROFILE.name}
                by="character"
                animation="slideLeft"
                duration={0.6}
                className="font-display text-[24px] font-bold leading-tight text-ink sm:text-[28px]"
              />
              <p className="mt-1 text-[14px] leading-tight text-muted">
                {PROFILE.title} · {PROFILE.location}
              </p>
            </div>

            <a
              href={SOCIALS[0].href}
              className="hidden shrink-0 rounded-lg border border-ink/15 px-5 py-2 text-[14px] font-medium text-ink transition-colors hover:bg-ink/5 sm:inline-block"
            >
              Say hello
            </a>
          </div>

          <div className="mt-5 flex items-center gap-6">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="relative text-[11px] font-medium uppercase tracking-[0.2em] text-muted transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-[22px] font-medium leading-[1.3] tracking-tight text-ink sm:text-[28px]">
        Navigating the algorithm without losing the plot.{" "}
        <Hand
          aria-hidden="true"
          className="wave-hand inline-block h-[0.8em] w-[0.8em] align-baseline"
          strokeWidth={2}
        />{" "}
        I turn scattered ideas into{" "}
        <mark className="box-decoration-clone rounded-md bg-ink/10 px-1 text-ink">
          content systems that actually convert
        </mark>
        , working with Bloom &amp; Co and Nettle Studio while building Creator Toolkit,{" "}
        <mark className="box-decoration-clone rounded-md bg-ink/10 px-1 text-ink">
          a lightweight planning system for solo creators
        </mark>
        .
      </p>

      <div className="mt-10 grid grid-cols-3 divide-x divide-ink border-y border-ink py-6 text-center">
        {PROFILE.stats.map(({ value, label }) => (
          <div key={label} className="px-2">
            <p className="font-display text-[20px] font-bold text-ink">{value}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-muted">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}