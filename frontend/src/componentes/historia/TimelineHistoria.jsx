import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Building2, Lightbulb, Ship, Wrench } from "lucide-react";

export default function TimelineHistoria() {
  const timelineEvents = [
    {
      id: 1,
      year: "2008-2013",
      title: "NACIMIENTO Y DESARROLLO ACB",
      icon: Building2,
      description: "En el año 2008 el SENA CIMM llevó a cabo un trabajo de integración del sector carrocero de Duitama con empresas afectadas por las tendencias del mercado y algunas disposiciones sobre la fabricación de buses. Como resultado nació en el año 2011 la empresa ALIANZA CARROCERA DE BOYACA SAS."
    },
    {
      id: 2,
      year: "2016-2018",
      title: "INTELIGENCIA COMPETITIVA",
      icon: Lightbulb,
      description: "En convenio con la UPTC sede Duitama se llevó a cabo este estudio iniciado en el año 2016 y culminado en el año 2018. Este proyecto de inteligencia competitiva permitió identificar nuevas oportunidades de mercado."
    },
    {
      id: 3,
      year: "2019-2022",
      title: "DISEÑO EMBARCACIÓN TURÍSTICA",
      icon: Ship,
      description: "En el año 2019 fue seleccionado nuestro proyecto para la fabricación de una embarcación para el transporte fluvial de pasajeros denominado: Diseño de embarcación propulsada mediante energías alternativas."
    },
    {
      id: 4,
      year: "2023-Actualidad",
      title: "PUESTA A PUNTO MANTA FLUVIAL",
      icon: Wrench,
      description: "El año 2023 un equipo integrado por personal profesional del SENA y estudiantes de la UPTC avanzaron en el análisis de costos de fabricación, despiece y matrices para la fabricación de la embarcación."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Encabezado al estilo de la referencia */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Orígenes del Proyecto</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            La historia de MANTA Fluvial se remonta a 2008, cuando el SENA CIMM inició un trabajo 
            de integración del sector carrocero de Duitama. Este proceso culminó con el nacimiento 
            de ALIANZA CARROCERA DE BOYACA SAS y sentó las bases para el desarrollo de embarcaciones 
            fluviales sostenibles.
          </p>
        </div>

        {/* Timeline estilo referencia */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Cronología Histórica</h3>
          
          <div className="space-y-8">
            {timelineEvents.map((event) => (
              <div key={event.id} className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-600">
                {/* Encabezado del evento */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <event.icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <span className="inline-block bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-2">
                      {event.year}
                    </span>
                    <h4 className="text-xl font-semibold text-gray-900">{event.title}</h4>
                  </div>
                </div>
                
                {/* Descripción */}
                <p className="text-gray-700 leading-relaxed pl-16">
                  {event.description}
                </p>
                
                {/* Puntos destacados (opcional) */}
                <ul className="text-gray-600 space-y-1 mt-4 pl-16">
                  {event.id === 1 && (
                    <>
                      <li>• Integración de 10 empresas proveedoras y fabricantes</li>
                      <li>• Fabricación de carrocerías bajo esquema de cooperación</li>
                    </>
                  )}
                  {event.id === 2 && (
                    <>
                      <li>• Identificación de nuevas oportunidades de mercado</li>
                      <li>• Desarrollo de estrategias para diversificación</li>
                      <li>• Culmina con la definición de la estrategia de atender el mercado de transporte fluvial en Colombia de pasajeros.</li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Información adicional estilo referencia */}
        <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Proyección Futura</h3>
          <p className="text-gray-700 leading-relaxed">
            Actualmente, bajo la colaboración del TECNOPARQUE del SENA en Sogamoso, se avanza en el 
            cálculo definitivo del sistema de propulsión de la embarcación, consolidando nuestro 
            compromiso con la innovación y sostenibilidad en el sector fluvial.
          </p>
        </div>
      </div>
    </section>
  );
}