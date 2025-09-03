import { Users, Sun, Battery, Clock, Zap, Recycle, Shield, Wind } from "lucide-react";

export default function EcoSpecs() {
  const specifications = [
    {
      category: "Rendimiento Energético",
      items: [
        { icon: Sun, label: "Potencia Solar", value: "Hasta 5 kW" },
        { icon: Wind, label: "Generación Eólica", value: "1.5 kW adicionales" },
        { icon: Battery, label: "Capacidad de Batería", value: "50 kWh" },
        { icon: Clock, label: "Autonomía", value: "Hasta 20 horas" },
      ]
    },
    {
      category: "Características Técnicas",
      items: [
        { icon: Users, label: "Capacidad", value: "8-24 pasajeros" },
        { icon: Zap, label: "Propulsión", value: "Motores eléctricos 100HP" },
        { icon: Recycle, label: "Materiales Reciclables", value: "85% del total" },
        { icon: Shield, label: "Certificaciones", value: "ECO-Friendly & Safety" },
      ]
    },
    {
      category: "Beneficios Ambientales",
      items: [
        { label: "Reducción de Emisiones", value: "100% libre de CO2" },
        { label: "Consumo Energético", value: "60% menos que modelos convencionales" },
        { label: "Ruido", value: "Navegación silenciosa (<60dB)" },
        { label: "Mantenimiento", value: "30% menos costoso" },
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-blue-50 py-16 rounded-2xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">Ficha Técnica</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Especificaciones técnicas y beneficios de nuestra línea ECO
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specifications.map((spec, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-emerald-700 mb-6 pb-2 border-b border-emerald-100">
                {spec.category}
              </h3>
              <div className="space-y-4">
                {spec.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start">
                    {item.icon && (
                      <div className="bg-emerald-100 p-2 rounded-lg mr-4 flex-shrink-0">
                        <item.icon className="h-5 w-5 text-emerald-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.label}</p>
                      <p className="text-emerald-600 font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}