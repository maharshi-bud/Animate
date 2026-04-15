import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./ScrollSections.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSections() {
  const itemRefs = useRef([]);

  const authors = [
    "Ava Bennett",
    "Liam Carter",
    "Sophia Rao",
    "Noah Mehta",
    "Ananya Shah",
    "Rohan Iyer",
    "Maya Kapoor",
  ];

  const books = [
    { title: "The Silent Forest", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f" },
    { title: "Echoes of Time", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794" },
    { title: "Midnight Letters", cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" },
    { title: "The Hidden Path", cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d" },
    { title: "Winds of Memory", cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe" },
    { title: "Shadows Within", cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba" },
    { title: "The Last Chapter", cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66" }
  ];

  useEffect(() => {
    // 🔥 LENIS (ONLY ONCE)
    const lenis = new Lenis({ duration: 1.2 });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 🔵 PIN LEFT
    ScrollTrigger.create({
      trigger: "#vertical",
      start: "top top",
      end: "bottom bottom",
      pin: ".col_left",
    });

    // 🔵 VERTICAL FOCUS
    const vItems = itemRefs.current;

    ScrollTrigger.create({
      trigger: "#vertical",
      start: "top top",
      end: "bottom bottom",
      scrub: true,

      onUpdate: () => {
        const center = window.innerHeight / 2;

        vItems.forEach((el) => {
          if (!el) return;

          const rect = el.getBoundingClientRect();
          const itemCenter = rect.top + rect.height / 2;
          const distance = Math.abs(center - itemCenter);

          const progress = Math.min(distance / (window.innerHeight / 2), 1);

          const scale = 1.15 - progress * 0.25;
          const opacity = 1 - progress * 0.6;

          gsap.set(el, { scale, opacity });
        });
      },
    });

    // 🟣 AUTO PLAY CAROUSEL (FIXED)
    const hItems = document.querySelectorAll(".horizontal__item");

    let current = 0;

    function updateCarousel() {
      const total = hItems.length;

      hItems.forEach((el, i) => {
        const offset = i - current;

        const x = offset * 260;

        const scale = 1 - Math.min(Math.abs(offset) * 0.2, 0.4);
        const opacity = 1 - Math.min(Math.abs(offset) * 0.5, 0.7);

        gsap.to(el, {
          x,
          scale,
          opacity,
          duration: 0.6,
          ease: "power3.out",
          zIndex: total - Math.abs(offset),
        });
      });
    }

    // INIT
    updateCarousel();

    // 🔥 AUTO LOOP
    const interval = setInterval(() => {
      current = (current + 1) % hItems.length;
      updateCarousel();
    }, 2500);

    // 🔥 CLICK SUPPORT
    hItems.forEach((el, i) => {
      el.addEventListener("click", () => {
        current = i;
        updateCarousel();
      });
    });

    return () => {
      clearInterval(interval);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* 🔵 VERTICAL */}
      <section id="vertical">
        <div className="container">
          <div className="vertical__content">

            <div className="col_left">
              <div className="card">
                <div className="background"></div>
                <div className="logo">Authors</div>
              </div>
            </div>

            <div className="col_right">
              {authors.map((name, i) => (
                <motion.div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  className="vertical__item"
                >
                  <h3>{name}</h3>
                  <p>Stories that create emotional depth and lasting impact.</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 🟣 CAROUSEL */}
      <section id="horizontal">
        <div className="horizontal__content">
          {books.map((b, i) => (
            <div key={i} className="horizontal__item">
              <div className="book-cover">
                <img src={b.cover} alt={b.title} />
              </div>
              <h4>{b.title}</h4>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}