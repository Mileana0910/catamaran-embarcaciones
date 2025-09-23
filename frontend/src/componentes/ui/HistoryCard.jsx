import { ChevronRight } from "lucide-react";

export default function HistoryCard({ 
  title, 
  year, 
  logo, 
  gradient, 
  isHovered, 
  onMouseEnter, 
  onMouseLeave, 
  onClick 
}) {
  return (
    <button 
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center w-52 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/40 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg hover:shadow-xl relative min-h-[140px] transform hover:scale-105 ${
        isHovered ? 'scale-105 border-white/40 bg-white/15' : ''
      }`}
    >
      {/* Año más compacto */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
        <div className={`bg-gradient-to-r ${gradient} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border border-white/20`}>
          {year}
        </div>
      </div>

      {/* Título centrado con más espacio */}
      <span className="text-white text-center leading-tight font-semibold group-hover:text-blue-100 transition-colors line-clamp-3 mt-6 flex-1 flex items-center justify-center text-sm">
        {title}
      </span>
      
      {/* Logo de la entidad más prominente */}
      {logo && (
        <div className="mt-auto pt-3 w-full">
          <img 
            src={logo} 
            alt="Logo entidad" 
            className="h-8 mx-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      )}
      
      {/* Indicador sutil */}
      <div className={`mt-2 text-blue-200 text-xs transition-all duration-300 flex items-center ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <span>Ver detalles</span>
        <ChevronRight size={12} className="ml-1" />
      </div>
    </button>
  );
}