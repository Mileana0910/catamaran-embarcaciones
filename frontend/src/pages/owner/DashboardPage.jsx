// src/pages/owner/DashboardPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "../../componentes/ui/Card";
import Button from "../../componentes/ui/Button";
import Badge from "../../componentes/ui/Badge";
import { 
  Package, 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Calendar,
  FileText,
  User
} from "lucide-react";

// Datos de ejemplo para el propietario
const ownerData = {
  id: 1,
  name: "Juan Pérez",
  email: "propietario@example.com",
  boats: [
    {
      id: 1,
      name: "Catamarán Manta Explorer",
      type: "Turismo",
      model: "Explorer 2024",
      status: "Disponible",
      location: "Cartagena",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-03-15",
      documents: 3
    },
    {
      id: 2,
      name: "Velero Alianza Premium",
      type: "Alojamiento", 
      model: "Premium 2024",
      status: "Ocupado",
      location: "San Andrés",
      lastMaintenance: "2024-01-20",
      nextMaintenance: "2024-03-20",
      documents: 5
    }
  ],
  maintenances: [
    {
      id: 1,
      boatName: "Catamarán Manta Explorer",
      type: "Preventivo",
      status: "Pendiente",
      priority: "Alta",
      scheduledDate: "2024-02-15",
      description: "Mantenimiento general de motor"
    },
    {
      id: 2,
      boatName: "Velero Alianza Premium", 
      type: "Correctivo",
      status: "En Proceso",
      priority: "Media",
      scheduledDate: "2024-02-10",
      description: "Reparación sistema eléctrico"
    },
    {
      id: 3,
      boatName: "Catamarán Manta Explorer",
      type: "Preventivo",
      status: "Completado",
      priority: "Baja",
      scheduledDate: "2024-01-15",
      description: "Cambio de aceite y filtros"
    }
  ],
  upcomingEvents: [
    {
      id: 1,
      type: "maintenance",
      boatName: "Catamarán Manta Explorer",
      title: "Mantenimiento Programado",
      date: "2024-03-15",
      description: "Mantenimiento preventivo general"
    },
    {
      id: 2,
      type: "inspection",
      boatName: "Velero Alianza Premium",
      title: "Inspección Anual",
      date: "2024-04-01",
      description: "Inspección de seguridad requerida"
    }
  ]
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(ownerData);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "owner") {
      navigate("/login");
      return;
    }
  }, [navigate]);

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
      "Pendiente": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "En Proceso": "bg-blue-100 text-blue-800 border-blue-200", 
      "Completado": "bg-green-100 text-green-800 border-green-200",
      "Cancelado": "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getPriorityIcon = (priority) => {
    return priority === "Alta" ? <AlertTriangle className="h-3 w-3" /> : null;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <OwnerLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Mi Dashboard</h1>
          <p className="text-gray-600">Bienvenido de vuelta, {data.name}</p>
        </div>

        {/* Métricas Principales - Actualizadas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-blue-100">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">{data.boats.length}</div>
            <div className="text-sm text-gray-600">Mis Embarcaciones</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-amber-100">
                <Wrench className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {data.maintenances.filter(m => m.status === 'Pendiente').length}
            </div>
            <div className="text-sm text-gray-600">Mant. Pendientes</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {data.maintenances.filter(m => m.status === 'Completado').length}
            </div>
            <div className="text-sm text-gray-600">Mant. Completados</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-purple-100">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {data.boats.reduce((total, boat) => total + boat.documents, 0)}
            </div>
            <div className="text-sm text-gray-600">Documentos</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mis Embarcaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Mis Embarcaciones</CardTitle>
              <CardDescription>
                Estado actual de tus embarcaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.boats.map((boat) => (
                  <div key={boat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{boat.name}</h4>
                      <p className="text-sm text-gray-600">{boat.type} • {boat.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(boat.status)}>
                          {boat.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Próximo mant: {formatDate(boat.nextMaintenance)}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/propietario/embarcaciones')}
                    >
                      Ver Detalles
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button 
                  onClick={() => navigate('/propietario/embarcaciones')}
                  className="w-full"
                >
                  Ver Todas las Embarcaciones
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Próximos Eventos */}
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
              <CardDescription>
                Mantenimientos e inspecciones programadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.upcomingEvents.map((event) => {
                  const daysUntil = getDaysUntil(event.date);
                  return (
                    <div key={event.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {event.boatName}
                        </h4>
                        <Badge className={
                          daysUntil <= 7 ? "bg-red-100 text-red-800 border-red-200" :
                          daysUntil <= 30 ? "bg-amber-100 text-amber-800 border-amber-200" :
                          "bg-blue-100 text-blue-800 border-blue-200"
                        }>
                          {daysUntil === 0 ? "Hoy" : 
                           daysUntil === 1 ? "Mañana" : 
                           `En ${daysUntil} días`}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-gray-800 mb-1">{event.title}</p>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(event.date)}
                        </span>
                        <span className="capitalize">{event.type}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <Button 
                  onClick={() => navigate('/propietario/mantenimientos')}
                  className="w-full"
                >
                  Ver Calendario Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mantenimientos Recientes */}
        <Card>
          <CardHeader>
            <CardTitle>Mantenimientos Recientes</CardTitle>
            <CardDescription>
              Historial de mantenimientos de tus embarcaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.maintenances.map((maintenance) => (
                <div key={maintenance.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {maintenance.boatName}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Badge className={`flex items-center gap-1 ${getMaintenanceStatusColor(maintenance.status)}`}>
                        {getPriorityIcon(maintenance.priority)}
                        {maintenance.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatDate(maintenance.scheduledDate)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{maintenance.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Tipo: {maintenance.type}</span>
                    <span>Prioridad: {maintenance.priority}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button 
                onClick={() => navigate('/propietario/mantenimientos')}
                className="w-full"
              >
                Ver Todos los Mantenimientos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Acciones Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Accesos directos a funciones frecuentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                onClick={() => navigate('/propietario/mantenimientos')}
                className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition-colors text-sm border border-blue-200 hover:border-blue-300 h-auto flex flex-col items-center gap-2"
              >
                <Wrench className="h-5 w-5" />
                <span>Solicitar Mantenimiento</span>
              </Button>

              <Button 
                onClick={() => navigate('/propietario/embarcaciones')}
                className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-medium transition-colors text-sm border border-green-200 hover:border-green-300 h-auto flex flex-col items-center gap-2"
              >
                <Package className="h-5 w-5" />
                <span>Ver Embarcaciones</span>
              </Button>

              <Button 
                onClick={() => navigate('/propietario/perfil')}
                className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 font-medium transition-colors text-sm border border-purple-200 hover:border-purple-300 h-auto flex flex-col items-center gap-2"
              >
                <User className="h-5 w-5" />
                <span>Mi Perfil</span>
              </Button>

              <Button 
                onClick={() => navigate('/propietario/mantenimientos')}
                className="p-3 bg-amber-50 hover:bg-amber-100 rounded-lg text-amber-700 font-medium transition-colors text-sm border border-amber-200 hover:border-amber-300 h-auto flex flex-col items-center gap-2"
              >
                <AlertTriangle className="h-5 w-5" />
                <span>Reportar Problema</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </OwnerLayout>
  );
}