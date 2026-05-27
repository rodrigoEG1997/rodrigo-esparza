import Hero from '../sections/Hero/Hero';
import About from '../sections/About/About';
import Skills from '../sections/Skills/Skills';
import Experience from '../sections/Experience/Experience';
import TechStack from '../sections/TechStack/TechStack';
import Contact from '../sections/Contact/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      {/* <Skills /> */}
      <TechStack />
      <Contact />
    </main>
  );
}
