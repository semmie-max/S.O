import { Mail, Linkedin, Instagram } from "lucide-react";

// EDIT ME — point each of these at your real profile/handle.
const SOCIALS = [
  { label: "Email", href: "mailto:saraholotin@gmail.com", Icon: Mail },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-handle", Icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com/your-handle", Icon: Instagram },
];

export default function ContactSection() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 pb-4 sm:px-8">
      <h2 className="font-display text-2xl italic text-accent">Contact.</h2>
      <div className="mt-4 flex items-center gap-4">
        {SOCIALS.map(({ label, href, Icon }) => (
          
          <a  key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="text-ink transition-colors hover:text-accent"
          >
            <Icon className="h-5 w-5" strokeWidth={2.25} />
          </a>
        ))}
      </div>
    </section>
  );
}