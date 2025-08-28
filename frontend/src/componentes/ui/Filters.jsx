import { Search } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function Filters({ 
  searchTerm, 
  setSearchTerm, 
  typeFilter, 
  setTypeFilter, 
  yearFilter, 
  setYearFilter, 
  statusFilter, 
  setStatusFilter,
  onClearFilters 
}) {
  return (
    <div className="py-8 border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar embarcaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los tipos</option>
              <option value="TURISMO">Turismo</option>
              <option value="ALOJAMIENTO">Alojamiento</option>
              <option value="EVENTOS Y NEGOCIOS">Eventos y Negocios</option>
              <option value="DISEÑOS EXCLUSIVOS">Diseños Exclusivos</option>
              <option value="Deportiva">Deportiva</option>
              <option value="Pesca">Pesca</option>
              <option value="Familiar">Familiar</option>
              <option value="Trabajo">Trabajo</option>
              <option value="Lujo">Lujo</option>
            </select>

            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los años</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los estados</option>
              <option value="Disponible">Disponible</option>
              <option value="Vendida">Vendida</option>
              <option value="Reservada">Reservada</option>
            </select>
          </div>
        </div>
        
        {(searchTerm !== "" || typeFilter !== "all" || yearFilter !== "all" || statusFilter !== "all") && (
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={onClearFilters}
              className="bg-transparent"
            >
              Limpiar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}