import { Sparkles } from "lucide-react";

// EDIT ME — swap in your real projects, tools, and the actual link at the bottom.
const WORKS = {
  itemOne: "Bloom & Co",
  itemOneHref: "https://example.com/bloom-and-co",
  itemTwo: "Nettle Studio",
  itemTwoHref: "https://example.com/nettle-studio",
  buildingName: "Creator Toolkit",
  buildingHref: "https://example.com/creator-toolkit",
  buildingDescription: "a lightweight content planning system for solo creators",
  closingText:
    "Deeply engaged in short form storytelling, creating campaigns built to actually convert.",
  linkLabel: "/works",
  // Point this at your real portfolio, case study, or projects page.
  linkHref: "https://example.com/works",
};

export default function WorksSection() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-20 sm:px-8">
      <h2 className="relative font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Works.
        <sup className="ml-0.5 font-display text-lg font-bold italic text-accent">1</sup>
      </h2>

      <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.75] text-muted sm:text-[17px]">
        Working on{" "}
        
         <a href={WORKS.itemOneHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-ink underline decoration-ink/40 decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
        >
          {WORKS.itemOne}
        </a>{" "}
        and{" "}
        
         <a href={WORKS.itemTwoHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-ink underline decoration-ink/40 decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
        >
          {WORKS.itemTwo}
        </a>
        , while building{" "}
        <Sparkles className="mb-[2px] inline h-[16px] w-[16px] text-accent" strokeWidth={1.75} />{" "}
        
        <a  href={WORKS.buildingHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-ink underline decoration-ink/40 decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
        >
          {WORKS.buildingName}
        </a>
        , {WORKS.buildingDescription}. {WORKS.closingText} Explore my {" "}
        
        <a  href={WORKS.linkHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-ink underline decoration-ink/40 decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
        >
          Works
        </a>
      </p>
    </section>
  );
}