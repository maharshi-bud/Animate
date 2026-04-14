import { motion } from "framer-motion";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      {/* Content */}
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Stories that stay with you long after the last page.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Discover independent authors, read first chapters, and find
          your next favorite story.
        </motion.p>

        <motion.button
          className="hero-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          Start reading free
        </motion.button>
      </div>

    </section>
  );
}

export default Hero;