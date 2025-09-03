import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Eco1 from "../../assets/images/Eco1.jpg";
import Eco3 from "../../assets/images/Eco3.jpg";    
import Eco4 from "../../assets/images/Eco4.jpg";
import Eco5 from "../../assets/images/Eco5.jpg";
const ecoModels = [
  {
    id: 1,
    image: Eco1,
  },
  {
    id: 3,
    image: Eco3,
  },
  {
    id: 4,
    image: Eco4,
  },
  {
    id: 5,
    image: Eco5,
  },
];

export default function EcoModelsGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === ecoModels.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? ecoModels.length - 1 : prevIndex - 1
    );
  };

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Carrusel principal */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
        <div className="relative h-96 md:h-[500px]">
          {ecoModels.map((model, index) => (
            <div
              key={model.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => openModal(currentIndex)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{model.name}</h3>
                <p className="text-sm">{model.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controles de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Modelo anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Siguiente modelo"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {ecoModels.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Ir al modelo ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Miniaturas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {ecoModels.map((model, index) => (
          <div
            key={model.id}
            className={`relative h-24 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
              index === currentIndex ? 'ring-2 ring-emerald-500' : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={model.image}
              alt={model.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Modal para imagen ampliada */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-emerald-300 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={ecoModels[selectedImageIndex].image}
              alt={ecoModels[selectedImageIndex].name}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}