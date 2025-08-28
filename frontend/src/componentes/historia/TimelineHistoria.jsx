import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import Badge from "../ui/Badge";
import { Building2, Lightbulb, Ship, Wrench } from "lucide-react";

export default function TimelineHistoria() {
  const timelineEvents = [
    {
      id: 1,
      year: "2008-2013",
      title: "NACIMIENTO Y DESARROLLO ACB",
      icon: Building2,
      color: "bg-blue-600",
      description:
        "En el año 2008 el SENA CIMM llevó a cabo un trabajo de integración del sector carrocero de Duitama con empresas afectadas por las tendencias del mercado y algunas disposiciones sobre la fabricación de buses. Como resultado nació en el año 2011 la empresa ALIANZA CARROCERA DE BOYACA SAS. Integrando 10 empresas proveedoras y fabricantes de carrocería para bus. Fue así como a partir del año 2013 se fabricaron carrocerías para bus ensambladas bajo un esquema de cooperación en el que las empresas socias proveían según sus fortalezas y la ACB se encargó del ensamble de los buses.",
    },
    {
      id: 2,
      year: "2016-2018",
      title: "INTELIGENCIA COMPETITIVA",
      icon: Lightbulb,
      color: "bg-green-600",
      description:
        "En convenio con la UPTC sede Duitama se llevó a cabo este estudio iniciado en el año 2016 y culminado en el año 2018. Este proyecto de inteligencia competitiva permitió identificar nuevas oportunidades de mercado y desarrollar estrategias para la diversificación de productos, sentando las bases para la incursión en el sector de embarcaciones fluviales.",
    },
    {
      id: 3,
      year: "2019-2022",
      title: "DISEÑO EMBARCACIÓN TURÍSTICA",
      icon: Ship,
      color: "bg-purple-600",
      description:
        "En el año 2019 fue seleccionado nuestro proyecto para la fabricación de una embarcación para el transporte fluvial de pasajeros denominado: 'Diseño de embarcación propulsada mediante energías alternativas para el sector turístico de Boyacá' para ser ejecutado en el año 2020 por el SENA y su Sistema de Investigación, Desarrollo Tecnológico e investigación SENNOVA en la sede del centro industrial de mantenimiento y manufactura CIMM Sogamoso. Proceso que culminó con el registro de diseño industrial 16742 del 26 de diciembre de 2022.",
    },
    {
      id: 4,
      year: "2023-Actualidad",
      title: "PUESTA A PUNTO MANTA FLUVIAL",
      icon: Wrench,
      color: "bg-orange-600",
      description:
        "El año 2023 un equipo integrado por personal profesional del SENA y estudiantes de la facultad de Administración Industrial de la UPTC avanzaron en el análisis de costos de fabricación, despiece y matrices para la fabricación de la embarcación, trabajo que sirvió de base para los cálculos definitivos de diseño y proceso de fabricación. En la actualidad bajo la colaboración del TECNOPARQUE del SENA en la ciudad de Sogamoso se avanza en el cálculo definitivo del sistema de propulsión de la embarcación.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">Momentos Clave</h2>
          <p className="text-gray-600 text-lg">Los hitos que marcaron nuestro desarrollo</p>
        </div>

        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <div
              key={event.id}
              className={`flex flex-col lg:flex-row gap-8 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Contenido principal */}
              <div className="lg:w-1/2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`${event.color} p-4 rounded-full shadow-md`}>
                        <event.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <Badge className="mb-2">{event.year}</Badge>
                        <CardTitle>{event.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{event.description}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Punto de conexión */}
              <div className="lg:w-1/2 flex items-center justify-center relative">
                <div className="hidden lg:block w-1 h-full absolute bg-gray-300"></div>
                <div className={`z-10 w-6 h-6 ${event.color} rounded-full shadow-lg`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}