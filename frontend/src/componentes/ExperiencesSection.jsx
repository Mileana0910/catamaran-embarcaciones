import { useState, useEffect } from "react";
import Card from "./ui/Card";
import SectionTitle from "./ui/SectionTitle";

// Importar imágenes reales
import LagoAquitania from "../assets/images/LagoAquitania.jpg";
import LagunaTota from "../assets/images/LagunaTota.jpg";
import EmbarcacionLujo from "../assets/images/Eco4.jpg";
import AtardecerNavegando from "../assets/images/Eco2.jpg";

const experiences = [
  {
    id: 1,
    category: "Lagos",
    image: LagoAquitania,
    location: "Lago Calima, Valle del Cauca"
  },
  {
    id: 2,
    category: "Lagunas",
    image: LagunaTota,
    location: "Laguna de Guatavita, Cundinamarca"
  },
  {
    id: 3,
    category: "Embarcaciones",
    image: EmbarcacionLujo,
    location: "Cartagena, Bolívar"
  },
  {
    id: 4,
    category: "Embarcaciones",
    image: AtardecerNavegando,
    location: "Santa Marta, Magdalena"
  },
  {
    id: 5,
    category: "Embarcaciones",
    image: EmbarcacionLujo,
    location: "San Andrés, Caribe"
  },
  {
    id: 6,
    category: "Lagos",
    image: LagoAquitania,
    location: "Lago de Tota, Boyacá"
  }
];

export default function ExperiencesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Calculate visible slides
  const getVisibleSlides = () => {
    const slides = [];
    const totalSlides = experiences.length;
    
    // Always show 3 slides: current, previous, and next
    for (let i = -1; i <= 1; i++) {
      const slideIndex = (currentIndex + i + totalSlides) % totalSlides;
      slides.push({
        ...experiences[slideIndex],
        position: i,
        isActive: i === 0
      });
    }
    
    return slides;
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionTitle>Galería de Experiencias</SectionTitle>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Un vistazo visual a nuestros destinos y embarcaciones
        </p>

        {/* Carrusel Container */}
        <div 
          className="relative h-96 mb-8"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Slides */}
          <div className="relative h-full flex items-center justify-center">
            {getVisibleSlides().map((slide) => (
              <div
                key={slide.id}
                className={`absolute transition-all duration-500 ease-in-out transform ${
                  slide.position === 0
                    ? "scale-100 opacity-100 z-20"
                    : slide.position === -1
                    ? "scale-90 opacity-70 -translate-x-32 z-10"
                    : "scale-90 opacity-70 translate-x-32 z-10"
                }`}
                style={{
                  transform: `translateX(${slide.position * 120}%) scale(${
                    slide.position === 0 ? 1 : 0.9
                  })`
                }}
              >
                <Card className="w-80 h-64 overflow-hidden group cursor-pointer">
                  <div className="relative w-full h-full">
                    <img
                      src={slide.image}
                      alt={slide.location}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay con información al hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                      <div className="w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                            {slide.category}
                          </span>
                          <p className="text-sm text-gray-700 mt-1">{slide.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Badge de categoría */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-semibold text-blue-700">
                        {slide.category}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Mini Gallery Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-12 max-w-2xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              onClick={() => goToSlide(index)}
              className={`aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${
                index === currentIndex ? "ring-2 ring-blue-600 scale-105" : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={exp.image}
                alt={exp.location}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}