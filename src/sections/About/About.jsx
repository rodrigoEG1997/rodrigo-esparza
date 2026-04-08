import Container from '../../components/ui/Container';
import SectionTitle from '../../components/ui/SectionTitle';
import Button from '../../components/ui/Button';
import styles from './About.module.css';
import personalInfo from '../../data/personalInfo';

const highlights = [
  { value: '4+', label: 'Years of Experience' },
  { value: '3', label: 'Advanced Degrees' },
  { value: '100+', label: 'APIs Built' },
  { value: '1M+', label: 'Daily Records Processed' },
];

export default function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-heading">
      <Container>
        <div className={styles.inner}>
          <div className={styles.textSide}>
            <SectionTitle
              label="About me"
              title="Engineer by craft, builder by nature."
              align="left"
            />
            {personalInfo.about.split('\n\n').map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>{paragraph}</p>
            ))}
            <div className={styles.actions}>
              <Button href={personalInfo.linkedin} variant="primary">
                Connect on LinkedIn
              </Button>
              <Button href={`mailto:${personalInfo.email}`} variant="outline">
                Send an email
              </Button>
            </div>
          </div>

          <div className={styles.statsSide}>
            <div className={styles.statsGrid}>
              {highlights.map((item) => (
                <div key={item.label} className={styles.statCard}>
                  <span className={styles.statValue}>{item.value}</span>
                  <span className={styles.statLabel}>{item.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.educationBlock}>
              <h3 className={styles.educationHeading}>Education</h3>
              <ul className={styles.educationList}>
                <li className={styles.educationItem}>
                  <span className={styles.degree}>MSc Artificial Intelligence</span>
                  <span className={styles.school}>National College of Ireland</span>
                  <span className={styles.eduPeriod}>2024 – 2025</span>
                </li>
                <li className={styles.educationItem}>
                  <span className={styles.degree}>MSc Business & Management</span>
                  <span className={styles.school}>Universidad Internacional de la Rioja</span>
                  <span className={styles.eduPeriod}>2023 – 2025</span>
                </li>
                <li className={styles.educationItem}>
                  <span className={styles.degree}>MBA — Corporate Finance</span>
                  <span className={styles.school}>City University Miami</span>
                  <span className={styles.eduPeriod}>2024 – 2025</span>
                </li>
                <li className={styles.educationItem}>
                  <span className={styles.degree}>BSc Computer Science</span>
                  <span className={styles.school}>Tecnológico de Monterrey</span>
                  <span className={styles.eduPeriod}>2015 – 2020</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
