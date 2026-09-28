import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./BlogHoverList.css";

export default function BlogHoverList({ posts }) {
  const containerRef = useRef(null);
  const thumbnailRef = useRef(null);
  const xToRef = useRef(null);
  const yToRef = useRef(null);

  useEffect(() => {
    const projectThumbnail = thumbnailRef.current;
    const projectsContainer = containerRef.current?.querySelector(".hover-img-projects");

    if (!projectThumbnail || !projectsContainer) return;

    const projectElements = gsap.utils.toArray(".hover-img-project", projectsContainer);
    const thumbnails = gsap.utils.toArray(".hover-img-thumbnail", projectThumbnail);

    gsap.set(projectThumbnail, { scale: 0, xPercent: -50, yPercent: -50 });

    xToRef.current = gsap.quickTo(projectThumbnail, "x", { duration: 0.4, ease: "power3.out" });
    yToRef.current = gsap.quickTo(projectThumbnail, "y", { duration: 0.4, ease: "power3.out" });

    function handleMouseMove(e) {
      xToRef.current?.(e.clientX);
      yToRef.current?.(e.clientY);
    }

    function handleMouseLeave() {
      gsap.to(projectThumbnail, { scale: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    }

    projectsContainer.addEventListener("mousemove", handleMouseMove);
    projectsContainer.addEventListener("mouseleave", handleMouseLeave);

    const cleanups = [];

    projectElements.forEach((project, index) => {
      function handleMouseEnter() {
        gsap.to(projectThumbnail, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        gsap.to(thumbnails, { yPercent: -100 * index, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      }
      project.addEventListener("mouseenter", handleMouseEnter);
      cleanups.push(() => project.removeEventListener("mouseenter", handleMouseEnter));
    });

    return () => {
      projectsContainer.removeEventListener("mousemove", handleMouseMove);
      projectsContainer.removeEventListener("mouseleave", handleMouseLeave);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [posts]);

  return (
    <div className="hover-img-container" ref={containerRef}>
      <div className="hover-img-projects">
        {posts.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="hover-img-project">
            <h2>{post.title}</h2>
            <p>
              {post.subtitle || new Date(post.published_at).toLocaleDateString()}
              {Boolean(post.is_paywalled) && " · Members only"}
            </p>
          </Link>
        ))}
      </div>

      <div className="hover-img-thumbnail-wrapper" ref={thumbnailRef}>
        {posts.map((post) => (
          <div className="hover-img-thumbnail" key={post.id}>
            {post.cover_image_url ? (
              <img src={post.cover_image_url} alt={post.title} />
            ) : (
              <div className="hover-img-thumbnail-empty" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}