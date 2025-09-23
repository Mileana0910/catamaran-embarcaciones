import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoManta from "../assets/images/logo-manta.jpg";
import LogoAlianza from "../assets/images/logo-alianza.jpg";
import { 
  Menu, 
  X, 
  Anchor, 
  Users, 
  Package, 
  BarChart3, 
  Settings, 
  Wrench,
  FileText,
  LogOut,
  ChevronDown,
  Bell,
  Search
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications] = useState(3);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/admin/inventario", label: "Inventario", icon: Package },
    { path: "/admin/propietarios", label: "Propietarios", icon: Users },
    { path: "/admin/mantenimiento", label: "Mantenimiento", icon: Wrench },
    { path: "/admin/reportes", label: "Reportes", icon: FileText },
    { path: "/admin/configuracion", label: "Configuración", icon: Settings },
  ];

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : "Dashboard";
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar para desktop */}
      <div className="hidden md:flex md:w-72 md:flex-col">
        <div className="flex flex-col flex-grow pt-6 overflow-y-auto bg-white border-r border-slate-200 shadow-sm">
          {/* Logo y marca */}
          <div className="flex items-center justify-center px-6 mb-8">
            <div className="flex items-center space-x-3">
              <img className="h-11 w-12 rounded-lg object-cover shadow-md" src={LogoManta} alt="Logo Manta" />
              <img className="h-12 w-30 rounded-lg object-cover shadow-md" src={LogoAlianza} alt="Logo Alianza" />
            </div>
          </div>
          
          {/* Información del usuario */}
          {userEmail && (
            <div className="px-6 py-4 mb-4 bg-blue-50 mx-4 rounded-xl border border-blue-100">
              <p className="text-xs font-medium text-slate-600 mb-1">Bienvenido</p>
              <p className="text-sm font-semibold text-slate-800 truncate">{userEmail}</p>
              <div className="w-full bg-blue-200 h-1 rounded-full mt-2">
                <div className="bg-blue-500 h-1 rounded-full w-3/4"></div>
              </div>
            </div>
          )}
          
          {/* Navegación */}
          <nav className="flex-1 px-4 pb-6 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3 transition-transform group-hover:scale-110" />
                  {item.label}
                  {isActive(item.path) && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Footer del sidebar */}
          <div className="p-4 border-t border-slate-200 mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="relative">
                <button 
                  className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors relative"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-10">
                    <div className="p-3 border-b border-slate-200">
                      <p className="text-sm font-medium text-slate-800">{userEmail}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header móvil/desktop */}
        <header className={`bg-white shadow-sm transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : 'shadow-md'
        }`}>
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors md:hidden"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-slate-900">
                  {getPageTitle()}
                </h1>
                <p className="text-sm text-slate-600">
                  Panel de administración CATAMARÁN
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Barra de búsqueda */}
              <div className="flex-1 max-w-lg mx-4 hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar embarcaciones, propietarios..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        console.log('Buscar:', e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
              
              {/* Notificaciones */}
              <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              {/* Perfil de usuario */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-10">
                    <div className="p-3 border-b border-slate-200">
                      <p className="text-sm font-medium text-slate-800">{userEmail}</p>
                      <p className="text-xs text-slate-600">Administrador</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Sidebar móvil */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-lg transform transition-transform duration-300">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-slate-200">
                  <div className="flex items-center space-x-3">
                    <img className="h-10 w-10 rounded-lg" src={LogoManta} alt="Logo Manta" />
                    <img className="h-10 w-10 rounded-lg" src={LogoAlianza} alt="Logo Alianza" />
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  <nav className="space-y-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                            isActive(item.path)
                              ? "bg-blue-50 text-blue-700 border border-blue-100"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                
                <div className="p-4 border-t border-slate-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenido de la página */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}