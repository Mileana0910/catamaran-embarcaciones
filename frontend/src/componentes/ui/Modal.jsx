export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con gradiente azul */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">{title}</h3>
            <button 
              onClick={onClose}
              className="text-white hover:text-blue-200 text-2xl font-light transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
            >
              ×
            </button>
          </div>
        </div>
        
        {/* Content con scroll personalizado */}
        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scroll">
          <div className="text-gray-800 leading-relaxed space-y-6">
            {children}
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}