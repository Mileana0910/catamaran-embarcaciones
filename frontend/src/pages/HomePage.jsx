import HeroSection from "../componentes/HeroSection";
import ServicesSection from "../componentes/ServicesSection";
import EcoSection from "../componentes/EcoSection";
import ExperiencesSection from "../componentes/ExperiencesSection";
// Quitamos las importaciones que ya no usamos

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8fa]">
      {/* Hero principal */}
      <HeroSection />
      
      {/* Sección Modelo ECO (ahora unificada con las experiencias) */}
      <EcoSection />
      <ExperiencesSection />
      
      {/* Sección de servicios */}
      <ServicesSection />
      
    </div>
  );
}