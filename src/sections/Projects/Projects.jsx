import { Carousel, ProjectCard } from '../../components/ui/RetroCarousel';
import SectionTitle from '../../components/ui/SectionTitle';
import Container from '../../components/ui/Container';
import projects from '../../data/projects';
import styles from './Projects.module.css';

const PROFILE_IMAGES = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
];

const BG_IMAGE =
  'https://images.unsplash.com/photo-1528458965990-428de4b1cb0d?q=80&w=1200&auto=format&fit=crop';

export default function Projects() {
  const cards = projects.map((project, index) => (
    <ProjectCard
      key={project.id}
      card={{
        title: project.title,
        designation: project.subtitle,
        description: project.description,
        profileImage: PROFILE_IMAGES[index % PROFILE_IMAGES.length],
        tags: project.tags,
      }}
      index={index}
      backgroundImage={BG_IMAGE}
    />
  ));

  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-heading">
      <Container>
        <SectionTitle
          label="Work"
          title="Proyectos"
          subtitle="Highlights from my technical work — from production AI systems to data-driven research."
        />
        <Carousel items={cards} />
      </Container>
    </section>
  );
}
