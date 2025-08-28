import TimelineHistoria from "../componentes/historia/TimelineHistoria"
import LogrosHistoria from "../componentes/historia/LogrosHistoria";
import RegistroDiseno from "../componentes/historia/RegistroDiseno";

export default function HistoriaPage() {
  return (
    <>
      <main>
        {/* Hero de Historia */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 text-center">
          <div className="container mx-auto px-4 max-w-4xl">
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Nuestra Historia</span>
            <h1 className="text-4xl font-bold mt-4">
              15 Años de <span className="text-cyan-300">Innovación</span>
            </h1>
            <p className="text-lg mt-4">
              Desde la integración del sector carrocero hasta el desarrollo de embarcaciones fluviales sostenibles
            </p>
          </div>
        </section>
        <TimelineHistoria />
        <RegistroDiseno />
        <LogrosHistoria />
      </main>
    </>
  );
}
