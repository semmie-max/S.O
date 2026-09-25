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
    <section className="mx-auto w-full max-w-2xl px-6 pb-16 sm:px-8">
      <h2 className="relative font-display text-2xl italic text-accent">
        Works<span className="text-ink">.</span>
        <sup className="ml-0.5 font-display text-lg italic text-accent">1</sup>
      </h2>

      <p className="mt-4 text-[14px] leading-relaxed text-muted">
        Working on{" "}
        
         <a href={WORKS.itemOneHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold italic text-ink underline hover:text-accent"
        >
          {WORKS.itemOne}
        </a>{" "}
        and{" "}
        
         <a href={WORKS.itemTwoHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold italic text-ink underline hover:text-accent"
        >
          {WORKS.itemTwo}
        </a>
        , while building{" "}
        <Sparkles className="mb-[2px] inline h-[14px] w-[14px] text-accent" strokeWidth={1.75} />{" "}
        
        <a  href={WORKS.buildingHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold italic text-ink underline hover:text-accent"
        >
          {WORKS.buildingName}
        </a>
        , {WORKS.buildingDescription}. {WORKS.closingText} Explore my work:{" "}
        
        <a  href={WORKS.linkHref}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-ink underline hover:text-accent"
        >
          {WORKS.linkLabel}
        </a>
      </p>
    </section>
  );
}