// src/pages/admin/ReportesPage.jsx
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../componentes/ui/Tabs";
import { 
  Search, 
  Download, 
  Filter, 
  X, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar,
  FileText,
  Users,
  Package,
  Wrench,
  DollarSign,
  Printer
} from "lucide-react";

// Datos de ejemplo para reportes
const reportData = {
  // Reporte de Embarcaciones
  boats: {
    byType: [
      { name: "Turismo", count: 20, percentage: 40 },
      { name: "Alojamiento", count: 15, percentage: 30 },
      { name: "E-N", count: 10, percentage: 20 },
      { name: "Exclusivos", count: 5, percentage: 10 }
    ],
    byStatus: [
      { name: "Disponible", count: 25, color: "#10b981" },
      { name: "Ocupado", count: 12, color: "#3b82f6" },
      { name: "Mantenimiento", count: 8, color: "#f59e0b" },
      { name: "Reparación", count: 5, color: "#ef4444" }
    ],
    byLocation: [
      { name: "Cartagena", count: 18 },
      { name: "San Andrés", count: 12 },
      { name: "Santa Marta", count: 10 },
      { name: "Barranquilla", count: 6 },
      { name: "Otras", count: 4 }
    ]
  },

  // Reporte de Mantenimientos
  maintenances: {
    byType: [
      { name: "Preventivo", count: 35, color: "#3b82f6" },
      { name: "Correctivo", count: 18, color: "#ef4444" },
      { name: "Predictivo", count: 8, color: "#8b5cf6" },
      { name: "Emergencia", count: 4, color: "#f59e0b" }
    ],
    byStatus: [
      { name: "Completado", count: 42, color: "#10b981" },
      { name: "En Proceso", count: 12, color: "#3b82f6" },
      { name: "Pendiente", count: 8, color: "#f59e0b" },
      { name: "Cancelado", count: 3, color: "#ef4444" }
    ],
    monthlyTrend: [
      { month: "Ene", count: 8, cost: 4200000 },
      { month: "Feb", count: 12, cost: 6800000 },
      { month: "Mar", count: 15, cost: 8500000 },
      { month: "Abr", count: 10, cost: 6200000 },
      { month: "May", count: 18, cost: 9500000 },
      { month: "Jun", count: 14, cost: 7800000 }
    ]
  },

  // Reporte de Propietarios
  owners: {
    byStatus: [
      { name: "Activo", count: 28, color: "#10b981" },
      { name: "Inactivo", count: 7, color: "#6b7280" }
    ],
    registrationTrend: [
      { month: "Ene", count: 3 },
      { month: "Feb", count: 5 },
      { month: "Mar", count: 7 },
      { month: "Abr", count: 4 },
      { month: "May", count: 6 },
      { month: "Jun", count: 8 }
    ],
    boatsPerOwner: [
      { range: "1 embarcación", count: 22 },
      { range: "2 embarcaciones", count: 8 },
      { range: "3+ embarcaciones", count: 5 }
    ]
  },

  // Reporte Financiero
  financial: {
    revenueByMonth: [
      { month: "Ene", revenue: 12500000, expenses: 4200000, profit: 8300000 },
      { month: "Feb", revenue: 15800000, expenses: 6800000, profit: 9000000 },
      { month: "Mar", revenue: 14200000, expenses: 8500000, profit: 5700000 },
      { month: "Abr", revenue: 16800000, expenses: 6200000, profit: 10600000 },
      { month: "May", revenue: 19500000, expenses: 9500000, profit: 10000000 },
      { month: "Jun", revenue: 18200000, expenses: 7800000, profit: 10400000 }
    ],
    expenseBreakdown: [
      { category: "Mantenimiento", amount: 28500000, percentage: 45 },
      { category: "Nómina", amount: 18500000, percentage: 29 },
      { category: "Combustible", amount: 8500000, percentage: 13 },
      { category: "Administrativo", amount: 5500000, percentage: 9 },
      { category: "Otros", amount: 2000000, percentage: 4 }
    ]
  }
};

// Componente para gráficas simples (mientras implementas una librería de gráficas)
const SimpleBarChart = ({ data, title, color = "#3b82f6" }) => {
  const maxValue = Math.max(...data.map(item => item.count || item.amount || item.revenue || 0));
  
  return (
    <div className="space-y-3">
      {title && <h4 className="font-medium text-gray-800 text-sm">{title}</h4>}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex-1">{item.name || item.month || item.category || item.range}</span>
            <div className="flex items-center gap-2 w-32">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{ 
                    width: `${((item.count || item.amount || item.revenue || 0) / maxValue) * 100}%`,
                    backgroundColor: item.color || color
                  }}
                />
              </div>
              <span className="text-xs font-medium text-gray-700 w-8 text-right">
                {item.count || item.amount || item.revenue}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SimplePieChart = ({ data, title }) => {
  return (
    <div className="space-y-3">
      {title && <h4 className="font-medium text-gray-800 text-sm">{title}</h4>}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color || '#3b82f6' }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">{item.count}</span>
              {item.percentage && (
                <span className="text-xs text-gray-500">({item.percentage}%)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FinancialMetricCard = ({ title, value, change, changeType = "positive", icon: Icon }) => {
  const changeColor = changeType === "positive" ? "text-green-600" : "text-red-600";
  const changeBg = changeType === "positive" ? "bg-green-100" : "bg-red-100";
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
              }).format(value)}
            </p>
            {change && (
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${changeBg} ${changeColor}`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {change}
              </div>
            )}
          </div>
          {Icon && (
            <div className="p-3 rounded-lg bg-blue-100">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function ReportesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("embarcaciones");
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [reportType, setReportType] = useState("resumen");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simular generación de reporte
    setTimeout(() => {
      setIsGenerating(false);
      alert("Reporte generado exitosamente");
    }, 2000);
  };

  const handleDownloadReport = (format) => {
    alert(`Descargando reporte en formato ${format.toUpperCase()}`);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Métricas resumen para el dashboard de reportes
  const summaryMetrics = {
    totalRevenue: 87200000,
    totalExpenses: 43000000,
    activeBoats: 42,
    pendingMaintenances: 8,
    activeOwners: 28,
    revenueChange: "+12%",
    expensesChange: "+8%",
    boatsChange: "+5%"
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Reportes</h1>
          <p className="text-gray-600">Genera reportes detallados del sistema</p>
        </div>

        {/* Filtros de Reporte */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="reportType" className="text-sm font-medium text-gray-700">
                    Tipo de Reporte
                  </Label>
                  <Select
                    id="reportType"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full"
                  >
                    <option value="resumen">Resumen General</option>
                    <option value="detallado">Reporte Detallado</option>
                    <option value="personalizado">Personalizado</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                    Fecha Inicio
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                    Fecha Fin
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2.5 rounded-lg font-medium text-white transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Generando...</span>
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-4 w-4" />
                      <span>Generar Reporte</span>
                    </>
                  )}
                </Button>

                <Button 
                  variant="outline"
                  onClick={() => handleDownloadReport('pdf')}
                  className="flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>PDF</span>
                </Button>

                <Button 
                  variant="outline"
                  onClick={() => handleDownloadReport('excel')}
                  className="flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Excel</span>
                </Button>

                <Button 
                  variant="outline"
                  onClick={handlePrintReport}
                  className="flex items-center space-x-2"
                >
                  <Printer className="h-4 w-4" />
                  <span>Imprimir</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FinancialMetricCard
            title="Ingresos Totales"
            value={summaryMetrics.totalRevenue}
            change={summaryMetrics.revenueChange}
            icon={DollarSign}
          />
          <FinancialMetricCard
            title="Gastos Totales"
            value={summaryMetrics.totalExpenses}
            change={summaryMetrics.expensesChange}
            changeType="negative"
            icon={TrendingUp}
          />
          <FinancialMetricCard
            title="Embarcaciones Activas"
            value={summaryMetrics.activeBoats}
            change={summaryMetrics.boatsChange}
            icon={Package}
          />
          <FinancialMetricCard
            title="Propietarios Activos"
            value={summaryMetrics.activeOwners}
            icon={Users}
          />
        </div>

        {/* Pestañas de Reportes */}
        <Card>
          <CardHeader>
            <CardTitle>Reportes Detallados</CardTitle>
            <CardDescription>
              Selecciona la categoría para ver reportes específicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="embarcaciones" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="embarcaciones" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Embarcaciones
                </TabsTrigger>
                <TabsTrigger value="mantenimientos" className="flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Mantenimientos
                </TabsTrigger>
                <TabsTrigger value="propietarios" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Propietarios
                </TabsTrigger>
                <TabsTrigger value="financiero" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Financiero
                </TabsTrigger>
              </TabsList>

              {/* Reporte de Embarcaciones */}
              <TabsContent value="embarcaciones">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Embarcaciones por Tipo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SimplePieChart 
                        data={reportData.boats.byType} 
                        title="Distribución por Tipo"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Embarcaciones por Estado</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SimpleBarChart 
                        data={reportData.boats.byStatus} 
                        title="Distribución por Estado"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Embarcaciones por Ubicación</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SimpleBarChart 
                        data={reportData.boats.byLocation} 
                        title="Distribución por Ubicación"
                        color="#8b5cf6"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Resumen de Embarcaciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-600">Total Embarcaciones</span>
                          <span className="text-lg font-bold text-gray-900">50</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-600">Con Propietario</span>
                          <span className="text-lg font-bold text-gray-900">35</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-600">Disponibles</span>
                          <span className="text-lg font-bold text-gray-900">25</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-600">En Mantenimiento</span>
                          <span className="text-lg font-bold text-gray-900">8</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Reporte de Mantenimientos */}
              <TabsContent value="mantenimientos">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Mantenimientos por Tipo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SimplePieChart 
                        data={reportData.maintenances.byType} 
                        title="Distribución por Tipo"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Mantenimientos por Estado</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SimpleBarChart 
                        data={reportData.maintenances.byStatus} 
                        title="Distribución por Estado"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tendencia Mensual</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SimpleBarChart 
                        data={reportData.maintenances.monthlyTrend} 
                        title="Mantenimientos por Mes"
                        color="#f59e0b"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Costos de Mantenimiento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {reportData.maintenances.monthlyTrend.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{item.month}</span>
                            <span className="font-medium text-gray-900">
                              {formatCurrency(item.cost)}
                            </span>
                          </div>
                        ))}
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between items-center font-bold">
                            <span className="text-gray-800">Total</span>
                            <span className="text-gray-900">
                              {formatCurrency(reportData.maintenances.monthlyTrend.reduce((sum, item) => sum + item.cost, 0))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Reporte de Propietarios */}
              <TabsContent value="propietarios">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Propietarios por Estado</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SimplePieChart 
                        data={reportData.owners.byStatus} 
                        title="Distribución por Estado"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tendencia de Registros</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SimpleBarChart 
                        data={reportData.owners.registrationTrend} 
                        title="Nuevos Registros por Mes"
                        color="#10b981"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Embarcaciones por Propietario</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SimpleBarChart 
                        data={reportData.owners.boatsPerOwner} 
                        title="Distribución de Embarcaciones"
                        color="#8b5cf6"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Resumen de Propietarios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-600">Total Propietarios</span>
                          <span className="text-lg font-bold text-gray-900">35</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-600">Propietarios Activos</span>
                          <span className="text-lg font-bold text-gray-900">28</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-600">Con Embarcaciones</span>
                          <span className="text-lg font-bold text-gray-900">30</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-600">Nuevos Este Mes</span>
                          <span className="text-lg font-bold text-gray-900">8</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Reporte Financiero */}
              <TabsContent value="financiero">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Ingresos vs Gastos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {reportData.financial.revenueByMonth.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-600">{item.month}</span>
                              <span className="text-sm font-bold text-green-600">
                                {formatCurrency(item.profit)}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="text-blue-600">Ing: {formatCurrency(item.revenue)}</div>
                              <div className="text-red-600">Gas: {formatCurrency(item.expenses)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Desglose de Gastos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SimpleBarChart 
                        data={reportData.financial.expenseBreakdown} 
                        title="Distribución de Gastos"
                        color="#ef4444"
                      />
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Resumen Financiero Anual</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(summaryMetrics.totalRevenue)}
                          </div>
                          <div className="text-sm text-green-800 mt-1">Ingresos Totales</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {formatCurrency(summaryMetrics.totalExpenses)}
                          </div>
                          <div className="text-sm text-red-800 mt-1">Gastos Totales</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(summaryMetrics.totalRevenue - summaryMetrics.totalExpenses)}
                          </div>
                          <div className="text-sm text-blue-800 mt-1">Utilidad Neta</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {Math.round(((summaryMetrics.totalRevenue - summaryMetrics.totalExpenses) / summaryMetrics.totalRevenue) * 100)}%
                          </div>
                          <div className="text-sm text-purple-800 mt-1">Margen de Utilidad</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}