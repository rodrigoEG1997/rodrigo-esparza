import Container from '../../components/ui/Container';
import styles from './Automations.module.css';
import automations from '../../data/automations';
import automationGif from '../../assets/automation/automation_gif.mp4';
import bgGif from '../../assets/videos/grass_moving.gif';

const STATUS_LABEL = {
  production: 'Live',
  prototype: 'Prototype',
  concept: 'Concept',
};

function AutomationCard({ automation }) {
  const { title, description, tools, category, status, impact } = automation;

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.category}>{category}</span>
        <span className={`${styles.status} ${styles[`status_${status}`]}`}>
          {STATUS_LABEL[status] ?? status}
        </span>
      </div>

      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>

      <div className={styles.impact}>
        <span className={styles.impactLabel}>Impact</span>
        <span className={styles.impactText}>{impact}</span>
      </div>

      <ul className={styles.tools} aria-label="Tools used">
        {tools.map((tool) => (
          <li key={tool} className={styles.tool}>
            {tool}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Automations() {
  const featured = automations.filter((a) => a.featured);
  const rest = automations.filter((a) => !a.featured);

  return (
    <section className={styles.page} aria-labelledby="automations-heading">
      <div className={styles.hero}>
        <img src={bgGif} className={styles.heroBg} aria-hidden="true" alt="" />
        <div className={styles.heroBackdrop} aria-hidden="true" />
        <Container>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>Workflow Automation</p>
              <h1 id="automations-heading" className={styles.heroTitle}>
                Automations
              </h1>
              <p className={styles.heroSubtitle}>
                A curated collection of end-to-end automation workflows I have designed and
                deployed — connecting tools, eliminating repetitive work, and turning manual
                processes into reliable systems.
              </p>
            </div>

            <div className={styles.heroMedia}>
              <video
                src={automationGif}
                autoPlay
                loop
                muted
                playsInline
                className={styles.heroVideo}
                aria-hidden="true"
              />
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className={styles.content}>
          {featured.length > 0 && (
            <div className={styles.featuredGrid}>
              {featured.map((automation) => (
                <AutomationCard key={automation.id} automation={automation} />
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <>
              <h2 className={styles.restHeading}>More Automations</h2>
              <div className={styles.restGrid}>
                {rest.map((automation) => (
                  <AutomationCard key={automation.id} automation={automation} />
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
