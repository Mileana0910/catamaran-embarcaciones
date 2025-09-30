// src/layouts/OwnerLayout.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Package, 
  Wrench, 
  User, 
  LogOut, 
  Menu, 
  Home,
  X,
  ChevronRight
} from "lucide-react";
import LogoManta from "../assets/images/logo-manta.jpg"; 
import LogoAlianza from "../assets/images/logo-alianza.jpg";

const STORAGE_KEYS = {
  USER_TYPE: "userType",
  USER_EMAIL: "userEmail",
  USER_ID: "userId"
};

const PATHS = {
  LOGIN: "/login",
  OWNER_DASHBOARD: "/propietario/dashboard"
};

const navigation = [
  { name: "Dashboard", href: "/propietario/dashboard", icon: Home },
  { name: "Mis Embarcaciones", href: "/propietario/embarcaciones", icon: Package },
  { name: "Mantenimientos", href: "/propietario/mantenimientos", icon: Wrench },
  { name: "Mi Perfil", href: "/propietario/perfil", icon: User },
];

const NavItem = ({ item, isActive, onNavigate, onCloseMobileMenu }) => {
  const IconComponent = item.icon;
  
  const handleClick = () => {
    onNavigate(item.href);
    onCloseMobileMenu?.();
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-x-3 rounded-xl p-3 text-sm font-medium transition-all duration-200 group relative overflow-hidden ${
          isActive
            ? "bg-blue-50 text-blue-700 border-l-4 border-l-blue-600 shadow-md shadow-blue-100"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-l-transparent hover:border-l-slate-200"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent"></div>
        )}
        <IconComponent className={`h-5 w-5 relative z-10 ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`} />
        <span className="flex-1 text-left relative z-10">{item.name}</span>
        <ChevronRight className={`h-4 w-4 transition-transform relative z-10 ${isActive ? "text-blue-500" : "text-slate-300 group-hover:text-slate-400"} ${isActive ? "rotate-90" : ""}`} />
      </button>
    </li>
  );
};

const UserAvatar = ({ email, className = "" }) => (
  <div className={`rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md ${className}`}>
    <span className="text-white font-semibold">
      {email?.charAt(0).toUpperCase() || "P"}
    </span>
  </div>
);

const UserSection = ({ email, onLogout, isMobile = false }) => (
  <div className={`${isMobile ? 'mt-4' : 'mt-auto pt-6'}`}>
    <div className={`${isMobile ? 'mb-4' : 'mb-6'} relative`}>
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
    </div>
    
    <div className="flex items-center gap-x-3 p-3 rounded-xl bg-white shadow-sm border border-slate-100 mb-3">
      <UserAvatar 
        email={email} 
        className={isMobile ? "h-9 w-9" : "h-10 w-10"} 
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 font-medium">Propietario</p>
        <p className="text-sm font-semibold text-slate-800 truncate" title={email}>
          {email}
        </p>
      </div>
    </div>
    
    <button
      onClick={onLogout}
      className="w-full flex items-center gap-x-2 p-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group border border-transparent hover:border-red-100 hover:shadow-sm"
    >
      <div className="p-1.5 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors shadow-sm">
        <LogOut className="h-4 w-4 text-red-500" />
      </div>
      <span className="flex-1 text-left">Cerrar Sesión</span>
      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-red-300 transition-colors" />
    </button>
  </div>
);

const LogoSectionFusion = ({ onNavigate }) => (
  <div className="flex flex-col gap-6">
    <div 
      className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg p-6 cursor-pointer group hover:shadow-xl transition-all duration-300 border border-slate-100"
      onClick={() => onNavigate(PATHS.OWNER_DASHBOARD)}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
      </div>
      
      <div className="relative flex items-center justify-between">
        <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-2">
          <img 
            src={LogoManta} 
            alt="Manta" 
            className="h-16 object-contain max-w-[130px]"
          />
        </div>
        
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
          </div>
        </div>
        
        <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-2">
          <img 
            src={LogoAlianza} 
            alt="Alianza" 
            className="h-16 object-contain max-w-[130px]"
          />
        </div>
      </div>
    </div>

    <div className="text-center">
      <p className="text-sm font-semibold text-slate-700 tracking-wide bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
        PORTAL DEL PROPIETARIO
      </p>
    </div>
  </div>
);

const MobileLogos = () => (
  <div className="bg-white rounded-xl shadow-md p-4 mx-4 my-3 border border-slate-100">
    <div className="flex items-center justify-center gap-4">
      <img 
        src={LogoManta} 
        alt="Manta" 
        className="h-14 object-contain max-w-[100px]"
      />
      <div className="h-8 w-px bg-gradient-to-b from-slate-200 to-slate-300"></div>
      <img 
        src={LogoAlianza} 
        alt="Alianza" 
        className="h-14 object-contain max-w-[100px]"
      />
    </div>
    <div className="text-center mt-2">
      <span className="text-xs text-slate-500 font-medium">PORTAL PROPIETARIO</span>
    </div>
  </div>
);

export default function OwnerLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.USER_TYPE);
    localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
    navigate(PATHS.LOGIN);
  }, [navigate]);

  const handleNavigate = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const isActive = useCallback((href) => location.pathname === href, [location.pathname]);

  useEffect(() => {
    const email = localStorage.getItem(STORAGE_KEYS.USER_EMAIL);
    if (email) {
      setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-25 via-white to-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
        <div className="flex grow flex-col gap-y-8 overflow-y-auto bg-white border-r border-slate-200 px-6 py-8 shadow-lg">
          <LogoSectionFusion onNavigate={handleNavigate} />
          
          <nav className="flex flex-1 flex-col">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={isActive(item.href)}
                  onNavigate={handleNavigate}
                />
              ))}
            </ul>

            <UserSection 
              email={userEmail} 
              onLogout={handleLogout} 
            />
          </nav>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex items-center gap-x-4 bg-white/95 backdrop-blur-sm px-4 py-3 shadow-md border-b border-slate-200 lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </button>
        
        <div className="flex-1 text-center">
          <span className="font-semibold text-slate-800">PROPIETARIO</span>
          <p className="text-xs text-slate-500">Portal Personal</p>
        </div>
        
        <UserAvatar email={userEmail} className="h-8 w-8 shadow-md" />
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/25 backdrop-blur-sm"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
                <div className="text-center flex-1">
                  <h2 className="font-bold text-lg text-slate-800">PROPIETARIO</h2>
                  <p className="text-xs text-slate-600 font-medium">
                    Portal Personal
                  </p>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5 text-slate-600" />
                </button>
              </div>

              <MobileLogos />

              <nav className="flex-1 p-4 overflow-y-auto bg-slate-25">
                <ul className="space-y-2">
                  {navigation.map((item) => (
                    <NavItem
                      key={item.name}
                      item={item}
                      isActive={isActive(item.href)}
                      onNavigate={handleNavigate}
                      onCloseMobileMenu={closeMobileMenu}
                    />
                  ))}
                </ul>
              </nav>

              <div className="p-4 border-t border-slate-200 bg-white">
                <UserSection 
                  email={userEmail} 
                  onLogout={handleLogout}
                  isMobile={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:pl-80">
        <div className="p-6 min-h-screen">
          <div className="bg-white rounded-2xl shadow-md border border-slate-200">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}