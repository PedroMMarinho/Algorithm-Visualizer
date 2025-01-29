import styles from "./Header.module.css";
import NavParticlesBackground from "./NavParticlesBackground";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";


function Header() {
  return (
    <nav className={styles.navbar}>
      
      <NavParticlesBackground />
      <Link to="/" className={styles.logo}>
        AlgoVisualizer
      </Link>

      <ul className={styles.navbarUl}>
      <Link to="/about">
          <li className={styles.navbarLi}>About Me</li>
          </Link>

        <a
          href="https://github.com/PedroMMarinho"
          target="_blank"
          rel="noopener noreferrer"
        >
          <li className={styles.navbarLi}>
            <FaGithub /> Github
          </li>
        </a>

        <a
          href="https://www.linkedin.com/in/pedroMmarinho"
          target="_blank"
          rel="noopener noreferrer"
        >
          <li className={styles.navbarLi}>
            <FaLinkedin /> LinkedIn
          </li>
        </a>
      </ul>
    </nav>
  );
}

export default Header;
