import Container from '../../components/ui/Container';
import SectionTitle from '../../components/ui/SectionTitle';
import styles from './TechStack.module.css';
import techStack from '../../data/techStack';

const categoryLabels = {
  language: 'Languages',
  ai: 'AI & ML',
  backend: 'Backend',
  frontend: 'Frontend',
  data: 'Data',
  cloud: 'Cloud',
  tools: 'Tools',
};

const categoryOrder = ['language', 'ai', 'backend', 'frontend', 'data', 'cloud', 'tools'];

export default function TechStack() {
  const grouped = categoryOrder.reduce((acc, cat) => {
    const items = techStack.filter((t) => t.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  return (
    <section id="techstack" className={styles.techstack} aria-labelledby="techstack-heading">
      <Container>
        <SectionTitle
          label="Tools"
          title="Tech Stack"
          subtitle="The technologies and tools I work with daily — from AI frameworks to cloud platforms."
          light
        />

        <div className={styles.groups}>
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className={styles.group}>
              <span className={styles.groupLabel}>{categoryLabels[cat]}</span>
              <div className={styles.items}>
                {items.map((tech) => (
                  <div key={tech.name} className={styles.techItem}>
                    <span className={styles.techIcon} aria-hidden="true">{tech.icon}</span>
                    <span className={styles.techName}>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
