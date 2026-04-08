import Container from '../../components/ui/Container';
import SectionTitle from '../../components/ui/SectionTitle';
import styles from './Projects.module.css';
import projects from '../../data/projects';

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-heading">
      <Container>
        <SectionTitle
          label="Work"
          title="Selected Projects"
          subtitle="Highlights from my technical work — from production AI systems to data-driven research."
        />

        <div className={styles.featuredGrid}>
          {featured.map((project) => (
            <article key={project.id} className={styles.featuredCard}>
              <div className={styles.cardTop}>
                <div className={styles.cardMeta}>
                  <span className={styles.subtitle}>{project.subtitle}</span>
                </div>
                <div className={styles.cardLinks}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label={`${project.title} on GitHub`}>
                      <GithubIcon />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label={`${project.title} live demo`}>
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>

              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>

              <div className={styles.impact}>
                <span className={styles.impactLabel}>Impact</span>
                <p className={styles.impactText}>{project.impact}</p>
              </div>

              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {others.length > 0 && (
          <>
            <h3 className={styles.othersHeading}>More Projects</h3>
            <div className={styles.othersGrid}>
              {others.map((project) => (
                <article key={project.id} className={styles.otherCard}>
                  <div className={styles.otherTop}>
                    <span className={styles.subtitle}>{project.subtitle}</span>
                  </div>
                  <h4 className={styles.otherTitle}>{project.title}</h4>
                  <p className={styles.otherDescription}>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
