import Card from "../ui/Card";
import { Calendar, Users, Award, MapPin } from "lucide-react";

export default function LogrosHistoria() {
  const logros = [
    { icon: Calendar, value: "15+", label: "Años de experiencia en el sector", color: "text-blue-600" },
    { icon: Users, value: "10", label: "Empresas integradas en la alianza", color: "text-green-600" },
    { icon: Award, value: "1", label: "Registro de diseño industrial", color: "text-yellow-600" },
    { icon: MapPin, value: "3", label: "Instituciones colaboradoras", color: "text-purple-600" },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">Nuestros Logros</h2>
        <p className="text-gray-600 text-lg mb-12">Resultados que respaldan nuestra trayectoria</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {logros.map((logro, i) => (
            <Card key={i} className="text-center hover:shadow-lg transition-shadow">
              <div className="pt-6">
                <logro.icon className={`h-12 w-12 mx-auto mb-4 ${logro.color}`} />
                <div className="text-3xl font-bold text-slate-900 mb-2">{logro.value}</div>
                <p className="text-gray-600">{logro.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}