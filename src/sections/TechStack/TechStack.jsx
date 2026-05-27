import Container from '../../components/ui/Container';
import SectionTitle from '../../components/ui/SectionTitle';
import { ExpandableCard } from '../../components/ui/ExpandableCard';
import styles from './TechStack.module.css';
import experienceCards from '../../data/techStack';

export default function TechStack() {
  return (
    <section id="techstack" className={styles.techstack} aria-labelledby="techstack-heading">
      <Container>
        <SectionTitle
          label="Expertise"
          title="Tech Stack"
          subtitle="The technologies and tools I work with daily, from AI frameworks to cloud platforms."
        />

        <div className={styles.grid}>
          {experienceCards.map((card) => (
            <ExpandableCard
              key={card.title}
              title={card.title}
              description={card.subtitle}
              src={card.image}
            >
              {card.highlights.map((h) => (
                <div key={h.title} className={styles.highlight}>
                  <h4 className={styles.highlightTitle}>{h.title}</h4>
                  <p>{h.description}</p>
                </div>
              ))}
              <div className={styles.skillTags}>
                {card.skills.map((skill) => (
                  <span key={skill} className={styles.skillTag}>{skill}</span>
                ))}
              </div>
            </ExpandableCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
