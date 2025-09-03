import { Link } from "react-router-dom";
import Card from "./ui/Card";
import SectionTitle from "./ui/SectionTitle";
import Button from "./ui/Button";
import turismoImg from '../assets/images/lineaTurismo.jpg';
import alojamientoImg from '../assets/images/lineaAlojamiento.jpg';
import eventosImg from '../assets/images/lineaEventos.jpg';
import diseñosImg from '../assets/images/lineaExclusivo.jpg';

const experiences = [
  {
    image: turismoImg,
    title: "TURISMO",
    subtitle: "Manta Fluvial",
    description: "Embarcaciones diseñadas para experiencias turísticas únicas en ríos y lagos.",
    category: "TURISMO"
  },
  {
    image: alojamientoImg,
    title: "ALOJAMIENTO",
    subtitle: "Manta Fluvial",
    description: "Soluciones flotantes para hospedaje y estancias prolongadas en el agua.",
    category: "ALOJAMIENTO"
  },
  {
    image: eventosImg,
    title: "EVENTOS Y NEGOCIOS",
    subtitle: "Manta Fluvial",
    description: "Espacios flotantes para reuniones corporativas y eventos especiales.",
    category: "EVENTOS Y NEGOCIOS"
  },
  {
    image: diseñosImg,
    title: "DISEÑOS EXCLUSIVOS",
    subtitle: "Manta Fluvial",
    description: "Embarcaciones personalizadas según necesidades específicas del cliente.",
    category: "DISEÑOS EXCLUSIVOS"
  },
];

export default function DifferentExperiencesSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <SectionTitle>Diferentes Experiencias</SectionTitle>
        <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
          Cuatro líneas especializadas para cada necesidad
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, idx) => (
            <Card key={idx} className="border-0 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
              {/* Imagen con tamaño optimizado */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={exp.image} 
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 border-4 rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              
              {/* Contenido */}
              <div className="p-6 flex flex-col flex-grow"> {/* Aumentado a p-6 */}
                {/* Título y subtítulo */}
                <div className="mb-3">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{exp.title}</h3>
                  <div className="text-blue-600 text-sm font-medium">{exp.subtitle}</div>
                </div>
                
                {/* Descripción */}
                <p className="text-gray-700 text-sm mb-6 flex-grow leading-relaxed">
                  {exp.description}
                </p>
                
                {/* Botón Ver Detalles NEGRO con texto blanco */}
                <div className="mt-auto">
                  <Link 
                    to={`/embarcaciones?category=${exp.category}`}
                    className="block w-full"
                  >
                    <Button 
                      className="w-full py-2.5 text-sm font-semibold rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-300 border border-gray-900"
                    >
                      <span className="flex items-center justify-center">
                        Ver Detalles 
                        <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Botón ver todas */}
        <div className="text-center mt-12">
          <Link to="/embarcaciones">
            <Button 
              variant="outline" 
              className="px-8 py-2.5 text-sm font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-lg"
            >
              Ver Todas las Embarcaciones
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}