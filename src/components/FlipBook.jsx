import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FlipBook.css";

gsap.registerPlugin(ScrollTrigger);

export default function FlipBook() {
  const bookRef = useRef(null);
  const img1 = "https://images.unsplash.com/photo-1501785888041-af3ef285b470";
const img2 = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e";
const img3 = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";
const img4 = "https://images.unsplash.com/photo-1493244040629-496f6d136cc3";
const img5 = "https://images.unsplash.com/photo-1502082553048-f009c37129b9";
  const bookPages = [
  {
    text: "The forest had been silent for years...",
    img: img1
  },
  {
    text: "No birds. No wind. Just silence.",
    img: img2 },
  {
    text: "Until she stepped inside...",
    img: img3
  },
  {
    text: "Something was watching her...",
    img: img4 },
  {
    text: "And it knew her name...",
    img: img5
  },
];

  const renderPage = (el, page) => {
  if (!el) return;

  if (!page) {
    el.innerHTML = "";
    return;
  }

  el.innerHTML = `
    <div class="page-inner">
      <img src="${page.img}" alt="" />
      <p>${page.text}</p>
    </div>
  `;
};

  useEffect(() => {
    const book = bookRef.current;

    const leftEl = document.getElementById("leftContent");
    const rightEl = document.getElementById("rightContent");
    const flipEl = document.getElementById("flipContent");
    const flipPage = document.getElementById("flipPage");

    let currentIndex = 0;
    let isFlipping = false;
    const total = bookPages.length;

    // 🧠 INITIAL CONTENT
    leftEl.innerText = "";
    rightEl.innerText = bookPages[0];
    flipEl.innerText = bookPages[1];

//     renderPage(leftEl, bookPages[currentIndex]);
// renderPage(rightEl, bookPages[nextIndex]);
// renderPage(flipEl, bookPages[nextIndex ]);

    // 🎯 ENTRY ANIMATION
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
          start: "top 90%",
          end: "top 40%",
          scrub: true,
        },
      }
    );

    // 📌 PIN SECTION
    ScrollTrigger.create({
      trigger: ".flipbook-section",
      start: "top 150px",
      end: "+=1500",
      pin: true,
    });


    // 📘 CLEAN SCROLL FLIP
    const handleWheel = (e) => {
      e.preventDefault(); // 🔥 STOP PAGE SCROLL

      if (isFlipping) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = currentIndex + direction;

      // 🛑 LIMITS
      if (nextIndex < 0 || nextIndex >= total - 1) return;

      isFlipping = true;

      const tl = gsap.timeline({
        onComplete: () => {
          currentIndex = nextIndex;
          isFlipping = false;
        },
      });

      // 🔥 FIRST HALF (fold)
      tl.to(flipPage, {
        rotateY: -90,
        duration: 1,
        ease: "power2.in",
          boxShadow: "0 40px 80px rgba(0,0,0,0.35)",

        onComplete: () => {
          // // 📖 UPDATE CONTENT MID-FLIP
          // leftEl.innerText = bookPages[currentIndex] || "";
          // rightEl.innerText = bookPages[nextIndex] || "";
          // flipEl.innerText = bookPages[nextIndex + 1] || "";

          renderPage(leftEl, bookPages[currentIndex]);
renderPage(rightEl, bookPages[nextIndex]);
renderPage(flipEl, bookPages[nextIndex + 1]);
        },
      });

      // 🔥 SECOND HALF (complete flip)
      tl.to(flipPage, {
        rotateY: -180,
        duration: 1,
        ease: "power2.out",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",

      });

      // 🔄 RESET
      tl.set(flipPage, { rotateY: 0 });
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
          <div className="content" id="leftContent"></div>
        </div>

        {/* RIGHT STATIC */}
        <div className="page right-base">
          <div className="content" id="rightContent"></div>
        </div>

        {/* FLIP PAGE */}
        <div className="page right" id="flipPage">
          <div className="content" id="flipContent"></div>
        </div>

      </div>
    </section>
  );
}