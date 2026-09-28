import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="fixed top-0 right-0 z-10 p-6 sm:p-8">
      <Link
        to="/blog"
        className="font-signature text-2xl italic text-ink transition-colors hover:text-accent"
      >
        Blog
      </Link>
    </nav>
  );
}