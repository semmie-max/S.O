import { Mail, Linkedin } from "lucide-react";

// EDIT ME — point each of these at your real profile/handle.
const SOCIALS = [
  { label: "Email", href: "mailto:saraholotin@gmail.com", Icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saraholotin?utm_source=share_via&utm_content=profile&utm_medium=member_android", Icon: Linkedin },
];

export default function ContactSection() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 pb-4 sm:px-8">
      <h2 className="font-display text-2xl italic text-accent">Contact.</h2>
      <div className="mt-4 flex items-center gap-5">
        {SOCIALS.map(({ label, href, Icon }) => (
          
          <a  key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="text-ink transition-colors hover:text-accent"
          >
            <Icon className="h-6 w-6" strokeWidth={2} />
          </a>
        ))}
      </div>
    </section>
  );
}