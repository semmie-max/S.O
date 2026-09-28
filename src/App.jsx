import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import ContactSection from "./components/ContactSection.jsx";
import WorksSection from "./components/WorksSection.jsx";
import WritingSection from "./components/WritingSection.jsx";
import SocialsSection from "./components/SocialsSection.jsx";
import Footer from "./components/Footer.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminEditor from "./pages/AdminEditor.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ContactSection />
      <WorksSection />
      <WritingSection />
      <SocialsSection />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <main className="min-h-screen bg-paper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/sb-portal-x7k2" element={<AdminLogin />} />
          <Route
            path="/sb-portal-x7k2/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sb-portal-x7k2/new"
            element={
              <ProtectedRoute>
                <AdminEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sb-portal-x7k2/edit/:id"
            element={
              <ProtectedRoute>
                <AdminEditor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}