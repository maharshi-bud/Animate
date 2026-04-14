import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./App.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Lenis from "@studio-freight/lenis";
import Header from "./components/Header";

function App() {
  const boxRef = useRef(null);

  
  const lenis = new Lenis({
    smooth: true,
    lerp: 0.1,
  });
  lenis.on("scroll", ScrollTrigger.update)
  
  
  
  useEffect(() => {
    if (boxRef.current) {
      // gsap.from(boxRef.current, { y: 100 })
      
      
      
      gsap.to(".header", {
        background: "rgba(0,0,0,0.4)",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });


    }
  }, []);

  return (
    <main className="app">
      <Header />
      <h1>React + GSAP Starter</h1>
      <div ref={boxRef} className="box">
        Animate me with GSAP
      </div>
    </main>
  );
}

export default App;
