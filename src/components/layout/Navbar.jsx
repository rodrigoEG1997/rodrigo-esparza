import { useState, useEffect } from 'react';
import Container from '../ui/Container';
import styles from './Navbar.module.css';
import logo from '../../assets/logos/REG_logo.png';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tech Stack', href: '#techstack' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <Container>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#hero" className={styles.logoLink} aria-label="Home — Rodrigo Esparza Giacomelli">
            <img src={logo} alt="REG Logo" className={styles.logo} />
          </a>

          <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`} role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link} onClick={handleLinkClick}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={`${styles.menuToggle} ${menuOpen ? styles.active : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </Container>
    </header>
  );
}
