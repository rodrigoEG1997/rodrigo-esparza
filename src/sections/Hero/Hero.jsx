import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import styles from './Hero.module.css';
import personalInfo from '../../data/personalInfo';
import profilePic from '../../assets/images/profile/profile_picture.jpeg';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      <div className={styles.backdrop} aria-hidden="true" />
      <Container>
        <div className={styles.inner}>
          <div className={styles.content}>
            <span className={styles.greeting}>Hello, I'm</span>
            <h1 className={styles.name}>{personalInfo.name}</h1>
            <p className={styles.role}>{personalInfo.role}</p>
            <p className={styles.tagline}>{personalInfo.tagline}</p>
            <div className={styles.actions}>
              <Button href="#contact" variant="primary">
                Get in touch
              </Button>
              <Button href="#projects" variant="ghost">
                View my work
              </Button>
            </div>
            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {personalInfo.location}
              </span>
              {/* <span className={styles.metaDivider} aria-hidden="true" /> */}
              {/* <span className={styles.metaItem}>Available for opportunities</span> */}
            </div>
          </div>

          <div className={styles.imageWrapper}>
            <div className={styles.imageFrame}>
              <img
                src={profilePic}
                alt="Rodrigo Esparza Giacomelli — AI Software Engineer"
                className={styles.image}
              />
            </div>
            {/* <div className={styles.imageBadge} aria-label="4+ years experience">
              <span className={styles.badgeNumber}>4+</span>
              <span className={styles.badgeText}>Years of<br />Experience</span>
            </div> */}
          </div>
        </div>
      </Container>

      <a href="#about" className={styles.scrollIndicator} aria-label="Scroll to about section">
        <span className={styles.scrollLine} />
        <span className={styles.scrollLabel}>scroll</span>
      </a>
    </section>
  );
}
