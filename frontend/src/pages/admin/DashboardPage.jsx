// src/pages/admin/DashboardPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, 
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer 
} from "recharts";

// Datos de ejemplo
const boatTypesData = [
  { name: "Turismo", count: 20 },
  { name: "Alojamiento", count: 15 },
  { name: "E-N", count: 10 },
  { name: "Exclusivos", count: 5 }
];

const maintenanceStatusData = [
  { name: "Pendiente", value: 12 },
  { name: "En Proceso", value: 5 },
  { name: "Completado", value: 8 }
];

const paymentData = [
  { month: "Ene", amount: 1200 },
  { month: "Feb", amount: 1900 },
  { month: "Mar", amount: 1500 },
  { month: "Abr", amount: 2200 },
];

const COLORS = ["#ef4444", "#f59e0b", "#10b981"];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBoats: 0,
    activeOwners: 0,
    pendingMaintenances: 0,
    monthlyPayments: 0
  });

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "admin") {
      navigate("/login");
      return;
    }

    // Simular carga de datos
    setStats({
      totalBoats: 45,
      activeOwners: 28,
      pendingMaintenances: 12,
      monthlyPayments: 52200
    });
  }, [navigate]);

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <p className="text-gray-600">Resumen general del sistema</p>
        </div>

        {/* Métricas Principales - Números centrados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Embarcaciones</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalBoats}</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 rounded-lg bg-green-100">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Propietarios Activos</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.activeOwners}</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Mantenimientos Pendientes</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.pendingMaintenances}</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 6v1m0-1v1" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Pagos del Mes</h3>
            <p className="text-2xl font-semibold text-gray-900">${stats.monthlyPayments.toLocaleString()}</p>
          </div>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Embarcaciones por Tipo */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Embarcaciones por Tipo</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={boatTypesData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Mantenimientos por Estado */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Mantenimientos por Estado</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={maintenanceStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {maintenanceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica de Pagos */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">Pagos por Mes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={paymentData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Acciones Rápidas - Con colores originales */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button 
              onClick={() => navigate('/admin/inventario')}
              className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition-colors text-sm border border-blue-200 hover:border-blue-300"
            >
              Gestionar Inventario
            </button>
            <button 
              onClick={() => navigate('/admin/propietarios')}
              className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-medium transition-colors text-sm border border-green-200 hover:border-green-300"
            >
              Ver Propietarios
            </button>
            <button 
              onClick={() => navigate('/admin/mantenimiento')}
              className="p-3 bg-amber-50 hover:bg-amber-100 rounded-lg text-amber-700 font-medium transition-colors text-sm border border-amber-200 hover:border-amber-300"
            >
              Programar Mantenimiento
            </button>
            <button 
              onClick={() => navigate('/admin/reportes')}
              className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 font-medium transition-colors text-sm border border-purple-200 hover:border-purple-300"
            >
              Generar Reporte
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}