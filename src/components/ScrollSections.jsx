import { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./ScrollSections.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSections() {
  useEffect(() => {
    // 🔥 LENIS
    const lenis = new Lenis({ duration: 1.2 });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    // 🔥 PIN LEFT
    ScrollTrigger.create({
      trigger: "#vertical",
      start: "top top",
      end: "bottom bottom",
      pin: ".col_left",
      pinSpacing: true,
    });

    // 🟣 HORIZONTAL SCROLL
    const track = document.querySelector(".horizontal__content");

    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: "#horizontal",
        start: "top top",
        end: () => "+=" + track.scrollWidth,
        scrub: 1,
        pin: true,
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

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
    "The Silent Forest",
    "Echoes of Time",
    "Midnight Letters",
    "The Hidden Path",
    "Winds of Memory",
    "Shadows Within",
    "The Last Chapter",
  ];

  return (
    <>
      {/* 🔵 VERTICAL */}
      <section id="vertical">
        <div className="container">
          <div className="vertical__content">

            {/* LEFT */}
            <div className="col_left">
              <div className="card">
                <div className="background"></div>
                <div className="logo">Authors</div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col_right">
              {authors.map((name, i) => (
                <motion.div
                  key={i}
                  className="vertical__item"
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <h3>{name}</h3>
                  <p>
                    Stories that create emotional depth and lasting impact.
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 🟣 HORIZONTAL */}
      <section id="horizontal">
        <div className="horizontal__content">
          {books.map((b, i) => (
            <motion.div
              key={i}
              className="horizontal__item"
              whileHover={{ scale: 1.05, rotateY: 10 }}
            >
              <div className="book-cover"></div>
              <h4>{b}</h4>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}