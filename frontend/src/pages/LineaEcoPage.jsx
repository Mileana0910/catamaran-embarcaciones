import EcoHeroSection from "../componentes/linea-eco/EcoHeroSection";
import EcoModelsGallery from "../componentes/linea-eco/EcoModelsGallery";
import EcoTechnologies from "../componentes/linea-eco/EcoTechnologies";
import EcoSpecs from "../componentes/linea-eco/EcoSpecs";
import Button from "../componentes/ui/Button";
import { Link } from "react-router-dom";

export default function LineaEcoPage() {
  return (
    <div className="min-h-screen bg-white">
      <EcoHeroSection />
      {/* Galería de Modelos ECO */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Galería de Modelo ECO</h2>
            <p className="text-gray-600 text-lg">Descubre nuestra flota de embarcaciones sostenibles</p>
          </div>

          <EcoModelsGallery />
        </div>
      </section>

      {/* Tecnologías ECO */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Tecnologías Sostenibles</h2>
            <p className="text-gray-600 text-lg">Innovación que cuida el medio ambiente</p>
          </div>

          <EcoTechnologies />
        </div>
      </section>

      {/* Ficha Técnica */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <EcoSpecs />
        </div>
      </section>
    </div>
  );
}