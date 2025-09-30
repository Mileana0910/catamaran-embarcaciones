// src/pages/owner/EmbarcacionesPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "../../componentes/ui/Card";
import Button from "../../componentes/ui/Button";
import Badge from "../../componentes/ui/Badge";
import Modal from "../../componentes/ui/Modal";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../componentes/ui/Table";
import { 
  Package, 
  Eye, 
  Download, 
  FileText, 
  MapPin, 
  Calendar,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  X
} from "lucide-react";

// Datos de ejemplo para las embarcaciones del propietario
const ownerBoatsData = [
  {
    id: 1,
    name: "Catamarán Manta Explorer",
    type: "Turismo",
    model: "Explorer 2024",
    status: "Disponible",
    location: "Cartagena, Colombia",
    year: 2024,
    capacity: "12 pasajeros",
    dimensions: "15m x 8m",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-03-15",
    maintenanceStatus: "Al día",
    documents: [
      { id: 1, name: "Matrícula", type: "PDF", uploadDate: "2024-01-10" },
      { id: 2, name: "Seguro", type: "PDF", uploadDate: "2024-01-12" },
      { id: 3, name: "Certificado Navegabilidad", type: "PDF", uploadDate: "2024-01-08" }
    ]
  },
  {
    id: 2,
    name: "Velero Alianza Premium",
    type: "Alojamiento", 
    model: "Premium 2024",
    status: "Ocupado",
    location: "San Andrés, Colombia",
    year: 2024,
    capacity: "8 pasajeros",
    dimensions: "12m x 6m",
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-03-20",
    maintenanceStatus: "Próximo",
    documents: [
      { id: 1, name: "Matrícula", type: "PDF", uploadDate: "2024-01-15" },
      { id: 2, name: "Seguro", type: "PDF", uploadDate: "2024-01-18" },
      { id: 3, name: "Certificado Navegabilidad", type: "PDF", uploadDate: "2024-01-14" },
      { id: 4, name: "Permiso Operación", type: "PDF", uploadDate: "2024-01-16" },
      { id: 5, name: "Inspección Técnica", type: "PDF", uploadDate: "2024-01-13" }
    ]
  },
  {
    id: 3,
    name: "Lancha Rápida E-N",
    type: "E-N",
    model: "Speed 2023",
    status: "Mantenimiento",
    location: "Santa Marta, Colombia",
    year: 2023,
    capacity: "6 pasajeros",
    dimensions: "8m x 3m",
    lastMaintenance: "2024-02-01",
    nextMaintenance: "2024-02-28",
    maintenanceStatus: "En Proceso",
    documents: [
      { id: 1, name: "Matrícula", type: "PDF", uploadDate: "2024-01-05" },
      { id: 2, name: "Seguro", type: "PDF", uploadDate: "2024-01-07" }
    ]
  }
];

const BOAT_STATUS = ["Disponible", "Ocupado", "Mantenimiento", "Reparación"];

export default function EmbarcacionesPage() {
  const navigate = useNavigate();
  const [boats, setBoats] = useState(ownerBoatsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "owner") {
      navigate("/login");
    }
  }, [navigate]);

  // Filtrar embarcaciones
  const filteredBoats = boats.filter((boat) => {
    const matchesSearch = 
      boat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boat.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boat.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || boat.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      "Disponible": "bg-green-100 text-green-800 border-green-200",
      "Ocupado": "bg-blue-100 text-blue-800 border-blue-200",
      "Mantenimiento": "bg-amber-100 text-amber-800 border-amber-200",
      "Reparación": "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getMaintenanceStatusColor = (status) => {
    const colors = {
      "Al día": "bg-green-100 text-green-800 border-green-200",
      "Próximo": "bg-amber-100 text-amber-800 border-amber-200",
      "En Proceso": "bg-blue-100 text-blue-800 border-blue-200",
      "Atrasado": "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getMaintenanceIcon = (status) => {
    const icons = {
      "Al día": <CheckCircle className="h-3 w-3" />,
      "Próximo": <Clock className="h-3 w-3" />,
      "En Proceso": <Wrench className="h-3 w-3" />,
      "Atrasado": <AlertTriangle className="h-3 w-3" />
    };
    return icons[status];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const handleViewDetails = (boat) => {
    setSelectedBoat(boat);
    setIsDetailModalOpen(true);
  };

  const handleViewDocuments = (boat) => {
    setSelectedBoat(boat);
    setIsDocumentsModalOpen(true);
  };

  const handleDownloadDocument = (document) => {
    // Simular descarga de documento
    alert(`Descargando: ${document.name}`);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return (
    <OwnerLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Mis Embarcaciones</h1>
          <p className="text-gray-600">Gestiona y visualiza todas tus embarcaciones</p>
        </div>

        {/* Métricas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-blue-100">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">{boats.length}</div>
            <div className="text-sm text-gray-600">Total Embarcaciones</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {boats.filter(b => b.status === 'Disponible').length}
            </div>
            <div className="text-sm text-gray-600">Disponibles</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-amber-100">
                <Wrench className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {boats.filter(b => b.status === 'Mantenimiento').length}
            </div>
            <div className="text-sm text-gray-600">En Mantenimiento</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-purple-100">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {boats.reduce((total, boat) => total + boat.documents.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Documentos Totales</div>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    placeholder="Buscar por nombre, modelo o ubicación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-40"
              >
                <option value="all">Todos los estados</option>
                {BOAT_STATUS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              {(searchTerm || statusFilter !== "all") && (
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Limpiar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Grid de Embarcaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBoats.map((boat) => (
            <Card key={boat.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{boat.name}</CardTitle>
                    <CardDescription>{boat.type} • {boat.model}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(boat.status)}>
                    {boat.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {/* Información básica */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{boat.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Año: {boat.year}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Capacidad: {boat.capacity}
                  </div>
                  <div className="text-sm text-gray-600">
                    Dimensiones: {boat.dimensions}
                  </div>
                </div>

                {/* Estado de mantenimiento */}
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium text-gray-700">Mantenimiento</span>
                  <Badge className={`flex items-center gap-1 ${getMaintenanceStatusColor(boat.maintenanceStatus)}`}>
                    {getMaintenanceIcon(boat.maintenanceStatus)}
                    {boat.maintenanceStatus}
                  </Badge>
                </div>

                {/* Fechas de mantenimiento */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div>
                    <div className="font-medium">Último:</div>
                    <div>{formatDate(boat.lastMaintenance)}</div>
                  </div>
                  <div>
                    <div className="font-medium">Próximo:</div>
                    <div>{formatDate(boat.nextMaintenance)}</div>
                  </div>
                </div>

                {/* Documentos */}
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span className="text-sm font-medium text-blue-700">Documentos</span>
                  <span className="text-sm text-blue-600">{boat.documents.length} archivos</span>
                </div>

                {/* Acciones */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewDetails(boat)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Detalles
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewDocuments(boat)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Documentos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBoats.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <Filter className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No se encontraron embarcaciones</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all" 
                  ? "Intenta ajustar los filtros de búsqueda" 
                  : "No tienes embarcaciones registradas"
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Modal de Detalles de Embarcación */}
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={selectedBoat?.name}
          size="lg"
        >
          {selectedBoat && (
            <div className="space-y-6">
              {/* Información General */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Información General</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="font-medium">{selectedBoat.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modelo:</span>
                      <span className="font-medium">{selectedBoat.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Año:</span>
                      <span className="font-medium">{selectedBoat.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacidad:</span>
                      <span className="font-medium">{selectedBoat.capacity}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Especificaciones</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensiones:</span>
                      <span className="font-medium">{selectedBoat.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ubicación:</span>
                      <span className="font-medium">{selectedBoat.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estado:</span>
                      <Badge className={getStatusColor(selectedBoat.status)}>
                        {selectedBoat.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mantenimiento */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Historial de Mantenimiento</h4>
                <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Último Mantenimiento</div>
                    <div className="font-semibold text-gray-900">{formatDate(selectedBoat.lastMaintenance)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Próximo Mantenimiento</div>
                    <div className="font-semibold text-gray-900">{formatDate(selectedBoat.nextMaintenance)}</div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Badge className={`flex items-center gap-1 ${getMaintenanceStatusColor(selectedBoat.maintenanceStatus)}`}>
                    {getMaintenanceIcon(selectedBoat.maintenanceStatus)}
                    Estado: {selectedBoat.maintenanceStatus}
                  </Badge>
                </div>
              </div>

              {/* Documentos Resumen */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Documentos ({selectedBoat.documents.length})</h4>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Esta embarcación cuenta con {selectedBoat.documents.length} documentos registrados en el sistema.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 mt-6 pt-5 border-t border-gray-200">
            <Button 
              variant="outline" 
              onClick={() => setIsDetailModalOpen(false)}
              className="flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cerrar</span>
            </Button>
            <Button 
              onClick={() => {
                setIsDetailModalOpen(false);
                handleViewDocuments(selectedBoat);
              }}
              className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Ver Documentos</span>
            </Button>
          </div>
        </Modal>

        {/* Modal de Documentos */}
        <Modal
          isOpen={isDocumentsModalOpen}
          onClose={() => setIsDocumentsModalOpen(false)}
          title={`Documentos - ${selectedBoat?.name}`}
          size="lg"
        >
          {selectedBoat && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Todos los documentos legales y técnicos de tu embarcación.
                </p>
              </div>

              <div className="space-y-2">
                {selectedBoat.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{doc.name}</div>
                        <div className="text-sm text-gray-500">
                          Subido el {formatDate(doc.uploadDate)} • {doc.type}
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownloadDocument(doc)}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 mt-6 pt-5 border-t border-gray-200">
            <Button 
              variant="outline" 
              onClick={() => setIsDocumentsModalOpen(false)}
              className="flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cerrar</span>
            </Button>
          </div>
        </Modal>
      </div>
    </OwnerLayout>
  );
}