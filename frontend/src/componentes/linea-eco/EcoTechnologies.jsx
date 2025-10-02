import { Sun, Wind, Battery, Zap, Settings, Cpu } from "lucide-react";

const ecoFeatures = [
  {
    icon: Sun,
    title: "Energía Solar",
    description: "Sistema fotovoltaico de 5 kW para propulsión y sistemas auxiliares.",
    specs: "5 kW pico",
    gradient: "from-amber-50 to-orange-50",
    iconColor: "text-amber-600"
  },
  {
    icon: Wind,
    title: "Generación Eólica",
    description: "Turbinas integradas que aprovechan brisas marinas para energía adicional.",
    specs: "1.8 kW complementario",
    gradient: "from-sky-50 to-blue-50",
    iconColor: "text-sky-600"
  },
  {
    icon: Battery,
    title: "Almacenamiento",
    description: "Baterías POWER 48-5000 Litio con 5,275 Wh de capacidad.",
    specs: "10.5 kWh total",
    gradient: "from-emerald-50 to-teal-50",
    iconColor: "text-emerald-600"
  },
  {
    icon: Zap,
    title: "Propulsión",
    description: "Motor TORQEEDO CRUISE 12.0 con potencia equivalente a 12 C.V.",
    specs: "12 C.V. equivalente",
    gradient: "from-violet-50 to-purple-50",
    iconColor: "text-violet-600"
  }
];

export default function EcoTechnologies() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {ecoFeatures.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300`} />
            
            <div className="relative z-10 h-full flex flex-col">
              {/* Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <span className="text-sm font-semibold px-4 py-2 rounded-full bg-gray-100 text-gray-600">
                  {feature.specs}
                </span>
              </div>

              {/* Content */}
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900 mb-4 text-xl">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}