import Hero from "../components/Hero";
import Services from "../components/Services";
import FeaturedProjects from "../components/FeaturedProjects";
import TechnicalNotes from "../components/TechnicalNotes";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Services />
      <TechnicalNotes />
      <Contact />
    </>
  );
}