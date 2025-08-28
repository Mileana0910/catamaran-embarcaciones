import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SectionTitle from "../componentes/ui/SectionTitle";
import BoatCard from "../componentes/ui/BoatCard";
import Filters from "../componentes/ui/Filters";

// Datos de embarcaciones con categorías según las 4 líneas
const allBoats = [
  {
    id: 1,
    name: "Manta Explorer 2024",
    type: "Deportiva",
    category: "TURISMO",
    year: 2024,
    price: "Consultar precio",
    image: "/images/explorer.jpg",
    features: ["Motor 250HP", "Capacidad 8 personas", "GPS integrado", "Rutas panorámicas"],
    status: "Disponible",
    location: "Boyacá",
  },
  {
    id: 2,
    name: "Manta Fishing Pro",
    type: "Pesca",
    category: "TURISMO",
    year: 2024,
    price: "Consultar precio",
    image: "/images/fishing-pro.jpg",
    features: ["Equipos de pesca", "Capacidad 6 personas", "Refrigeración", "Equipamiento turístico"],
    status: "Disponible",
    location: "Cundinamarca",
  },
  {
    id: 3,
    name: "Manta Family",
    type: "Familiar",
    category: "ALOJAMIENTO",
    year: 2023,
    price: "Consultar precio",
    image: "/images/family.jpg",
    features: ["Asientos cómodos", "Capacidad 10 personas", "Toldo incluido", "Cabinas confortables"],
    status: "Vendida",
    location: "Antioquia",
  },
  {
    id: 4,
    name: "Manta Luxury Suite",
    type: "Lujo",
    category: "ALOJAMIENTO",
    year: 2024,
    price: "Consultar precio",
    image: "/images/luxury-suite.jpg",
    features: ["Suite privada", "Baño completo", "Cocina equipada", "Servicios completos"],
    status: "Disponible",
    location: "Cartagena",
  },
  {
    id: 5,
    name: "Manta Business",
    type: "Conferencias",
    category: "EVENTOS Y NEGOCIOS",
    year: 2024,
    price: "Consultar precio",
    image: "/images/business.jpg",
    features: ["Salas de reuniones", "Equipos audiovisuales", "Capacidad 20 personas", "Catering a bordo"],
    status: "Disponible",
    location: "Medellín",
  },
  {
    id: 6,
    name: "Manta Event",
    type: "Eventos",
    category: "EVENTOS Y NEGOCIOS",
    year: 2023,
    price: "Consultar precio",
    image: "/images/event.jpg",
    features: ["Espacio para 50 personas", "Sistema de sonido", "Iluminación profesional", "Bar integrado"],
    status: "Reservada",
    location: "Bogotá",
  },
  {
    id: 7,
    name: "Manta Custom 001",
    type: "Personalizada",
    category: "DISEÑOS EXCLUSIVOS",
    year: 2024,
    price: "Consultar precio",
    image: "/images/custom-1.jpg",
    features: ["Diseño personalizado", "Materiales premium", "Especificaciones únicas", "Fabricación exclusiva"],
    status: "Disponible",
    location: "Cali",
  },
  {
    id: 8,
    name: "Manta Eco Explorer",
    type: "Ecológica",
    category: "TURISMO",
    year: 2024,
    price: "Consultar precio",
    image: "/images/eco-explorer.jpg",
    features: ["Paneles solares", "Motor híbrido", "Cero emisiones", "Energía renovable"],
    status: "Disponible",
    location: "Amazonas",
  }
];

export default function EmbarcacionesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Leer categoría de la URL al cargar la página
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setCategoryFilter(categoryFromUrl);
    }
  }, [searchParams]);

  const filteredBoats = allBoats.filter((boat) => {
    const matchesSearch =
      boat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boat.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boat.features.some(feature => 
        feature.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesType = typeFilter === "all" || boat.type === typeFilter;
    const matchesYear = yearFilter === "all" || boat.year.toString() === yearFilter;
    const matchesStatus = statusFilter === "all" || boat.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || boat.category === categoryFilter;

    return matchesSearch && matchesType && matchesYear && matchesStatus && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setYearFilter("all");
    setStatusFilter("all");
    setCategoryFilter("all");
    // También limpiar parámetros de URL si es necesario
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle>Catálogo de Embarcaciones</SectionTitle>
          <p className="text-gray-600 text-lg">Explora nuestra completa línea de embarcaciones Manta</p>
        </div>
      </section>

      {/* Filtros por categoría (las 4 líneas) */}
      <section className="py-6 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                categoryFilter === "all" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
              }`}
            >
              Todas las Líneas
            </button>
            <button
              onClick={() => setCategoryFilter("TURISMO")}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                categoryFilter === "TURISMO" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
              }`}
            >
              🛥️ Turismo
            </button>
            <button
              onClick={() => setCategoryFilter("ALOJAMIENTO")}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                categoryFilter === "ALOJAMIENTO" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
              }`}
            >
              🏠 Alojamiento
            </button>
            <button
              onClick={() => setCategoryFilter("EVENTOS Y NEGOCIOS")}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                categoryFilter === "EVENTOS Y NEGOCIOS" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
              }`}
            >
              🎤 Eventos y Negocios
            </button>
            <button
              onClick={() => setCategoryFilter("DISEÑOS EXCLUSIVOS")}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                categoryFilter === "DISEÑOS EXCLUSIVOS" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
              }`}
            >
              🎨 Diseños Exclusivos
            </button>
          </div>
        </div>
      </section>

      {/* Filtros avanzados */}
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onClearFilters={clearFilters}
      />

      {/* Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-gray-600">
              Mostrando {filteredBoats.length} de {allBoats.length} embarcaciones
              {categoryFilter !== "all" && ` en la línea ${categoryFilter}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBoats.map((boat) => (
              <BoatCard key={boat.id} boat={boat} />
            ))}
          </div>

          {filteredBoats.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No se encontraron embarcaciones que coincidan con los filtros seleccionados.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}