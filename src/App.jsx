import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./App.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Header from "./components/Header";
import Hero from "./components/Hero";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const bgRef = useRef([]);
   const colors = [
  "#ffffff",   // clean white
  "#f3eadb",   // warm paper
  "#e8dcc5",   // aged paper
  "#d9cbb3",   // deeper beige
  // "#cbb89d",   // soft tan
  // "#bfa88a",   // muted brown
  // "#a38f75",   // darker neutral
];
  useEffect(() => {
    // 🌊 Lenis
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    // 🎯 Header scroll effect
    gsap.to(".header", {
      background: "rgba(247,243,235,0.85)",
      backdropFilter: "blur(10px)",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // 🎯 Hero parallax
    gsap.to(".hero-content", {
      y: -50,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // 🌊 Floating background
    bgRef.current.forEach((el, i) => {
      if (!el) return;

      gsap.to(el, {
      y : 40 + Math.random() * 600,
      x : i % 2 === 0 ? 40 : -40, // opposite directions
  rotation: i%2 === 0 ? Math.random() * 20 :  Math.random() * -20,

  duration: 12 + Math.random() * 50,
  // delay: i * 0.2,

  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
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
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="bg-book"
            ref={(el) => (bgRef.current[i] = el)}
            style={{
              ttop: `${Math.random() * 100}%`,
  left: i % 2 === 0 
    ? `${Math.random() * 40}%`
    : `${60 + Math.random() * 20}%`,
  background: colors[i % colors.length]

            }}
          />
        ))}
      </div>

      <Header />
      <Hero />

    </main>
  );
}

export default App;