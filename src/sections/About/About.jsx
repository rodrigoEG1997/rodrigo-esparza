import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import BentoGallery from '../../components/ui/BentoGallery';
import styles from './About.module.css';
import personalInfo from '../../data/personalInfo';

import codingImg from '../../assets/images/coding.jpg';
import businessImg from '../../assets/images/Business.jpeg';
import automationImg from '../../assets/images/automation.jpeg';
import aiImg from '../../assets/images/AI.jpeg';

const galleryItems = [
  {
    id: 1,
    type: 'image',
    title: 'Business-Focused Technology',
    desc: 'Transforming business challenges into scalable technical solutions with measurable impact',
    url: businessImg,
    span: 'tall',
  },
  {
    id: 2,
    type: 'image',
    title: '4+ Years of Engineering Experience',
    desc: 'Designing scalable software, automation systems, and AI-powered applications',
    url: codingImg,
    span: 'medium',
  },
  {
    id: 3,
    type: 'image',
    title: 'AI & LLM Product Development',
    desc: 'Creating intelligent systems using Machine Learning, NLP, RAG, and Generative AI technologies',
    url: aiImg,
    span: 'medium',
  },
  {
    id: 4,
    type: 'image',
    title: 'APIs, Scalable Systems & Data Pipelines',
    desc: 'Built ETL workflows processing millions of files, APIs, and operational data streams',
    url: automationImg,
    span: 'wide',
  },
];

export default function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-heading">
      <Container>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>About me</span>
        </div>

        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>Engineer by craft, builder by nature.</h2>

          <div className={styles.paragraphsBlock}>
            {personalInfo.about.split('\n\n').map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.actions}>
            <Button href={personalInfo.linkedin} variant="primary">
              Connect on LinkedIn
            </Button>
            <Button href={`https://mail.google.com/mail/?view=cm&to=${personalInfo.email}`} variant="outline">
              Send an email
            </Button>
          </div>

          <div className={styles.statsSide}>
            <BentoGallery items={galleryItems} />
          </div>
        </div>
      </Container>
    </section>
  );
}
