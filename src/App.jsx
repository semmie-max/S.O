import Hero from "./components/Hero.jsx";
import ContactSection from "./components/ContactSection.jsx";
import WorksSection from "./components/WorksSection.jsx";
import WritingSection from "./components/WritingSection.jsx";
import SocialsSection from "./components/SocialsSection.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <main className="min-h-screen bg-paper">
      <Hero />
      <ContactSection />
      <WorksSection />
      <WritingSection />
      <SocialsSection />
      {/* Add your next section here — work, experience, projects, etc. */}
      <Footer />
    </main>
  );
}