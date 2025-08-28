import { BookOpen } from "lucide-react";

export default function HeroHistoria() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-24 overflow-hidden">
      {/* Patrón decorativo */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/double-bubble-outline.png')]"></div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        {/* Icono */}
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-400 p-4 rounded-full shadow-lg">
            <BookOpen className="h-8 w-8 text-blue-900" />
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
          Nuestra Historia
        </h1>

        {/* Descripción */}
        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
          Un recorrido que refleja innovación, compromiso y desarrollo. Desde
          nuestros inicios hasta la actualidad, hemos construido un camino
          basado en el esfuerzo conjunto y la pasión por transformar el sector.
        </p>

        {/* Botón opcional */}
        <a
          href="#timeline"
          className="inline-block bg-yellow-400 text-blue-900 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition-transform transform hover:scale-105"
        >
          Ver línea de tiempo
        </a>
      </div>
    </section>
  );
}
