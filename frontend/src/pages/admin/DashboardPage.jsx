import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "../../componentes/ui/Card";
import Badge from "../../componentes/ui/Badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { 
  Anchor, 
  Users, 
  Package, 
  TrendingUp, 
  Calendar, 
  AlertCircle, 
  CheckCircle,
  DollarSign
} from "lucide-react";

// Datos para gráficos
const salesData = [
  { month: "Ene", ventas: 4 },
  { month: "Feb", ventas: 3 },
  { month: "Mar", ventas: 6 },
  { month: "Abr", ventas: 8 },
  { month: "May", ventas: 5 },
  { month: "Jun", ventas: 7 },
];

const statusData = [
  { name: "Disponibles", value: 12, color: "#10b981" },
  { name: "Vendidas", value: 28, color: "#3b82f6" },
  { name: "En Mantenimiento", value: 3, color: "#f59e0b" },
  { name: "Reservadas", value: 2, color: "#8b5cf6" },
];

const recentActivities = [
  {
    id: 1,
    type: "venta",
    description: "Venta de Manta Explorer 2024 a Juan Pérez",
    date: "2024-01-15",
    status: "completada",
  },
  {
    id: 2,
    type: "mantenimiento",
    description: "Mantenimiento programado - Manta Fishing Pro",
    date: "2024-01-14",
    status: "en_proceso",
  },
  {
    id: 3,
    type: "registro",
    description: "Nuevo propietario registrado: María González",
    date: "2024-01-13",
    status: "completada",
  },
];

// Componente Skeleton para carga
const CardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
      <div className="h-4 w-4 bg-slate-200 rounded animate-pulse"></div>
    </CardHeader>
    <CardContent>
      <div className="h-8 w-16 bg-slate-200 rounded animate-pulse mb-2"></div>
      <div className="h-3 w-20 bg-slate-200 rounded animate-pulse"></div>
    </CardContent>
  </Card>
);

// Componente de error
const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
    <h3 className="text-lg font-medium text-slate-900 mb-2">Error al cargar los datos</h3>
    <p className="text-slate-600 mb-4">{message}</p>
    <button 
      onClick={onRetry}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Reintentar
    </button>
  </div>
);

export default function DashboardPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [dashboardData, setDashboardData] = useState({
    totalBoats: 0,
    activeOwners: 0,
    monthlySales: 0,
    totalRevenue: 0,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const type = localStorage.getItem("userType");
    const email = localStorage.getItem("userEmail");
    
    if (type !== "admin") {
      navigate("/login");
    } else {
      setUserType(type);
      setUserEmail(email || "");
      
      // Simular carga de datos
      setTimeout(() => {
        setDashboardData({
          totalBoats: 45,
          activeOwners: 28,
          monthlySales: 7,
          totalRevenue: 2.64,
          isLoading: false,
          error: null
        });
      }, 1500);
    }
  }, [navigate]);

  if (!userType) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-600">Cargando panel administrativo...</p>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header con información del usuario */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Administrativo</h1>
          <p className="text-slate-600">
            Resumen general de la plataforma CATAMARÁN
            {userEmail && (
              <span className="text-sm text-slate-500 ml-2">• Conectado como: {userEmail}</span>
            )}
          </p>
        </div>

        {dashboardData.error ? (
          <ErrorState message={dashboardData.error.message} onRetry={() => window.location.reload()} />
        ) : dashboardData.isLoading ? (
          <>
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
            
            {/* Charts Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="h-6 w-40 bg-slate-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-60 bg-slate-200 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-100 rounded animate-pulse"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="h-6 w-40 bg-slate-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-60 bg-slate-200 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-100 rounded animate-pulse"></div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Total Embarcaciones</CardTitle>
                  <Anchor className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{dashboardData.totalBoats}</div>
                  <p className="text-xs text-slate-500">+3 desde el mes pasado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Propietarios Activos</CardTitle>
                  <Users className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{dashboardData.activeOwners}</div>
                  <p className="text-xs text-slate-500">+2 nuevos este mes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Ventas Este Mes</CardTitle>
                  <TrendingUp className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{dashboardData.monthlySales}</div>
                  <p className="text-xs text-slate-500">+40% vs mes anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">Ingresos Totales</CardTitle>
                  <DollarSign className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">${dashboardData.totalRevenue}B</div>
                  <p className="text-xs text-slate-500">+12% vs mes anterior</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-slate-900">Ventas por Mes</CardTitle>
                  <CardDescription>Número de embarcaciones vendidas en los últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="ventas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-slate-900">Estado de Embarcaciones</CardTitle>
                  <CardDescription>Distribución actual del inventario</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-slate-900">Actividad Reciente</CardTitle>
                <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${
                            activity.type === "venta"
                              ? "bg-blue-100"
                              : activity.type === "mantenimiento"
                                ? "bg-amber-100"
                                : "bg-emerald-100"
                          }`}
                        >
                          {activity.type === "venta" && <TrendingUp className="h-4 w-4 text-blue-600" />}
                          {activity.type === "mantenimiento" && <Package className="h-4 w-4 text-amber-600" />}
                          {activity.type === "registro" && <Users className="h-4 w-4 text-emerald-600" />}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{activity.description}</p>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(activity.date).toLocaleDateString("es-ES")}
                          </p>
                        </div>
                      </div>
                      <Badge variant={activity.status === "completada" ? "success" : "secondary"}>
                        {activity.status === "completada" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 mr-1" />
                        )}
                        {activity.status === "completada" ? "Completada" : "En Proceso"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="cursor-pointer hover:shadow-md transition-shadow border border-slate-200"
                onClick={() => navigate("/admin/inventario")}
              >
                <CardHeader className="text-center">
                  <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-slate-900">Gestionar Inventario</CardTitle>
                  <CardDescription>Agregar, editar o eliminar embarcaciones</CardDescription>
                </CardHeader>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-md transition-shadow border border-slate-200"
                onClick={() => navigate("/admin/propietarios")}
              >
                <CardHeader className="text-center">
                  <Users className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <CardTitle className="text-slate-900">Gestionar Propietarios</CardTitle>
                  <CardDescription>Registrar y administrar propietarios</CardDescription>
                </CardHeader>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-md transition-shadow border border-slate-200"
                onClick={() => navigate("/admin/reportes")}
              >
                <CardHeader className="text-center">
                  <TrendingUp className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <CardTitle className="text-slate-900">Generar Reportes</CardTitle>
                  <CardDescription>Exportar datos y estadísticas</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}