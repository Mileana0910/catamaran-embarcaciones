import { Sun, Wind, Battery, Zap, Droplets, Recycle } from "lucide-react";
import Card from "../ui/Card";
import { CardHeader, CardTitle, CardContent } from "../ui/Card";

const ecoFeatures = [
  {
    icon: Sun,
    title: "Paneles Solares de Alta Eficiencia",
    description:
      "Tecnología fotovoltaica de última generación que convierte la luz solar en energía limpia para propulsión y sistemas auxiliares.",
    specs: "Hasta 5kW de potencia",
  },
  {
    icon: Wind,
    title: "Generadores Eólicos Integrados",
    description:
      "Turbinas de viento compactas que aprovechan las brisas marinas para generar energía adicional durante la navegación.",
    specs: "1.5kW adicionales",
  },
  {
    icon: Battery,
    title: "Baterías de Ion-Litio",
    description:
      "Sistema de almacenamiento de energía de alta capacidad que garantiza autonomía extendida sin emisiones.",
    specs: "50kWh de capacidad",
  },
  {
    icon: Zap,
    title: "Propulsión Eléctrica",
    description:
      "Motores eléctricos silenciosos y eficientes que eliminan completamente las emisiones durante la navegación.",
    specs: "100HP equivalente",
  },
];

export default function EcoTechnologies() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {ecoFeatures.map((feature, index) => (
        <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
          <CardHeader>
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <feature.icon className="h-8 w-8 text-emerald-600" />
            </div>
            <CardTitle className="text-xl">{feature.title}</CardTitle>
            <span className="text-emerald-600 border-emerald-200 border px-3 py-1 rounded-full text-sm">
              {feature.specs}
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}