import Hero from "../components/Hero";
import FeaturedProjects from "../components/FeaturedProjects";
import TechnicalNotes from "../components/TechnicalNotes";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <TechnicalNotes />
      <Contact />
    </>
  );
}