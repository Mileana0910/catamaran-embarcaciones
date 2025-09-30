// src/pages/admin/PropietariosPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "../../componentes/ui/Card";
import Button from "../../componentes/ui/Button";
import Input from "../../componentes/ui/Input";
import Label from "../../componentes/ui/Label";
import Select from "../../componentes/ui/Select";
import Badge from "../../componentes/ui/Badge";
import Modal from "../../componentes/ui/Modal";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../componentes/ui/Table";
import { Search, Plus, Edit, Trash2, Eye, Mail, Phone, Key, Copy, Filter, X, User, Calendar } from "lucide-react";

// Datos iniciales mejorados para coincidir con tu DB schema
const initialOwners = [
  {
    id: 1,
    fullName: "Juan Pérez",
    email: "juan.perez@email.com",
    phoneNumber: "+57 300 123 4567",
    idNumber: "12345678",
    status: "Activo",
    registrationDate: "2023-06-15",
    boats: ["Catamarán Manta Explorer"],
    uniqueId: "PROP-001-2023",
    temporaryPassword: "Manta2023!",
  },
  {
    id: 2,
    fullName: "María González",
    email: "maria.gonzalez@email.com",
    phoneNumber: "+57 301 987 6543",
    idNumber: "87654321",
    status: "Activo",
    registrationDate: "2024-01-10",
    boats: [],
    uniqueId: "PROP-002-2024",
    temporaryPassword: "Manta2024!",
  },
  {
    id: 3,
    fullName: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    phoneNumber: "+57 302 456 7890",
    idNumber: "11223344",
    status: "Inactivo",
    registrationDate: "2023-11-20",
    boats: ["Velero Alianza Premium"],
    uniqueId: "PROP-003-2023",
    temporaryPassword: "Manta2023!",
  },
];

export default function PropietariosPage() {
  const navigate = useNavigate();
  const [owners, setOwners] = useState(initialOwners);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState(null);
  const [newOwner, setNewOwner] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    idNumber: "",
    status: "Activo",
    temporaryPassword: "",
  });

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  const generateUniqueId = () => {
    const year = new Date().getFullYear();
    const nextNumber = owners.length + 1;
    return `PROP-${nextNumber.toString().padStart(3, "0")}-${year}`;
  };

  const generateTemporaryPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const filteredOwners = owners.filter((owner) => {
    const matchesSearch =
      owner.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.idNumber.includes(searchTerm) ||
      owner.uniqueId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || owner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddOwner = () => {
    if (!newOwner.fullName || !newOwner.email || !newOwner.idNumber) {
      alert("Por favor complete los campos obligatorios: Nombre, Email y Documento");
      return;
    }

    const owner = {
      id: Math.max(...owners.map(o => o.id)) + 1,
      ...newOwner,
      boats: [],
      registrationDate: new Date().toISOString().split("T")[0],
      uniqueId: generateUniqueId(),
      temporaryPassword: newOwner.temporaryPassword || generateTemporaryPassword(),
    };
    setOwners([...owners, owner]);
    setNewOwner({
      fullName: "",
      email: "",
      phoneNumber: "",
      idNumber: "",
      status: "Activo",
      temporaryPassword: "",
    });
    setIsAddModalOpen(false);
  };

  const handleEditOwner = (owner) => {
    setEditingOwner({...owner});
  };

  const handleUpdateOwner = () => {
    if (!editingOwner.fullName || !editingOwner.email || !editingOwner.idNumber) {
      alert("Por favor complete los campos obligatorios: Nombre, Email y Documento");
      return;
    }

    setOwners(owners.map((owner) => (owner.id === editingOwner.id ? editingOwner : owner)));
    setEditingOwner(null);
  };

  const handleDeleteOwner = (id) => {
    const ownerToDelete = owners.find(owner => owner.id === id);
    if (ownerToDelete.boats.length > 0) {
      alert("No se puede eliminar un propietario que tiene embarcaciones asignadas");
      return;
    }

    if (window.confirm("¿Está seguro de que desea eliminar este propietario?")) {
      setOwners(owners.filter((owner) => owner.id !== id));
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    // Podrías agregar un toast de confirmación aquí
  };

  const handleGeneratePassword = () => {
    const newPassword = generateTemporaryPassword();
    setNewOwner({ ...newOwner, temporaryPassword: newPassword });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const getStatusColor = (status) => {
    return status === "Activo" 
      ? "bg-green-100 text-green-800 border-green-200" 
      : "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Gestión de Propietarios</h1>
          <p className="text-gray-600">Administra los propietarios de embarcaciones</p>
        </div>

        {/* Stats Cards - Estilo consistente con tu Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-blue-100">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">{owners.length}</div>
            <div className="text-sm text-gray-600">Total Propietarios</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-green-100">
                <User className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {owners.filter((o) => o.status === "Activo").length}
            </div>
            <div className="text-sm text-gray-600">Activos</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-purple-100">
                <User className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {owners.filter((o) => o.boats.length > 0).length}
            </div>
            <div className="text-sm text-gray-600">Con Embarcaciones</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-amber-100">
                <Calendar className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {owners.filter((o) => new Date(o.registrationDate).getMonth() === new Date().getMonth()).length}
            </div>
            <div className="text-sm text-gray-600">Nuevos Este Mes</div>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nombre, email, documento o ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-40"
              >
                <option value="all">Todos los estados</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Select>
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
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2.5 rounded-lg font-medium text-white transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Nuevo Propietario</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Propietarios */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Propietarios</CardTitle>
            <CardDescription>
              {filteredOwners.length} de {owners.length} propietarios encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Único</TableHead>
                    <TableHead>Nombre Completo</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Embarcaciones</TableHead>
                    <TableHead>Fecha Registro</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOwners.map((owner) => (
                    <TableRow key={owner.id}>
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center gap-2">
                          {owner.uniqueId}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(owner.uniqueId, "ID único")}
                            className="h-6 w-6 p-0 hover:bg-gray-200"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{owner.fullName}</TableCell>
                      <TableCell>{owner.idNumber}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-gray-600" />
                            <span className="text-gray-700">{owner.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-gray-600" />
                            <span className="text-gray-700">{owner.phoneNumber}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {owner.boats.length > 0 ? (
                            owner.boats.map((boat, index) => (
                              <Badge key={index} className="text-xs border-gray-300 text-gray-700">
                                {boat}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-gray-400 text-sm">Sin embarcaciones</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(owner.registrationDate)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(owner.status)}>
                          {owner.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditOwner(owner)}
                            className="hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-200 transition-all duration-200"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteOwner(owner.id)}
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
            {filteredOwners.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No se encontraron propietarios</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== "all" 
                    ? "Intenta ajustar los filtros de búsqueda" 
                    : "No hay propietarios registrados en el sistema"
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal Agregar Propietario */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Registrar Nuevo Propietario"
          size="lg"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 block">
                  Nombre Completo *
                </Label>
                <Input
                  id="fullName"
                  value={newOwner.fullName}
                  onChange={(e) => setNewOwner({ ...newOwner, fullName: e.target.value })}
                  placeholder="Juan Pérez García"
                  className="w-full h-10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="idNumber" className="text-sm font-medium text-gray-700 block">
                  Número de Documento *
                </Label>
                <Input
                  id="idNumber"
                  value={newOwner.idNumber}
                  onChange={(e) => setNewOwner({ ...newOwner, idNumber: e.target.value })}
                  placeholder="12345678"
                  className="w-full h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newOwner.email}
                  onChange={(e) => setNewOwner({ ...newOwner, email: e.target.value })}
                  placeholder="correo@ejemplo.com"
                  className="w-full h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 block">
                  Teléfono
                </Label>
                <Input
                  id="phoneNumber"
                  value={newOwner.phoneNumber}
                  onChange={(e) => setNewOwner({ ...newOwner, phoneNumber: e.target.value })}
                  placeholder="+57 300 123 4567"
                  className="w-full h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700 block">
                  Estado
                </Label>
                <Select
                  value={newOwner.status}
                  onChange={(e) => setNewOwner({ ...newOwner, status: e.target.value })}
                  className="w-full h-10"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temporaryPassword" className="text-sm font-medium text-gray-700 block">
                  Contraseña Provisional
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="temporaryPassword"
                    value={newOwner.temporaryPassword}
                    onChange={(e) => setNewOwner({ ...newOwner, temporaryPassword: e.target.value })}
                    placeholder="Se generará automáticamente"
                    className="w-full h-10"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleGeneratePassword}
                    className="whitespace-nowrap"
                  >
                    <Key className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Esta contraseña será enviada al propietario para su primer acceso
                </p>
              </div>
            </div>

            {/* Información del Sistema */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3 text-sm">Información del Sistema</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">ID Único:</span>
                  <span className="ml-2 font-mono text-gray-800">{generateUniqueId()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Fecha de Registro:</span>
                  <span className="ml-2 text-gray-800">{new Date().toLocaleDateString("es-ES")}</span>
                </div>
              </div>
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
              onClick={handleAddOwner}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-5 py-2.5 rounded-lg font-medium text-white transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Registrar Propietario</span>
            </Button>
          </div>
        </Modal>

        {/* Modal Editar Propietario */}
        <Modal
          isOpen={!!editingOwner}
          onClose={() => setEditingOwner(null)}
          title="Editar Propietario"
          size="lg"
        >
          {editingOwner && (
            <>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-fullName" className="text-sm font-medium text-gray-700 block">
                      Nombre Completo *
                    </Label>
                    <Input
                      id="edit-fullName"
                      value={editingOwner.fullName}
                      onChange={(e) => setEditingOwner({ ...editingOwner, fullName: e.target.value })}
                      className="w-full h-10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-idNumber" className="text-sm font-medium text-gray-700 block">
                      Número de Documento *
                    </Label>
                    <Input
                      id="edit-idNumber"
                      value={editingOwner.idNumber}
                      onChange={(e) => setEditingOwner({ ...editingOwner, idNumber: e.target.value })}
                      className="w-full h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-email" className="text-sm font-medium text-gray-700 block">
                      Email *
                    </Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editingOwner.email}
                      onChange={(e) => setEditingOwner({ ...editingOwner, email: e.target.value })}
                      className="w-full h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-phoneNumber" className="text-sm font-medium text-gray-700 block">
                      Teléfono
                    </Label>
                    <Input
                      id="edit-phoneNumber"
                      value={editingOwner.phoneNumber}
                      onChange={(e) => setEditingOwner({ ...editingOwner, phoneNumber: e.target.value })}
                      className="w-full h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-status" className="text-sm font-medium text-gray-700 block">
                      Estado
                    </Label>
                    <Select
                      value={editingOwner.status}
                      onChange={(e) => setEditingOwner({ ...editingOwner, status: e.target.value })}
                      className="w-full h-10"
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-temporaryPassword" className="text-sm font-medium text-gray-700 block">
                      Contraseña Provisional
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="edit-temporaryPassword"
                        value={editingOwner.temporaryPassword}
                        onChange={(e) => setEditingOwner({ ...editingOwner, temporaryPassword: e.target.value })}
                        className="w-full h-10"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setEditingOwner({ ...editingOwner, temporaryPassword: generateTemporaryPassword() })}
                        className="whitespace-nowrap"
                      >
                        <Key className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Información del Sistema */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-3 text-sm">Información del Sistema</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">ID Único:</span>
                      <span className="ml-2 font-mono text-gray-800">{editingOwner.uniqueId}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Fecha de Registro:</span>
                      <span className="ml-2 text-gray-800">{formatDate(editingOwner.registrationDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-5 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingOwner(null)}
                  className="px-5 py-2.5 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200 flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancelar</span>
                </Button>
                <Button 
                  onClick={handleUpdateOwner}
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