import Container from '../ui/Container';
import styles from './Footer.module.css';
import personalInfo from '../../data/personalInfo';
import logo from '../../assets/logos/REG_logo.png';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <Container>
        <div className={styles.inner}>
          <div className={styles.brand}>
            {/* <img src={logo} alt="REG Logo" className={styles.logo} /> */}
            <p className={styles.tagline}>Building intelligent systems that create real impact.</p>
          </div>

          <nav className={styles.links} aria-label="Footer navigation">
            <a href="#about" className={styles.link}>About</a>
            <a href="#experience" className={styles.link}>Experience</a>
            <a href="#projects" className={styles.link}>Projects</a>
            <a href="#contact" className={styles.link}>Contact</a>
          </nav>

          <div className={styles.social}>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
            <span className={styles.dot} aria-hidden="true">·</span>
            <a
              href={`mailto:${personalInfo.email}`}
              className={styles.socialLink}
              aria-label="Send email"
            >
              Email
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} Rodrigo Esparza Giacomelli. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
