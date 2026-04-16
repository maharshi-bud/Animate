import { useEffect, useRef } from "react";
import "./SocialProof.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import book1 from "./images/book1.png";
import book2 from "./images/book2.png";
import book3 from "./images/book3.png";
import book4 from "./images/book4.png";
import book5 from "./images/book5.png";
import book6 from "./images/book6.png";
import book7 from "./images/book7.png";
gsap.registerPlugin(ScrollTrigger);

const quotes = [
  { text: "Stories that linger long after the last page.", author: "Ava Bennett", img: book1 },
  { text: "A quiet place to discover voices that matter.", author: "Liam Carter", img:book2 },
  { text: "Not just books — experiences.", author: "Sophia Rao", img: book3 },
  { text: "Where stories find their readers.", author: "Noah Mehta", img: book4 },
  { text: "Reading feels personal again.", author: "Ananya Shah", img: book5 },
  { text: "Some stories don’t just end — they stay with you.", author: "Arjun Verma", img: book6 },
  { text: "A place where every page feels like it was chosen for you.", author: "Zara Khan", img: book7},
];

export default function SocialProof() {
  const containerRef = useRef(null);
  const progress = useRef(0);
  const startX = useRef(0);
  const active = useRef(0);
  const isDown = useRef(false);
  const isDragging = useRef(false);
  const isActive = useRef(false);

  const speedWheel = 0.1;

  /* 🔥 CLICK FUNCTION (MOVED OUTSIDE useEffect) */
  const goToIndex = (index, total) => {
    const target = (index / (total - 1)) * 100;

    gsap.to(progress, {
      current: target,
      duration: 0.3,
      ease: "power3.out",
      onUpdate: animate,
    });
  };

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

    document.body.style.cursor = "grab";

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "top center",
      onEnter: () => {
        isActive.current = true;
        document.body.style.overflow = "hidden";
      },
      onLeaveBack: () => {
        isActive.current = false;
        document.body.style.overflow = "";
      },
    });

    const handleWheel = (e) => {
      if (!isActive.current) return;
      e.preventDefault();

      progress.current += e.deltaY * speedWheel;
      progress.current = Math.max(0, Math.min(progress.current, 100));

      animate();
    };

    const handleDown = (e) => {
      isDown.current = true;
      isDragging.current = false;
      startX.current = e.clientX;
      document.body.style.cursor = "grabbing";
    };

    const handleMove = (e) => {
      if (!isActive.current || !isDown.current) return;

      const x = e.clientX;
      const delta = x - startX.current;

      if (Math.abs(delta) > 3) isDragging.current = true;

      progress.current += delta * 0.15;
      progress.current = Math.max(0, Math.min(progress.current, 100));

      startX.current = x;
      animate();
    };

    const handleUp = () => {
      isDown.current = false;
      document.body.style.cursor = "grab";
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
          <div
            className="carousel-item"
            key={i}
            onClick={() => {
              if (!isDragging.current) {
                goToIndex(i, quotes.length);
              }
            }}
          >
            <div className="container">
              <div className="box">
                <img src={q.img} alt="" className="card-img" />

                <div>
                  <strong>{q.text}</strong>
                  <p>{q.author}</p>
                  <span>Story</span> <span>Preview</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}