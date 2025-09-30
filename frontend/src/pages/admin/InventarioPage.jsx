// src/pages/admin/InventarioPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "../../componentes/ui/Card";
import Button from "../../componentes/ui/Button";
import Input from "../../componentes/ui/Input";
import Label from "../../componentes/ui/Label";
import Textarea from "../../componentes/ui/Textarea";
import Select from "../../componentes/ui/Select";
import Badge from "../../componentes/ui/Badge";
import Modal from "../../componentes/ui/Modal";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../componentes/ui/Table";
import { Search, Plus, Edit, Trash2, Eye, Download, Package, X } from "lucide-react";

// Datos iniciales
const initialBoats = [
  {
    id: 1,
    name: "Catamarán Manta Explorer",
    type: "Turismo",
    model: "Explorer 2024",
    location: "Cartagena",
    owner_name: null,
    price: "850000000",
    status: "Disponible",
    year: 2024
  },
  {
    id: 2,
    name: "Velero Alianza Premium",
    type: "Alojamiento",
    model: "Premium 2024",
    location: "San Andrés",
    owner_name: "Carlos Rodríguez",
    price: "1200000000",
    status: "Ocupado",
    year: 2024
  },
  {
    id: 3,
    name: "Lancha Rápida E-N",
    type: "E-N",
    model: "Speed 2023",
    location: "Santa Marta",
    owner_name: "María González",
    price: "450000000",
    status: "Mantenimiento",
    year: 2023
  }
];

const BOAT_TYPES = ["Turismo", "Alojamiento", "E-N", "Exclusivos"];
const BOAT_STATUS = ["Disponible", "Ocupado", "Mantenimiento", "Reparación"];

export default function InventarioPage() {
  const navigate = useNavigate();
  const [boats, setBoats] = useState(initialBoats);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBoat, setEditingBoat] = useState(null);
  
  const [newBoat, setNewBoat] = useState({
    name: "",
    type: "Turismo",
    model: "",
    location: "",
    price: "",
    status: "Disponible",
    year: new Date().getFullYear()
  });

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  // Filtrar embarcaciones
  const filteredBoats = boats.filter((boat) => {
    const matchesSearch = boat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         boat.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || boat.type === typeFilter;
    const matchesStatus = statusFilter === "all" || boat.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddBoat = () => {
    const boat = {
      id: Math.max(...boats.map(b => b.id)) + 1,
      ...newBoat,
      owner_name: null
    };
    setBoats([...boats, boat]);
    setNewBoat({
      name: "",
      type: "Turismo",
      model: "",
      location: "",
      price: "",
      status: "Disponible",
      year: new Date().getFullYear()
    });
    setIsAddModalOpen(false);
  };

  const handleEditBoat = (boat) => {
    setEditingBoat({...boat});
  };

  const handleUpdateBoat = () => {
    setBoats(boats.map((boat) => (boat.id === editingBoat.id ? editingBoat : boat)));
    setEditingBoat(null);
  };

  const handleDeleteBoat = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta embarcación?")) {
      setBoats(boats.filter((boat) => boat.id !== id));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      "Disponible": "bg-green-100 text-green-800 border-green-200",
      "Ocupado": "bg-blue-100 text-blue-800 border-blue-200",
      "Mantenimiento": "bg-amber-100 text-amber-800 border-amber-200",
      "Reparación": "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header estilo dashboard */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Gestión de Inventario</h1>
          <p className="text-gray-600">Administra las embarcaciones del catálogo</p>
        </div>

        {/* Métricas principales estilo dashboard */}
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
                <Package className="w-4 h-4 text-green-600" />
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
                <Package className="w-4 h-4 text-amber-600" />
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
                <Package className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {boats.filter(b => b.owner_name !== null).length}
            </div>
            <div className="text-sm text-gray-600">Con Propietario</div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="flex-1 w-full">
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
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full sm:w-40"
              >
                <option value="all">Todos los tipos</option>
                {BOAT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-40"
              >
                <option value="all">Todos los estados</option>
                {BOAT_STATUS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Select>
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2.5 rounded-lg font-medium text-white transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Nueva Embarcación</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de inventario */}
        <Card>
          <CardHeader>
            <CardTitle>Inventario de Embarcaciones</CardTitle>
            <CardDescription>
              {filteredBoats.length} de {boats.length} embarcaciones encontradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Propietario</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBoats.map((boat) => (
                    <TableRow key={boat.id}>
                      <TableCell className="font-medium">{boat.name}</TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{boat.type}</span>
                      </TableCell>
                      <TableCell>{boat.model}</TableCell>
                      <TableCell>{boat.location}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(boat.status)}>
                          {boat.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{formatPrice(boat.price)}</TableCell>
                      <TableCell>
                        {boat.owner_name || (
                          <span className="text-gray-400">Sin asignar</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditBoat(boat)}
                            className="hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-200 transition-all duration-200"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteBoat(boat.id)}
                            className="hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 transition-all duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Modal agregar embarcación - REORGANIZADO */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Agregar Nueva Embarcación"
          size="lg"
        >
          <div className="space-y-5">
            {/* Primera fila - Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 block">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={newBoat.name}
                  onChange={(e) => setNewBoat({ ...newBoat, name: e.target.value })}
                  placeholder="Catamarán Manta Explorer"
                  className="w-full h-10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium text-gray-700 block">
                  Tipo
                </Label>
                <Select
                  value={newBoat.type}
                  onChange={(e) => setNewBoat({ ...newBoat, type: e.target.value })}
                  className="w-full h-10"
                >
                  {BOAT_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model" className="text-sm font-medium text-gray-700 block">
                  Modelo
                </Label>
                <Input
                  id="model"
                  value={newBoat.model}
                  onChange={(e) => setNewBoat({ ...newBoat, model: e.target.value })}
                  placeholder="Explorer 2024"
                  className="w-full h-10"
                />
              </div>
            </div>

            {/* Segunda fila - Especificaciones */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-medium text-gray-700 block">
                  Año
                </Label>
                <Input
                  id="year"
                  type="number"
                  value={newBoat.year}
                  onChange={(e) => setNewBoat({ ...newBoat, year: parseInt(e.target.value) })}
                  placeholder="2024"
                  className="w-full h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700 block">
                  Ubicación
                </Label>
                <Input
                  id="location"
                  value={newBoat.location}
                  onChange={(e) => setNewBoat({ ...newBoat, location: e.target.value })}
                  placeholder="Cartagena"
                  className="w-full h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-gray-700 block">
                  Precio (COP)
                </Label>
                <Input
                  id="price"
                  value={newBoat.price}
                  onChange={(e) => setNewBoat({ ...newBoat, price: e.target.value })}
                  placeholder="850000000"
                  className="w-full h-10"
                />
              </div>
            </div>

            {/* Tercera fila - Estado */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-gray-700 block">
                Estado
              </Label>
              <Select
                value={newBoat.status}
                onChange={(e) => setNewBoat({ ...newBoat, status: e.target.value })}
                className="w-full h-10"
              >
                {BOAT_STATUS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6 pt-5 border-t border-gray-200">
            <Button 
              variant="outline" 
              onClick={() => setIsAddModalOpen(false)}
              className="px-5 py-2.5 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cancelar</span>
            </Button>
            <Button 
              onClick={handleAddBoat}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-5 py-2.5 rounded-lg font-medium text-white transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Agregar Embarcación</span>
            </Button>
          </div>
        </Modal>

        {/* Modal editar embarcación - REORGANIZADO */}
        <Modal
          isOpen={!!editingBoat}
          onClose={() => setEditingBoat(null)}
          title="Editar Embarcación"
          size="lg"
        >
          {editingBoat && (
            <>
              <div className="space-y-5">
                {/* Primera fila - Información básica */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name" className="text-sm font-medium text-gray-700 block">
                      Nombre
                    </Label>
                    <Input
                      id="edit-name"
                      value={editingBoat.name}
                      onChange={(e) => setEditingBoat({ ...editingBoat, name: e.target.value })}
                      className="w-full h-10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-type" className="text-sm font-medium text-gray-700 block">
                      Tipo
                    </Label>
                    <Select
                      value={editingBoat.type}
                      onChange={(e) => setEditingBoat({ ...editingBoat, type: e.target.value })}
                      className="w-full h-10"
                    >
                      {BOAT_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-model" className="text-sm font-medium text-gray-700 block">
                      Modelo
                    </Label>
                    <Input
                      id="edit-model"
                      value={editingBoat.model}
                      onChange={(e) => setEditingBoat({ ...editingBoat, model: e.target.value })}
                      className="w-full h-10"
                    />
                  </div>
                </div>

                {/* Segunda fila - Especificaciones */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-year" className="text-sm font-medium text-gray-700 block">
                      Año
                    </Label>
                    <Input
                      id="edit-year"
                      type="number"
                      value={editingBoat.year}
                      onChange={(e) => setEditingBoat({ ...editingBoat, year: parseInt(e.target.value) })}
                      className="w-full h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-location" className="text-sm font-medium text-gray-700 block">
                      Ubicación
                    </Label>
                    <Input
                      id="edit-location"
                      value={editingBoat.location}
                      onChange={(e) => setEditingBoat({ ...editingBoat, location: e.target.value })}
                      className="w-full h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-price" className="text-sm font-medium text-gray-700 block">
                      Precio (COP)
                    </Label>
                    <Input
                      id="edit-price"
                      value={editingBoat.price}
                      onChange={(e) => setEditingBoat({ ...editingBoat, price: e.target.value })}
                      className="w-full h-10"
                    />
                  </div>
                </div>

                {/* Tercera fila - Estado */}
                <div className="space-y-2">
                  <Label htmlFor="edit-status" className="text-sm font-medium text-gray-700 block">
                    Estado
                  </Label>
                  <Select
                    value={editingBoat.status}
                    onChange={(e) => setEditingBoat({ ...editingBoat, status: e.target.value })}
                    className="w-full h-10"
                  >
                    {BOAT_STATUS.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-5 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingBoat(null)}
                  className="px-5 py-2.5 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200 flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancelar</span>
                </Button>
                <Button 
                  onClick={handleUpdateBoat}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-5 py-2.5 rounded-lg font-medium text-white transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Guardar Cambios</span>
                </Button>
              </div>
            </>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
}