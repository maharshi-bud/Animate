import confetti from "canvas-confetti";
import "./Footer.css";

export default function Footer() {

  const handleClick = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <footer className="footer">
  <div className="footer-container">

    {/* LEFT */}
    <div className="footer-brand">

      {/* CARD */}
      <div className="card" onClick={handleClick}>
        <div className="border"></div>

        <div className="center-content">
          <div className="card-text default">
            Hover for Surprise
          </div>

          <div className="card-text hover">
            Click for Giftcard 🎁
          </div>
        </div>
      </div>

      <div className="footer-text">
        <h2>Ink & Stories</h2>
        <p>A quiet place to discover stories that stay with you.</p>
      </div>

    </div>

    {/* LINKS */}
    <div className="footer-links">
      <div>
        <h4>Explore</h4>
        <a>Discover</a>
        <a>Authors</a>
        <a>Collections</a>
      </div>

      <div>
        <h4>Company</h4>
        <a>About</a>
        <a>Contact</a>
        <a>Careers</a>
      </div>
    </div>

    {/* ✅ YOUR ORIGINAL SHARE BUTTON */}
    <div className="tooltip-container">
      <div className="button-content">
        <span className="text">Share</span>
        <svg className="share-icon" viewBox="0 0 24 24">
          <path d="M18 16.08c-.76 0-1.44..." />
        </svg>
      </div>

      <div className="tooltip-content">
        <div className="social-icons">
          <div className="social-icon twitter"></div>
          <div className="social-icon facebook"></div>
          <div className="social-icon linkedin"></div>
        </div>
      </div>
    </div>

  </div>

  {/* ✅ YOUR ORIGINAL EASTER EGG */}
  <div className="plate-tooltip-container">
    <div className="tooltip-trigger" data-tooltip="Caution: High Voltage">
      <div className="warning-symbol"></div>
    </div>
  </div>

  <div className="footer-bottom">
    © 2026 Ink & Stories
  </div>
</footer>
  );
}