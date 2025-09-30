// src/pages/admin/MantenimientoPage.jsx
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
import { Search, Plus, Edit, Trash2, Eye, Filter, X, Calendar, Clock, AlertTriangle, CheckCircle, Wrench } from "lucide-react";

// Datos iniciales basados en tu schema de DB
const initialMaintenances = [
  {
    id: 1,
    boatName: "Catamarán Manta Explorer",
    boatId: 1,
    type: "Preventivo",
    status: "Pendiente",
    priority: "Alta",
    dateScheduled: "2024-02-15",
    datePerformed: "",
    description: "Mantenimiento general de motor y sistema eléctrico",
    assignedTechnician: "Carlos López",
    estimatedCost: "850000",
    actualCost: "",
    notes: ""
  },
  {
    id: 2,
    boatName: "Velero Alianza Premium",
    boatId: 2,
    type: "Correctivo",
    status: "En Proceso",
    priority: "Media",
    dateScheduled: "2024-02-10",
    datePerformed: "",
    description: "Reparación de sistema de navegación",
    assignedTechnician: "Ana Martínez",
    estimatedCost: "1200000",
    actualCost: "",
    notes: "Esperando repuestos"
  },
  {
    id: 3,
    boatName: "Lancha Rápida E-N",
    boatId: 3,
    type: "Preventivo",
    status: "Completado",
    priority: "Baja",
    dateScheduled: "2024-01-20",
    datePerformed: "2024-01-22",
    description: "Cambio de aceite y filtros",
    assignedTechnician: "Pedro González",
    estimatedCost: "450000",
    actualCost: "420000",
    notes: "Mantenimiento completado satisfactoriamente"
  }
];

const MAINTENANCE_TYPES = ["Preventivo", "Correctivo", "Predictivo", "Emergencia"];
const MAINTENANCE_STATUS = ["Pendiente", "En Proceso", "Completado", "Cancelado"];
const PRIORITY_LEVELS = ["Baja", "Media", "Alta", "Crítica"];

export default function MantenimientoPage() {
  const navigate = useNavigate();
  const [maintenances, setMaintenances] = useState(initialMaintenances);
  const [boats] = useState([
    { id: 1, name: "Catamarán Manta Explorer" },
    { id: 2, name: "Velero Alianza Premium" },
    { id: 3, name: "Lancha Rápida E-N" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMaintenance, setEditingMaintenance] = useState(null);
  
  const [newMaintenance, setNewMaintenance] = useState({
    boatId: "",
    type: "Preventivo",
    status: "Pendiente",
    priority: "Media",
    dateScheduled: new Date().toISOString().split('T')[0],
    datePerformed: "",
    description: "",
    assignedTechnician: "",
    estimatedCost: "",
    actualCost: "",
    notes: ""
  });

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  // Filtrar mantenimientos
  const filteredMaintenances = maintenances.filter((maintenance) => {
    const matchesSearch = 
      maintenance.boatName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.assignedTechnician.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || maintenance.type === typeFilter;
    const matchesStatus = statusFilter === "all" || maintenance.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || maintenance.priority === priorityFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const handleAddMaintenance = () => {
    if (!newMaintenance.boatId || !newMaintenance.description) {
      alert("Por favor complete los campos obligatorios: Embarcación y Descripción");
      return;
    }

    const selectedBoat = boats.find(boat => boat.id === parseInt(newMaintenance.boatId));
    const maintenance = {
      id: Math.max(...maintenances.map(m => m.id)) + 1,
      ...newMaintenance,
      boatName: selectedBoat?.name || "Embarcación no encontrada",
      boatId: parseInt(newMaintenance.boatId)
    };
    
    setMaintenances([...maintenances, maintenance]);
    setNewMaintenance({
      boatId: "",
      type: "Preventivo",
      status: "Pendiente",
      priority: "Media",
      dateScheduled: new Date().toISOString().split('T')[0],
      datePerformed: "",
      description: "",
      assignedTechnician: "",
      estimatedCost: "",
      actualCost: "",
      notes: ""
    });
    setIsAddModalOpen(false);
  };

  const handleEditMaintenance = (maintenance) => {
    setEditingMaintenance({...maintenance});
  };

  const handleUpdateMaintenance = () => {
    if (!editingMaintenance.boatId || !editingMaintenance.description) {
      alert("Por favor complete los campos obligatorios: Embarcación y Descripción");
      return;
    }

    setMaintenances(maintenances.map((maintenance) => 
      maintenance.id === editingMaintenance.id ? editingMaintenance : maintenance
    ));
    setEditingMaintenance(null);
  };

  const handleDeleteMaintenance = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro de mantenimiento?")) {
      setMaintenances(maintenances.filter((maintenance) => maintenance.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setMaintenances(maintenances.map(maintenance => 
      maintenance.id === id ? {
        ...maintenance, 
        status: newStatus,
        datePerformed: newStatus === "Completado" ? new Date().toISOString().split('T')[0] : maintenance.datePerformed
      } : maintenance
    ));
  };

  const getStatusColor = (status) => {
    const colors = {
      "Pendiente": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "En Proceso": "bg-blue-100 text-blue-800 border-blue-200",
      "Completado": "bg-green-100 text-green-800 border-green-200",
      "Cancelado": "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      "Baja": "bg-gray-100 text-gray-800 border-gray-200",
      "Media": "bg-blue-100 text-blue-800 border-blue-200",
      "Alta": "bg-orange-100 text-orange-800 border-orange-200",
      "Crítica": "bg-red-100 text-red-800 border-red-200"
    };
    return colors[priority] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusIcon = (status) => {
    const icons = {
      "Pendiente": <Clock className="h-3 w-3" />,
      "En Proceso": <Wrench className="h-3 w-3" />,
      "Completado": <CheckCircle className="h-3 w-3" />,
      "Cancelado": <X className="h-3 w-3" />
    };
    return icons[status];
  };

  const getPriorityIcon = (priority) => {
    return priority === "Alta" || priority === "Crítica" ? <AlertTriangle className="h-3 w-3" /> : null;
  };

  const formatCurrency = (amount) => {
    if (!amount) return "-";
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  // Estadísticas para el dashboard
  const stats = {
    total: maintenances.length,
    pending: maintenances.filter(m => m.status === "Pendiente").length,
    inProgress: maintenances.filter(m => m.status === "En Proceso").length,
    completed: maintenances.filter(m => m.status === "Completado").length
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Gestión de Mantenimientos</h1>
          <p className="text-gray-600">Programa y controla los mantenimientos de las embarcaciones</p>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-blue-100">
                <Wrench className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Mantenimientos</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-yellow-100">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pendientes</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-blue-100">
                <Wrench className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">En Proceso</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completados</div>
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
                    placeholder="Buscar por embarcación, descripción o técnico..."
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
                {MAINTENANCE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>

              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-40"
              >
                <option value="all">Todos los estados</option>
                {MAINTENANCE_STATUS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Select>

              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full sm:w-40"
              >
                <option value="all">Todas las prioridades</option>
                {PRIORITY_LEVELS.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </Select>

              {(searchTerm || typeFilter !== "all" || statusFilter !== "all" || priorityFilter !== "all") && (
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Limpiar
                </Button>
              )}

              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2.5 rounded-lg font-medium text-white transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Nuevo Mantenimiento</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de mantenimientos */}
        <Card>
          <CardHeader>
            <CardTitle>Registros de Mantenimiento</CardTitle>
            <CardDescription>
              {filteredMaintenances.length} de {maintenances.length} mantenimientos encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Embarcación</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Fecha Programada</TableHead>
                    <TableHead>Fecha Realización</TableHead>
                    <TableHead>Técnico</TableHead>
                    <TableHead>Costo Estimado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaintenances.map((maintenance) => (
                    <TableRow key={maintenance.id}>
                      <TableCell className="font-medium">{maintenance.boatName}</TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{maintenance.type}</span>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm line-clamp-2" title={maintenance.description}>
                          {maintenance.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge className={`flex items-center gap-1 ${getStatusColor(maintenance.status)}`}>
                          {getStatusIcon(maintenance.status)}
                          {maintenance.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`flex items-center gap-1 ${getPriorityColor(maintenance.priority)}`}>
                          {getPriorityIcon(maintenance.priority)}
                          {maintenance.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(maintenance.dateScheduled)}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(maintenance.datePerformed)}
                      </TableCell>
                      <TableCell>
                        {maintenance.assignedTechnician || (
                          <span className="text-gray-400 text-sm">Sin asignar</span>
                        )}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(maintenance.estimatedCost)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditMaintenance(maintenance)}
                            className="hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-200 transition-all duration-200"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteMaintenance(maintenance.id)}
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
            
            {filteredMaintenances.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No se encontraron mantenimientos</h3>
                <p className="text-gray-500">
                  {searchTerm || typeFilter !== "all" || statusFilter !== "all" || priorityFilter !== "all"
                    ? "Intenta ajustar los filtros de búsqueda" 
                    : "No hay mantenimientos registrados en el sistema"
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal Agregar Mantenimiento */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Programar Nuevo Mantenimiento"
          size="lg"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="boatId" className="text-sm font-medium text-gray-700 block">
                  Embarcación *
                </Label>
                <Select
                  id="boatId"
                  value={newMaintenance.boatId}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, boatId: e.target.value })}
                  className="w-full h-10"
                >
                  <option value="">Seleccionar embarcación</option>
                  {boats.map(boat => (
                    <option key={boat.id} value={boat.id}>{boat.name}</option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium text-gray-700 block">
                  Tipo de Mantenimiento
                </Label>
                <Select
                  id="type"
                  value={newMaintenance.type}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, type: e.target.value })}
                  className="w-full h-10"
                >
                  {MAINTENANCE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-medium text-gray-700 block">
                  Prioridad
                </Label>
                <Select
                  id="priority"
                  value={newMaintenance.priority}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, priority: e.target.value })}
                  className="w-full h-10"
                >
                  {PRIORITY_LEVELS.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateScheduled" className="text-sm font-medium text-gray-700 block">
                  Fecha Programada
                </Label>
                <Input
                  id="dateScheduled"
                  type="date"
                  value={newMaintenance.dateScheduled}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, dateScheduled: e.target.value })}
                  className="w-full h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTechnician" className="text-sm font-medium text-gray-700 block">
                  Técnico Asignado
                </Label>
                <Input
                  id="assignedTechnician"
                  value={newMaintenance.assignedTechnician}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, assignedTechnician: e.target.value })}
                  placeholder="Nombre del técnico"
                  className="w-full h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedCost" className="text-sm font-medium text-gray-700 block">
                  Costo Estimado (COP)
                </Label>
                <Input
                  id="estimatedCost"
                  type="number"
                  value={newMaintenance.estimatedCost}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, estimatedCost: e.target.value })}
                  placeholder="0"
                  className="w-full h-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700 block">
                Descripción del Mantenimiento *
              </Label>
              <Textarea
                id="description"
                value={newMaintenance.description}
                onChange={(e) => setNewMaintenance({ ...newMaintenance, description: e.target.value })}
                placeholder="Describa los trabajos de mantenimiento a realizar..."
                rows={3}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700 block">
                Notas Adicionales
              </Label>
              <Textarea
                id="notes"
                value={newMaintenance.notes}
                onChange={(e) => setNewMaintenance({ ...newMaintenance, notes: e.target.value })}
                placeholder="Observaciones o información adicional..."
                rows={2}
                className="w-full"
              />
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
              onClick={handleAddMaintenance}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-5 py-2.5 rounded-lg font-medium text-white transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Programar Mantenimiento</span>
            </Button>
          </div>
        </Modal>

        {/* Modal Editar Mantenimiento */}
        <Modal
          isOpen={!!editingMaintenance}
          onClose={() => setEditingMaintenance(null)}
          title="Editar Mantenimiento"
          size="lg"
        >
          {editingMaintenance && (
            <>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-boatId" className="text-sm font-medium text-gray-700 block">
                      Embarcación *
                    </Label>
                    <Select
                      id="edit-boatId"
                      value={editingMaintenance.boatId}
                      onChange={(e) => setEditingMaintenance({ ...editingMaintenance, boatId: parseInt(e.target.value) })}
                      className="w-full h-10"
                    >
                      {boats.map(boat => (
                        <option key={boat.id} value={boat.id}>{boat.name}</option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-type" className="text-sm font-medium text-gray-700 block">
                      Tipo de Mantenimiento
                    </Label>
                    <Select
                      id="edit-type"
                      value={editingMaintenance.type}
                      onChange={(e) => setEditingMaintenance({ ...editingMaintenance, type: e.target.value })}
                      className="w-full h-10"
                    >
                      {MAINTENANCE_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-status" className="text-sm font-medium text-gray-700 block">
                      Estado
                    </Label>
                    <Select
                      id="edit-status"
                      value={editingMaintenance.status}
                      onChange={(e) => setEditingMaintenance({ ...editingMaintenance, status: e.target.value })}
                      className="w-full h-10"
                    >
                      {MAINTENANCE_STATUS.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-priority" className="text-sm font-medium text-gray-700 block">
                      Prioridad
                    </Label>
                    <Select
                      id="edit-priority"
                      value={editingMaintenance.priority}
                      onChange={(e) => setEditingMaintenance({ ...editingMaintenance, priority: e.target.value })}
                      className="w-full h-10"
                    >
                      {PRIORITY_LEVELS.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-dateScheduled" className="text-sm font-medium text-gray-700 block">
                      Fecha Programada
                    </Label>
                    <Input
                      id="edit-dateScheduled"
                      type="date"
                      value={editingMaintenance.dateScheduled}
                      onChange={(e) => setEditingMaintenance({ ...editingMaintenance, dateScheduled: e.target.value })}
                      className="w-full h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-datePerformed" className="text-sm font-medium text-gray-700 block">
                      Fecha de Realización
                    </Label>
                    <Input
                      id="edit-datePerformed"
                      type="date"
                      value={editingMaintenance.datePerformed}
                      onChange={(e) => setEditingMaintenance({ ...editingMaintenance, datePerformed: e.target.value })}
                      className="w-full h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-assignedTechnician" className="text-sm font-medium text-gray-700 block">
                      Técnico Asignado
                    </Label>
                    <Input
                      id="edit-assignedTechnician"
                      value={editingMaintenance.assignedTechnician}
                      onChange={(e) => setEditingMaintenance({ ...editingMaintenance, assignedTechnician: e.target.value })}
                      className="w-full h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-estimatedCost" className="text-sm font-medium text-gray-700 block">
                      Costo Estimado (COP)
                    </Label>
                    <Input
                      id="edit-estimatedCost"
                      type="number"
                      value={editingMaintenance.estimatedCost}
                      onChange={(e) => setEditingMaintenance({ ...editingMaintenance, estimatedCost: e.target.value })}
                      className="w-full h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-actualCost" className="text-sm font-medium text-gray-700 block">
                      Costo Real (COP)
                    </Label>
                    <Input
                      id="edit-actualCost"
                      type="number"
                      value={editingMaintenance.actualCost}
                      onChange={(e) => setEditingMaintenance({ ...editingMaintenance, actualCost: e.target.value })}
                      className="w-full h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description" className="text-sm font-medium text-gray-700 block">
                    Descripción del Mantenimiento *
                  </Label>
                  <Textarea
                    id="edit-description"
                    value={editingMaintenance.description}
                    onChange={(e) => setEditingMaintenance({ ...editingMaintenance, description: e.target.value })}
                    rows={3}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-notes" className="text-sm font-medium text-gray-700 block">
                    Notas Adicionales
                  </Label>
                  <Textarea
                    id="edit-notes"
                    value={editingMaintenance.notes}
                    onChange={(e) => setEditingMaintenance({ ...editingMaintenance, notes: e.target.value })}
                    rows={2}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-5 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingMaintenance(null)}
                  className="px-5 py-2.5 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200 flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancelar</span>
                </Button>
                <Button 
                  onClick={handleUpdateMaintenance}
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