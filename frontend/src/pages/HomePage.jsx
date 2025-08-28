import HeroSection from "../componentes/HeroSection";
import ContactSection from "../componentes/ContactSection";
import ServicesSection from "../componentes/ServicesSection";
import DifferentExperiencesSection from "../componentes/DifferentExperiencesSection";
import EcoSection from "../componentes/EcoSection";
import ExperiencesSection from "../componentes/ExperiencesSection";


export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8fa]">
      {/* Hero principal */}
      <HeroSection />
       {/* Sección Línea ECO */}
      <EcoSection />
      {/* Sección de diferentes experiencias */}
      <DifferentExperiencesSection />
      <ExperiencesSection />
      {/* Sección de servicios */}
      <ServicesSection />
      {/* Sección de contacto/colaboradores */}
      <ContactSection />
    </div>
  );
}