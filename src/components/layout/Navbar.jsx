import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Container from '../ui/Container';
import styles from './Navbar.module.css';
import logo from '../../assets/logos/REG_logo.png';

const sectionLinks = [
  { label: 'About', anchor: 'about' },
  { label: 'Experience', anchor: 'experience' },
  { label: 'Tech Stack', anchor: 'techstack' },
  { label: 'Contact', anchor: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isHome = pathname === '/';
  const sectionHref = (anchor) => (isHome ? `#${anchor}` : `/#${anchor}`);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${isHome ? (scrolled ? styles.scrolled : '') : styles.pinned}`}
      role="banner"
    >
      <Container>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link to="/" className={styles.logoLink} aria-label="Home — Rodrigo Esparza Giacomelli">
            <img src={logo} alt="REG Logo" className={styles.logo} />
          </Link>

          <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`} role="list">
            {sectionLinks.map(({ label, anchor }) => (
              <li key={anchor}>
                <a href={sectionHref(anchor)} className={styles.link} onClick={closeMenu}>
                  {label}
                </a>
              </li>
            ))}
            <li>
              <NavLink
                to="/automations"
                className={({ isActive }) =>
                  `${styles.link} ${styles.linkPage} ${isActive ? styles.linkPageActive : ''}`
                }
                onClick={closeMenu}
              >
                Automations
              </NavLink>
            </li>
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
