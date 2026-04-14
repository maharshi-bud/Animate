import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./App.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import FlipBook from "./components/FlipBook";


gsap.registerPlugin(ScrollTrigger);

function App() {
  const bgRef = useRef([]);
  const totalCards = 20;

  const colors = ["#ffffff", "#f3eadb", "#e8dcc5", "#d9cbb3"];

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    bgRef.current.forEach((el, i) => {
      if (!el) return;

      // 🌊 Floating animation
      gsap.to(el, {
        y: "+=100",
        x: i % 2 === 0 ? "+=40" : "-=40",
        rotation: i % 2 === 0 ? 10 : -10,
        duration: 6 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 🌊 Scroll movement (subtle depth effect)
      gsap.to(el, {
        y: i % 2 === 0 ? "+=200" : "-=200",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <main className="app">
      {/* 🌊 Background */}
      <div className="bg-animation">
        {[...Array(totalCards)].map((_, i) => (
          <div
            key={i}
            className="bg-book"
            ref={(el) => (bgRef.current[i] = el)}
            style={{
              top: `${Math.random() * 100}%`,
              left:
                i % 2 === 0
                  ? `${Math.random() * 40}%`
                  : `${60 + Math.random() * 20}%`,
              background: colors[i % colors.length],
            }}
          />
        ))}
      </div>

      <Header />
      <Hero />
      <SocialProof />

      <FlipBook/>
      
    </main>
  );
}

export default App;