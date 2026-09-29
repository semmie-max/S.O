import { useState } from "react";
import { TextCharSlide } from "@/components/ui/text-char-slide";


// EDIT ME — swap in your own name, title, and one-line bio.
const PROFILE = {
  name: "Sarah Olotin",
  title: "Social Media Manager & Content Strategist",
  bio: "Playing the algorithm without letting it play me.",
  initials: "SO",
  avatarSrc: `${import.meta.env.BASE_URL}avatar.jpg`,
};

function Avatar() {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    return (
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md text-sm font-semibold text-white"
        style={{ background: "linear-gradient(135deg, #4A453F 0%, #141312 100%)" }}
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
      className="h-14 w-14 shrink-0 rounded-md object-cover"
    />
  );
}

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 pt-20 pb-10 sm:px-8">
      <div className="flex items-center gap-3">
        <Avatar />
        <div>
          <TextCharSlide
            as="h1"
            text={PROFILE.name}
            by="character"
            animation="slideLeft"
            duration={0.6}
            className="font-display text-[17px] font-semibold leading-tight text-ink"
          />
          <p className="font-display italic text-[15px] font-medium leading-tight text-accent">
            {PROFILE.title}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[14px] leading-relaxed text-muted">
        Navigating the <span className="font-semibold text-ink underline">algorithm</span> without losing the plot.
      </p>
    </section>
  );
}