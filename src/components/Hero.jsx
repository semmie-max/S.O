import { useState } from "react";


// EDIT ME — swap in your own name, title, and one-line bio.
const PROFILE = {
  name: "Sarah Olotin",
  title: "Social Media Manager & Content Strategist",
  bio: "Playing the algorithm without letting it play me.",
  initials: "SO",
  // Drop a photo at public/avatar.jpg (any image works — just keep this
  // filename, or update the path below to match). Until that file exists,
  // the initials badge below renders instead, so the page never breaks.
  avatarSrc: "/avatar.jpg",
};

function Avatar() {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    return (
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-sm font-semibold text-white"
        style={{ background: "linear-gradient(135deg, #2B4FC7 0%, #141312 100%)" }}
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
      className="h-11 w-11 shrink-0 rounded-md object-cover"
    />
  );
}

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 pt-20 pb-10 sm:px-8">
      <div className="flex items-center gap-3">
        <Avatar />
        <div>
          <h1 className="font-display text-[17px] font-semibold leading-tight text-ink">
            {PROFILE.name}
          </h1>
          <p className="font-display italic text-[15px] font-medium leading-tight text-accent">
            {PROFILE.title}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[14px] leading-relaxed text-muted">
        Playing the <span className="font-semibold text-ink underline">algorithm</span> without letting it play me.
      </p>
    </section>
  );
}