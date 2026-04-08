import Container from '../../components/ui/Container';
import SectionTitle from '../../components/ui/SectionTitle';
import styles from './Skills.module.css';
import skills from '../../data/skills';

export default function Skills() {
  return (
    <section id="skills" className={styles.skills} aria-labelledby="skills-heading">
      <Container>
        <SectionTitle
          label="Expertise"
          title="Skills & Technologies"
          subtitle="A curated overview of my technical capabilities across the full AI and software development stack."
        />

        <div className={styles.grid}>
          {skills.map((group) => (
            <div key={group.category} className={styles.card}>
              <h3 className={styles.category}>{group.category}</h3>
              <div className={styles.chips}>
                {group.items.map((skill) => (
                  <span key={skill} className={styles.chip}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
