export default function HeroHistoria() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 text-white py-16 px-4 text-center relative">
      {/* Título principal */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Nuestra <span className="text-blue-400">Historia</span>
      </h1>

      {/* Línea decorativa */}
      <div className="w-16 h-1 bg-blue-500 mx-auto my-4 rounded-full"></div>

      {/* Descripción */}
      <p className="text-base md:text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
        15 Años de Innovación. Desde la integración del sector carrocero hasta el 
        desarrollo de embarcaciones fluviales sostenibles.
      </p>
    </section>
  );
}