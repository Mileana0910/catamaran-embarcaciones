import Card from "./ui/Card";
import SectionTitle from "./ui/SectionTitle";

const services = [
  {
    icon: "🛡️",
    title: "Mantenimiento Integral",
    description: "Servicios completos de mantenimiento preventivo y correctivo para mantener tu embarcación en perfectas condiciones.",
  },
  {
    icon: "🔧",
    title: "Reparaciones Especializadas",
    description: "Equipo técnico especializado en reparaciones de motores, sistemas eléctricos y estructurales.",
  },
  {
    icon: "📡",
    title: "Seguimiento GPS",
    description: "Sistema de monitoreo en tiempo real para la ubicación y seguridad de tu embarcación.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-12 px-4 bg-blue-100">
      <SectionTitle>Nuestros Servicios</SectionTitle>
      <p className="text-center text-gray-600 mb-8">
        Servicios integrales para propietarios de embarcaciones
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, idx) => (
          <Card key={idx} className="w-80 flex flex-col items-center">
            <span className="text-4xl mb-4">{service.icon}</span>
            <h3 className="font-bold mb-2">{service.title}</h3>
            <p className="text-center text-gray-600">{service.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}