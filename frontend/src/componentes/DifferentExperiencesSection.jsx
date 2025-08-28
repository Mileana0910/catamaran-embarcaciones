import { Link } from "react-router-dom";
import Card from "./ui/Card";
import SectionTitle from "./ui/SectionTitle";
import Button from "./ui/Button";

const experiences = [
  {
    icon: "🛥️",
    color: "border-blue-400",
    title: "TURISMO",
    subtitle: "Manta Fluvial",
    description: "Embarcaciones diseñadas para experiencias turísticas únicas en ríos y lagos.",
    details: ["Capacidad 8-12 personas", "Equipamiento turístico", "Rutas panorámicas"],
    category: "TURISMO"
  },
  {
    icon: "🏠",
    color: "border-green-400",
    title: "ALOJAMIENTO",
    subtitle: "Manta Fluvial",
    description: "Soluciones flotantes para hospedaje y estancias prolongadas en el agua.",
    details: ["Cabinas confortables", "Servicios completos", "Experiencia única"],
    category: "ALOJAMIENTO"
  },
  {
    icon: "🎤",
    color: "border-purple-400",
    title: "EVENTOS Y NEGOCIOS",
    subtitle: "Manta Fluvial",
    description: "Espacios flotantes para reuniones corporativas y eventos especiales.",
    details: ["Salas de reuniones", "Equipos audiovisuales", "Catering a bordo"],
    category: "EVENTOS Y NEGOCIOS"
  },
  {
    icon: "🎨",
    color: "border-orange-400",
    title: "DISEÑOS EXCLUSIVOS",
    subtitle: "Manta Fluvial",
    description: "Embarcaciones personalizadas según necesidades específicas del cliente.",
    details: ["Diseño personalizado", "Especificaciones únicas", "Fabricación exclusiva"],
    category: "DISEÑOS EXCLUSIVOS"
  },
];

export default function DifferentExperiencesSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <SectionTitle>Diferentes Experiencias</SectionTitle>
      <p className="text-center text-gray-600 mb-8">
        Cuatro líneas especializadas para cada necesidad
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {experiences.map((exp, idx) => (
          <Card key={idx} className={`w-72 border-t-4 ${exp.color} flex flex-col items-center`}>
            <span className="text-4xl mb-4">{exp.icon}</span>
            <h3 className="font-bold mb-1">{exp.title}</h3>
            <div className="text-xs text-gray-500 mb-2">{exp.subtitle}</div>
            <p className="text-center text-gray-600 mb-4">{exp.description}</p>
            <ul className="text-xs text-gray-500 mb-4 list-disc list-inside">
              {exp.details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
            <Link to={`/embarcaciones?category=${exp.category}`}>
              <Button variant="primary" className="text-sm">
                Ver Embarcaciones →
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}