import Container from '../../components/ui/Container';
import SectionTitle from '../../components/ui/SectionTitle';
import styles from './Experience.module.css';
import experience from '../../data/experience';

export default function Experience() {
  return (
    <section id="experience" className={styles.experience} aria-labelledby="experience-heading">
      <Container>
        <SectionTitle
          label="Career"
          title="Professional Experience"
          subtitle="A track record of building impactful systems across AI, data engineering, and full-stack development."
        />

        <div className={styles.timeline}>
          {experience.map((job, index) => (
            <article key={job.id} className={styles.item}>
              <div className={styles.marker} aria-hidden="true">
                <div className={styles.dot} />
                {index < experience.length - 1 && <div className={styles.line} />}
              </div>

              <div className={styles.card}>
                <header className={styles.cardHeader}>
                  <div className={styles.headerLeft}>
                    <h3 className={styles.role}>{job.role}</h3>
                    <span className={styles.company}>{job.company}</span>
                  </div>
                  <div className={styles.headerRight}>
                    <span className={styles.period}>{job.period}</span>
                    <span className={styles.location}>{job.location}</span>
                  </div>
                </header>

                <ul className={styles.bulletList} aria-label={`Responsibilities at ${job.company}`}>
                  {job.description.map((bullet, i) => (
                    <li key={i} className={styles.bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
