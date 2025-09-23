import Button from "./ui/Button";
import SectionTitle from "./ui/SectionTitle";
import Card from "./ui/Card";
import lineaEco from '../assets/images/Eco1.jpg';
import { Link } from "react-router-dom";

export default function EcoSection() {
  const experiences = [
    {
      title: "TURISMO",
      description: "Embarcaciones diseñadas para experiencias turísticas únicas en ríos y lagos.",
      icon: "🚤",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-100"
    },
    {
      title: "ALOJAMIENTO", 
      description: "Soluciones flotantes para hospedaje y estancias prolongadas en el agua.",
      icon: "🏨",
      bgColor: "bg-green-100",
      iconColor: "text-green-700",
      borderColor: "border-green-200"
    },
    {
      title: "EVENTOS Y NEGOCIOS",
      description: "Espacios flotantes para reuniones corporativas y eventos especiales.",
      icon: "🎯",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-100"
    },
    {
      title: "DISEÑOS EXCLUSIVOS",
      description: "Embarcaciones personalizadas según necesidades específicas del cliente.",
      icon: "⭐",
      bgColor: "bg-green-100", 
      iconColor: "text-green-700",
      borderColor: "border-green-200"
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Encabezado con identidad ECO */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="text-lg">🌱</span>
            Innovación Sostenible
          </div>
          <SectionTitle className="mb-4">
      ECO <span className="text-green-600">EMBARCACIÓN</span>
          </SectionTitle>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Presentamos nuestras embarcaciones con energía renovable: paneles solares, aerogeneradores y sistemas de autogeneración para una navegación 100% sostenible.</p>
        </div>

        {/* Contenido principal - Layout balanceado */}
        <div className="flex flex-col lg:flex-row gap-8 items-center mb-16">
          {/* Imagen compacta */}
          <div className="lg:w-2/5">
            <Card className="overflow-hidden border border-green-100 shadow-lg">
              <img
                src={lineaEco}
                alt="Modelo ECO Base"
                className="w-full h-64 object-cover"
              />
            </Card>
          </div>
          
          {/* Características ECO - Diseño verde */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-xl p-6 border border-green-50">
              <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-3">
                <span className="bg-green-100 text-green-600 p-2 rounded-lg">⚡</span>
                Tecnología Sostenible Integrada
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/60 border border-green-100">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    🔋
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Paneles Solares</h4>
                    <p className="text-gray-600 text-xs">Energía limpia y renovable</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/60 border border-green-100">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    🌊
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Cero Emisiones</h4>
                    <p className="text-gray-600 text-xs">Operación eco-friendly</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/60 border border-green-100">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    💨
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Aerogeneradores</h4>
                    <p className="text-gray-600 text-xs">Autonomía extendida</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/60 border border-green-100">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    ♻️
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Materiales Reciclables</h4>
                    <p className="text-gray-600 text-xs">Construcción sostenible</p>
                  </div>
                </div>
              </div>
              
              {/* ENLACE CORREGIDO */}
              <Link to="/linea-eco">
                <Button variant="primary" className="w-full py-3 font-semibold rounded-lg bg-green-600 hover:bg-green-700 text-white">
                  Explorar Modelo ECO Completo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Las 4 líneas de aplicación - Diseño verde */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Adaptable a 4 Líneas Especializadas
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              El mismo modelo ECO, configurado para diferentes experiencias y necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, idx) => (
              <Card key={idx} className={`border ${exp.borderColor} rounded-xl hover:shadow-lg transition-shadow duration-300 h-full flex flex-col`}>
                {/* Icono */}
                <div className={`${exp.bgColor} p-6 text-center rounded-t-xl`}>
                  <div className={`text-4xl ${exp.iconColor} mb-3`}>
                    {exp.icon}
                  </div>
                </div>
                
                {/* Contenido */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-800 text-lg mb-3 text-center">{exp.title}</h3>
                  
                  <p className="text-gray-700 text-sm leading-relaxed flex-grow text-center">
                    {exp.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA verde */}
        <div className="text-center">
          <div className="bg-green-50 rounded-xl p-8 border border-green-100">
            <h3 className="text-xl font-bold text-gray-800 mb-3">¿Interesado en el Modelo ECO?</h3>
            <p className="text-gray-600 mb-6">Contáctanos para una cotización personalizada</p>
            <Link to="/contacto">
              <Button className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-lg font-semibold">
                Solicitar Cotización
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}