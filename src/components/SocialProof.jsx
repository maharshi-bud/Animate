import { useEffect, useRef } from "react";
import "./SocialProof.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  { text: "Stories that linger long after the last page.", author: "Ava Bennett" },
  { text: "A quiet place to discover voices that matter.", author: "Liam Carter" },
  { text: "Not just books — experiences.", author: "Sophia Rao" },
  { text: "Where stories find their readers.", author: "Noah Mehta" },
  { text: "Reading feels personal again.", author: "Ananya Shah" },
  { text: "A new way to explore authors.", author: "Rohan Iyer" },
  { text: "Every page feels intentional.", author: "Maya Kapoor" },
  { text: "Less noise, more meaning.", author: "Arjun Verma" },
  { text: "A bookstore, reimagined.", author: "Zara Khan" },
  { text: "Stories worth slowing down for.", author: "Ishaan Patel" },
];

export default function SocialProof() {
  const containerRef = useRef(null);
  const progress = useRef(0);
  const startX = useRef(0);
  const active = useRef(0);
  const isDown = useRef(false);
  const isActive = useRef(false);

  const speedWheel = 0.1;
  const speedDrag = -0.1;

  const getZindex = (array, index) =>
    array.map((_, i) =>
      index === i ? array.length : array.length - Math.abs(index - i)
    );

  const animate = () => {
    if (!containerRef.current) return;

    const items = containerRef.current.children;

    progress.current = Math.max(0, Math.min(progress.current, 100));
    active.current = Math.floor(
      (progress.current / 100) * (items.length - 1)
    );

    [...items].forEach((item, index) => {
      const zIndex = getZindex([...items], active.current)[index];

      item.style.setProperty("--zIndex", zIndex);
      item.style.setProperty(
        "--active",
        (index - active.current) / items.length
      );
    });
  };

  useEffect(() => {
  animate();

  // 🔥 Track section visibility
  ScrollTrigger.create({
    trigger: containerRef.current,
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      isActive.current = true;
      lockScroll();
    },
    // onLeave: () => {
    //   isActive.current = false;
    //   unlockScroll();
    // },
    onEnterBack: () => {
      isActive.current = true;
      lockScroll();
    },
    onLeaveBack: () => {
      isActive.current = false;
      unlockScroll();
    },
  });

  function lockScroll() {
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    document.body.style.overflow = "";
  }

  const handleWheel = (e) => {
    if (!isActive.current) return;

    e.preventDefault(); // 🚫 stop page scroll

    progress.current += e.deltaY * speedWheel;

    // 🎯 Clamp
    progress.current = Math.max(0, Math.min(progress.current, 100));

    animate();

    // 🔓 Unlock at ends
    if (progress.current <= 0 || progress.current > 100) {
      unlockScroll();
    } else {
      lockScroll();
    }
  };

  const handleMove = (e) => {
    if (!isActive.current || !isDown.current) return;

    const x = e.clientX;
    const delta = (x - startX.current) * speedDrag;

    progress.current += delta;
    progress.current = Math.round(progress.current / 10) * 20;

    startX.current = x;
    animate();
  };

  const handleDown = (e) => {
    isDown.current = true;
    startX.current = e.clientX;
  };

  const handleUp = () => {
    isDown.current = false;
  };

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("mousemove", handleMove);
  window.addEventListener("mousedown", handleDown);
  window.addEventListener("mouseup", handleUp);

  return () => {
    window.removeEventListener("wheel", handleWheel);
    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("mousedown", handleDown);
    window.removeEventListener("mouseup", handleUp);
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, []);

  return (
    <section className="carousel-section">
      <h2 className="carousel-heading">Stories readers remember</h2>

      <div className="carousel" ref={containerRef}>
        {quotes.map((q, i) => (
          <div className="carousel-item" key={i}>
            <div className="carousel-box">
              <p className="quote-text">“{q.text}”</p>
              <span className="quote-author">— {q.author}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}