import { motion } from "framer-motion";
import "./Header.css";

function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Logo */}
      <div className="logo">
        Ink & Stories
      </div>

      {/* Navigation */}
      <nav className="nav">
        <a href="#">Discover</a>
        <a href="#">Authors</a>
        <a href="#">Collections</a>
      </nav>

      {/* CTA */}
      <motion.button
        className="cta"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Start reading free
      </motion.button>
    </motion.header>
  );
}

export default Header;