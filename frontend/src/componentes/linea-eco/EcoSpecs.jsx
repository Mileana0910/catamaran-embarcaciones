import { Users, Sun, Battery, Clock, Zap, Wind, Ship, Gauge } from "lucide-react";

const specifications = {
  embarcacion: {
    title: "Embarcación",
    icon: Ship,
    color: "blue",
    items: [
      { label: "Modelo", value: "Manta Fluvial" },
      { label: "Capacidad", value: "40 pasajeros" },
      { label: "Eslora", value: "13.5 metros" },
      { label: "Manga", value: "7.5 metros" }
    ]
  },
  energia: {
    title: "Sistema Energético",
    icon: Zap,
    color: "amber",
    items: [
      { label: "Potencia Solar", value: "5 kW" },
      { label: "Generación Eólica", value: "1.8 kW" },
      { label: "Baterías Litio", value: "2 x POWER 48-5000" },
      { label: "Capacidad Total", value: "10.5 kWh" }
    ]
  },
  rendimiento: {
    title: "Rendimiento",
    icon: Gauge,
    color: "emerald",
    items: [
      { label: "Motor", value: "TORQEEDO CRUISE 12.0" },
      { label: "Potencia", value: "12 C.V. equivalente" },
      { label: "Velocidad Máxima", value: "27 km/h" },
      { label: "Autonomía", value: "3 recorridos/día" }
    ]
  }
};

const colorMap = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-600" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-600" }
};

export default function EcoSpecs() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Especificaciones Técnicas</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Diseño innovador con máximo rendimiento y sostenibilidad
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(specifications).map(([key, section]) => {
          const colors = colorMap[section.color];
          
          return (
            <div
              key={key}
              className={`relative rounded-2xl border ${colors.border} ${colors.bg} p-8 hover:shadow-lg transition-all duration-300`}
            >
              {/* Header */}
              <div className="flex items-center mb-8">
                <div className={`p-3 rounded-xl bg-white border ${colors.border} mr-4`}>
                  <section.icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
              </div>

              {/* Items */}
              <div className="space-y-6">
                {section.items.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <p className="text-sm font-medium text-gray-500 mb-1">{item.label}</p>
                    <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-6 bg-white border border-gray-200 rounded-2xl px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">100% Libre de Emisiones</span>
          </div>
          <div className="w-px h-6 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Materiales Reciclables</span>
          </div>
        </div>
      </div>
    </div>
  );
}