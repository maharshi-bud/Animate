import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FlipBook.css";

gsap.registerPlugin(ScrollTrigger);

export default function FlipBook() {
  const bookRef = useRef(null);
  const progress = useRef(0);
  const isActive = useRef(false);

  useEffect(() => {
    const book = bookRef.current;
    const pages = document.querySelectorAll(".page.right");

    // 🎯 ENTRY: appear after section comes into view
    gsap.fromTo(
      book,
      {
        top: "100%",
        left: "85%",
        scale: 0.3,
        rotate: 20,
        opacity: 0,
      },
      {
        opacity: 1,
        top: "50%",
        left: "50%",
        scale: 1,
        rotate: 0,
        transform: "translate(-50%, -50%)",
        scrollTrigger: {
          trigger: ".flipbook-section",
          start: "top 150%",
          // end: "top 40%",
          scrub: true,
        },
      }
    );

    // 📌 PIN SECTION
    ScrollTrigger.create({
      trigger: ".flipbook-section",
      start: "top top",
      end: "+=1200",
      pin: true,
      pinSpacing: true,
      onEnter: () => (isActive.current = true),
      onLeave: () => (isActive.current = false),
      onEnterBack: () => (isActive.current = true),
      onLeaveBack: () => (isActive.current = false),
    });

    // 📘 PAGE CONTROL VIA SCROLL
    const handleWheel = (e) => {
      if (!isActive.current) return;

      e.preventDefault();

      progress.current += e.deltaY * 0.002;
      progress.current = Math.max(0, Math.min(progress.current, 1));

      const activePage = Math.floor(progress.current * (pages.length + 1));

      pages.forEach((page, index) => {
  if (index < activePage) {
    page.style.transform = "rotateY(-180deg)";
  } else {
    page.style.transform = "rotateY(0deg)";
  }
});

      // 🔓 unlock scroll only at end
      if (progress.current >= 0.99) {
        document.body.style.overflow = "";
      } else {
        document.body.style.overflow = "hidden";
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
  
    <section className="flipbook-section">
  <div className="book" ref={bookRef}>

    {/* LEFT PAGE */}
    <div className="page left">
      <div className="content">
        <p>The forest had been silent for years...</p>
      </div>
    </div>

    {/* RIGHT PAGE (FLIPPING) */}
    <div className="page right cover front">
      <div className="content">
        <h2>The Silent Forest</h2>
        <p>Scroll to read</p>
      </div>
    </div>

    {/* NEXT RIGHT PAGE */}
    <div className="page right">
      <div className="content">
        <p>No birds. No wind. Just silence.</p>
      </div>
    </div>

    <div className="page right">
      <div className="content">
        <p>Until she stepped inside...</p>
      </div>
    </div>

  </div>
</section>
  
  );
}