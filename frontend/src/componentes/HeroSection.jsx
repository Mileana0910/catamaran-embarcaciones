import { useState } from "react";
import { 
  TrendingUp, Award, Lightbulb, Globe, ChevronRight 
} from "lucide-react";
import SectionTitle from "../componentes/ui/SectionTitle";
import Modal from "../componentes/ui/Modal";
import HistoryCard from "../componentes/ui/HistoryCard";
import logoManta from "../assets/images/logo-manta.jpg";
import logoACB from "../assets/images/logo-alianza.jpg";
import logoSENA from "../assets/images/logo-sena.jpg";
import logoUPTC from "../assets/images/Logo-UPTC.jpg";
import logoTecnoparque from "../assets/images/logo_Tecnoparque.jpg";
import { HistoryModalContent } from "../componentes/historia/HistoryModalContent";
export default function HeroSection() {
  const [activeModal, setActiveModal] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const historyData = [
    {
      id: 1,
      title: "NACIMIENTO Y DESARROLLO ACB",
      year: "2008-2013",
      logo: logoACB, 
      gradient: "from-blue-800 to-blue-900",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-600 shadow-sm">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Nacimiento y Desarrollo ACB</h3>
            <p className="text-gray-800 leading-relaxed text-lg">
              <strong className="text-blue-700">En el año 2008 el SENA CIMM</strong> llevó a cabo un trabajo de integración del sector carrocero de Duitama con empresas afectadas por las tendencias del mercado y algunas disposiciones sobre la fabricación de buses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-700 to-blue-800 p-6 rounded-xl text-white shadow-lg">
              <div className="flex items-center mb-3">
                <TrendingUp className="mr-3" size={24} />
                <h4 className="font-bold text-lg">2011 - Fundación</h4>
              </div>
              <p className="text-base leading-relaxed">Cómo resultado nació en el año 2011 la empresa <strong>ALIANZA CARROCERA DE BOYACA SAS</strong>, integrando 10 empresas proveedoras y fabricantes de carrocería para bus.</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl text-white shadow-lg">
              <h4 className="font-bold text-lg mb-3">2013 - Producción</h4>
              <p className="text-base leading-relaxed">Fué así cómo a partir del año 2013 se fabricaron carrocerías para bus ensambladas bajo un esquema de cooperación en el que las empresas socias proveían según sus fortalezas y la ACB se encargó del ensamble de los buses.</p>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-8">
            <img src={logoACB} alt="ACB" className="h-16 opacity-90" /> {/* Cambiado de logoSENA a logoACB */}
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "INTELIGENCIA COMPETITIVA",
      year: "2016-2018",
      logo: logoUPTC,
      gradient: "from-blue-800 to-blue-900",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-600 shadow-sm">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Inteligencia Competitiva</h3>
            <p className="text-gray-800 leading-relaxed text-lg">
              <strong className="text-blue-700">En convenio con la UPTC sede Duitama</strong> se llevó a cabo este estudio iniciado en el año 2016 y culminado en el año 2018.
            </p>
          </div>

          <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-lg">
            <h4 className="font-bold text-blue-800 text-xl mb-4 flex items-center">
              <Lightbulb className="mr-3" size={24} />
              Hallazgos del Estudio de Mercado UPTC - DITMAV
            </h4>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h5 className="font-semibold text-blue-700 mb-4 text-lg">📈 Tendencias Identificadas</h5>
                <ul className="text-gray-700 space-y-3 text-base">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span><strong>Ecoturismo:</strong> Crecimiento sostenible con mínimo impacto ambiental</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span><strong>Glamping:</strong> Alternativa ecológica con materiales naturales</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span><strong>Transporte fluvial:</strong> Potencial crecimiento del 473.53% (Plan Maestro Fluvial)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span><strong>Construcción modular:</strong> Casas portátiles y aulas móviles</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-blue-700 mb-4 text-lg">🎯 Oportunidades de Mercado</h5>
                <ul className="text-gray-700 space-y-3 text-base">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span>59 áreas naturales en sistema de parques nacionales</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span>8 destinos naturales favoritos identificados</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span>Crecimiento sostenido del turismo internacional</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span>Mercado chino como oportunidad emergente</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-8 rounded-xl text-white shadow-xl">
            <h4 className="font-bold text-xl mb-4 flex items-center">
              <Globe className="mr-3" size={24} />
              Perspectivas Colombia
            </h4>
            <div className="grid md:grid-cols-2 gap-6 text-base">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ChevronRight size={16} className="mr-2" />
                  Bogotá capta el 50% del turista internacional
                </li>
                <li className="flex items-center">
                  <ChevronRight size={16} className="mr-2" />
                  Turismo crece anualmente en aporte al PIB
                </li>
                <li className="flex items-center">
                  <ChevronRight size={16} className="mr-2" />
                  Duplicación de pasajeros aéreos nacionales
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ChevronRight size={16} className="mr-2" />
                  Oportunidad en turismo de posconflicto
                </li>
                <li className="flex items-center">
                  <ChevronRight size={16} className="mr-2" />
                  Segmentos emergentes: LGTB, Backpackers, tercera edad
                </li>
                <li className="flex items-center">
                  <ChevronRight size={16} className="mr-2" />
                  Mejora en conectividad vial necesaria
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center gap-8 mt-6">
            <img src={logoUPTC} alt="UPTC" className="h-14 opacity-90" />
            <div className="bg-blue-100 px-6 py-3 rounded-xl border border-blue-200 shadow-sm">
              <span className="text-blue-800 text-base font-semibold">DITMAV - Grupo de Investigación</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "DISEÑO EMBARCACIÓN TURÍSTICA",
      year: "2019-2022",
      logo: logoSENA,
      gradient: "from-blue-800 to-blue-900",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-600 shadow-sm">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Diseño Embarcación Turística</h3>
            <p className="text-gray-800 leading-relaxed text-lg">
              <strong className="text-blue-700">En el año 2019 fué seleccionado nuestro proyecto</strong> para la fabricación de una embarcación para el transporte fluvial de pasajeros denominado: <strong>"Diseño de embarcación propulsada mediante energías alternativas para el sector turístico de Boyacá"</strong> para ser ejecutado en el año 2020 por el SENA y su Sistema de Investigación, Desarrollo Tecnológico e investigación SENNOVA en la sede del centro industrial de mantenimiento y manufactura CIMM Sogamoso.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-5 rounded-xl border border-blue-300 text-center shadow-md">
              <span className="text-blue-800 font-bold text-xl">2019</span>
              <p className="text-base mt-3 text-gray-700 font-medium">Selección del proyecto innovador</p>
            </div>
            <div className="bg-gradient-to-br from-blue-200 to-blue-300 p-5 rounded-xl border border-blue-400 text-center shadow-md">
              <span className="text-blue-900 font-bold text-xl">2020</span>
              <p className="text-base mt-3 text-gray-800 font-medium">Ejecución con SENA SENNOVA</p>
            </div>
            <div className="bg-gradient-to-br from-blue-300 to-blue-400 p-5 rounded-xl border border-blue-500 text-center shadow-md">
              <span className="text-white font-bold text-xl">2022</span>
              <p className="text-base mt-3 text-white font-medium">Registro diseño industrial</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-8 rounded-xl text-white shadow-xl text-center">
            <Award className="mx-auto mb-4" size={48} />
            <h4 className="font-bold text-2xl mb-3">Registro de Diseño Industrial No. 16742</h4>
            <p className="text-lg mt-2 opacity-95">CATAMARÁN - Vigente desde 26 de diciembre de 2022 hasta 26 de diciembre de 2032</p>
            <p className="text-sm mt-3 opacity-80">Superintendencia de Industria y Comercio</p>
          </div>

          <div className="flex justify-center gap-6 mt-6">
            <img src={logoSENA} alt="SENA" className="h-16 opacity-90" />
            <div className="bg-blue-100 px-6 py-3 rounded-xl border border-blue-200 shadow-sm">
              <span className="text-blue-800 text-base font-semibold">SENNOVA</span>
            </div>
            <div className="bg-blue-100 px-6 py-3 rounded-xl border border-blue-200 shadow-sm">
              <span className="text-blue-800 text-base font-semibold">CIMM Sogamoso</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "MANTA FLUVIAL",
      year: "2023-Actualidad",
      logo: logoTecnoparque,
      gradient: "from-blue-800 to-blue-900",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-600 shadow-sm">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Puesta a Punto Manta Fluvial</h3>
            <p className="text-gray-800 leading-relaxed text-lg">
              <strong className="text-blue-700">El año 2023 un equipo Integrado por personal profesional del SENA y estudiantes de la facultad de Administración Industrial de la UPTC</strong> avanzaron en el análisis de costos de fabricación, despiece y matrices para la fabricación de la embarcación, trabajo que sirvió de base para los cálculos definitivos de diseño y proceso de fabricación.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl text-white shadow-lg">
              <h4 className="font-bold text-xl mb-4">✅ Avances 2023</h4>
              <ul className="space-y-3 text-base">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Análisis detallado de costos de fabricación
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Despiece técnico completo de la embarcación
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Matrices para procesos de fabricación optimizados
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Base para cálculos definitivos de diseño
                </li>
              </ul>
            </div>
            
            <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-lg">
              <h4 className="font-bold text-blue-700 text-xl mb-4">🔧 Proceso de Fabricación</h4>
              <p className="text-gray-700 text-base leading-relaxed">
                El trabajo sirvió de base fundamental para los cálculos definitivos de diseño y proceso de fabricación de la embarcación Manta Fluvial, estableciendo los parámetros técnicos y económicos para su producción.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-8 rounded-xl text-white shadow-xl">
            <h4 className="font-bold text-2xl mb-4">🚀 Estado Actual - Desarrollo Tecnológico</h4>
            <p className="text-lg mb-6 opacity-95">
              <strong>En la actualidad bajo la colaboración del TECNOPARQUE del SENA en la ciudad de Sogamoso</strong> se avanza en el cálculo definitivo del sistema de propulsión de la embarcación.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-base">
              <div>
                <h5 className="font-semibold text-lg mb-3">🏗️ TECNOPARQUE SENA</h5>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2" />
                    Cálculo definitivo del sistema de propulsión
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2" />
                    Optimización para eficiencia energética
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2" />
                    Implementación de energías alternativas
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2" />
                    Análisis de sostenibilidad ambiental
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-lg mb-3">🎯 Próximos Objetivos</h5>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2" />
                    Prototipo funcional de la embarcación
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2" />
                    Pruebas de navegación en condiciones reales
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2" />
                    Certificación y homologación final
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2" />
                    Producción a escala comercial
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-8 mt-6">
            <img src={logoTecnoparque} alt="Tecnoparque" className="h-14 opacity-90" />
            <img src={logoSENA} alt="SENA" className="h-14 opacity-90" />
            <img src={logoUPTC} alt="UPTC" className="h-14 opacity-90" />
          </div>
        </div>
      )
    }
  ];

  const openModal = (id) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);

  const getActiveModalData = () => historyData.find(item => item.id === activeModal);

  return (
    <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-16 px-4 text-center relative overflow-hidden">
      {/* Elementos decorativos de fondo más sutiles */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-800 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-900 rounded-full blur-3xl"></div>
      </div>

      {/* Logos principales con animaciones */}
      <div className="flex flex-col items-center mb-4 relative z-10">
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="relative group">
            <img 
              src={logoManta} 
              alt="Logo Manta" 
              className="h-20 object-contain rounded-xl bg-white p-2 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
            <div className="absolute inset-0 bg-blue-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
          
          <div className="relative">
            <div className="h-10 w-px bg-gradient-to-b from-blue-400 to-blue-300 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              +
            </div>
          </div>

          <div className="relative group">
            <img 
              src={logoACB} 
              alt="Logo ACB" 
              className="h-20 object-contain rounded-xl bg-white p-2 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3"
            />
            <div className="absolute inset-0 bg-blue-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        </div>
        
        <SectionTitle className="text-white mb-2 text-3xl">
          Nuestra <span className="text-blue-300">Trayectoria</span>
        </SectionTitle>
        
        {/* Línea decorativa más pegada */}
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto my-2 rounded-full"></div>

        {/* Texto descriptivo MUY pegado al título */}
        <p className="text-blue-100 max-w-2xl mx-auto text-base leading-relaxed mt-1">
          Descubre el viaje colaborativo que nos ha posicionado como pioneros en embarcaciones fluviales sostenibles
        </p>
      </div>

      {/* Tarjetas de historia más compactas */}
      <div className="flex justify-center gap-4 mt-8 flex-wrap relative z-10 max-w-6xl mx-auto">
        {historyData.map((item) => (
          <HistoryCard
            key={item.id}
            title={item.title}
            year={item.year}
            logo={item.logo}
            gradient={item.gradient}
            isHovered={hoveredCard === item.id}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => openModal(item.id)}
          />
        ))}
      </div>

      {/* Línea de tiempo decorativa más sutil */}
      <div className="relative mt-12 mx-auto max-w-4xl h-0.5 bg-white/10 rounded-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={getActiveModalData()?.title || ""}
      >
        {activeModal && HistoryModalContent[activeModal]}
      </Modal>
    </section>
  );
}