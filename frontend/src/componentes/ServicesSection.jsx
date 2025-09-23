import Card from "./ui/Card";
import SectionTitle from "./ui/SectionTitle";
import { Link } from "react-router-dom";

const services = [
  {
    icon: "🛡️",
    title: "Mantenimiento Integral",
    description: "Servicios completos de mantenimiento preventivo y correctivo.",
    gradient: "from-blue-50 to-white"
  },
  {
    icon: "🔧", 
    title: "Reparaciones Especializadas",
    description: "Equipo técnico especializado en reparaciones.",
    gradient: "from-cyan-50 to-white"
  },
  {
    icon: "📡",
    title: "Seguimiento GPS",
    description: "Monitoreo en tiempo real para seguridad.",
    gradient: "from-indigo-50 to-white"
  },
];

export default function ServicesSection() {
  return (
    <section className="py-12 px-4 bg-blue-100/60">
      <div className="container mx-auto max-w-5xl">
        {/* Encabezado compacto */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-3 border border-blue-200">
            <span>⭐</span>
            Servicios
          </div>
          <SectionTitle className="mb-2 text-2xl">
            Nuestros <span className="text-blue-600">Servicios</span>
          </SectionTitle>
          <p className="text-gray-700 text-sm max-w-xl mx-auto">
            Soluciones integrales para el cuidado de tu embarcación
          </p>
        </div>

        {/* Grid de servicios con gradientes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, idx) => (
            <Card key={idx} className={`bg-gradient-to-b ${service.gradient} border border-blue-200/50 rounded-lg hover:shadow-lg transition-all duration-300 h-full flex flex-col group hover:border-blue-300`}>
              {/* Icono con fondo sutil */}
              <div className="p-4 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-blue-600">{service.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-base">
                  {service.title}
                </h3>
              </div>
              
              {/* Contenido */}
              <div className="px-4 pb-4 flex flex-col flex-grow">
                <p className="text-gray-600 text-xs leading-relaxed text-center mb-3">
                  {service.description}
                </p>
                
                {/* Línea decorativa */}
                <div className="w-12 h-1 bg-gradient-to-r from-blue-300 to-cyan-300 mx-auto rounded-full mt-auto"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <div className="bg-white/80 rounded-lg p-4 border border-blue-200 max-w-xs mx-auto">
            <p className="text-gray-700 text-xs mb-3">
              ¿Necesitas un servicio específico?
            </p>
            <Link to="/contacto">
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition-colors duration-300 w-full">
                Contactar Asesor
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}