import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Shield, Eye, EyeOff, ArrowLeft } from "lucide-react";

// Importar componentes UI
import Button from "../componentes/ui/Button";
import Card, { CardHeader, CardTitle, CardContent } from "../componentes/ui/Card";
import Input from "../componentes/ui/Input";
import Label from "../componentes/ui/Label";
import { Alert, AlertDescription } from "../componentes/ui/Alert";

// Importar logos
import logoManta from '../assets/images/logo-manta.jpg';
import logoAlianza from '../assets/images/logo-alianza.jpg';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("admin");

  const handleLogin = async (e, userType) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // Simular autenticación
    setTimeout(() => {
      if (userType === "admin" && email === "admin@alianzacarrocera.com" && password === "admin123") {
        localStorage.setItem("userType", "admin");
        localStorage.setItem("userEmail", email);
        navigate("/admin/dashboard");
      } else if (userType === "owner" && email === "propietario@example.com" && password === "owner123") {
        localStorage.setItem("userType", "owner");
        localStorage.setItem("userEmail", email);
        navigate("/propietario/dashboard");
      } else {
        setError("Credenciales incorrectas. Verifica tu email y contraseña.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo sutiles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Logo con diseño mejorado - Logos más grandes */}
<div className="text-center mb-8">
  <div className="flex justify-center items-center gap-6 mb-4">
    
    {/* Logo Manta con ruta */}
    <Link 
      to="/" 
        className="bg-white rounded-2xl shadow-lg p-4 w-24 h-24 flex items-center justify-center hover:scale-105 transition-transform"
      >
        <img 
          src={logoManta} 
          alt="Logo Manta" 
          className="w-full h-full object-contain"
        />
      </Link>

      {/* Logo Alianza con ruta */}
      <Link 
        to="/contacto" 
        className="bg-white rounded-2xl shadow-lg p-4 w-24 h-24 flex items-center justify-center hover:scale-105 transition-transform"
      >
        <img 
          src={logoAlianza} 
          alt="Logo Alianza" 
          className="w-full h-full object-contain"
        />
      </Link>
      
    </div>

    <h1 className="font-bold text-3xl text-slate-800 mb-2">
      SISTEMA DE GESTIÓN
    </h1>
  </div>

        <Card className="bg-white shadow-xl border border-slate-200">
          <CardHeader className="text-center border-b border-slate-100 pb-4">
            <CardTitle className="text-slate-800 flex items-center justify-center gap-2">
              {activeTab === "admin" ? (
                <>
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>Acceso Administrativo</span>
                </>
              ) : (
                <>
                  <User className="h-5 w-5 text-emerald-600" />
                  <span>Acceso Propietario</span>
                </>
              )}
            </CardTitle>
            <p className="text-slate-600 text-sm">
              {activeTab === "admin" 
                ? "Ingresa con tu cuenta de administrador" 
                : "Accede a la información de tu embarcación"
              }
            </p>
          </CardHeader>
          
          <CardContent className="pt-6">
            {/* Tabs mejorados */}
            <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setActiveTab("admin")}
                className={`flex items-center justify-center flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === "admin"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                }`}
              >
                <Shield className="h-4 w-4 mr-2" />
                Administrador
              </button>
              <button
                onClick={() => setActiveTab("owner")}
                className={`flex items-center justify-center flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === "owner"
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                }`}
              >
                <User className="h-4 w-4 mr-2" />
                Propietario
              </button>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-50 border-red-200">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {/* Formulario Admin */}
            {activeTab === "admin" && (
              <form onSubmit={(e) => handleLogin(e, "admin")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="text-slate-700">Email</Label>
                  <Input
                    id="admin-email"
                    name="email"
                    type="email"
                    placeholder="admin@alianzacarrocera.com"
                    required
                    className="border-slate-300 focus:ring-blue-500 focus:border-blue-500 w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-slate-700">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="border-slate-300 focus:ring-blue-500 focus:border-blue-500 pr-10 w-full"
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-slate-400 hover:text-slate-600 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold transition-colors duration-300" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Iniciando sesión...
                    </div>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>
            )}

            {/* Formulario Owner */}
            {activeTab === "owner" && (
              <form onSubmit={(e) => handleLogin(e, "owner")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="owner-email" className="text-slate-700">Email</Label>
                  <Input
                    id="owner-email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    className="border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-password" className="text-slate-700">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="owner-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="border-slate-300 focus:ring-emerald-500 focus:border-emerald-500 pr-10 w-full"
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-slate-400 hover:text-slate-600 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-semibold transition-colors duration-300" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Iniciando sesión...
                    </div>
                  ) : (
                    "Iniciar Sesión"
                    )}
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-slate-600">
                    ¿Olvidaste tu contraseña?{" "}
                    <Link to="/contacto" className="text-blue-600 hover:text-blue-800 underline transition-colors">
                      Contacta al administrador
                    </Link>
                  </p>
                </div>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-slate-200">
              <Link 
                to="/" 
                className="flex items-center justify-center text-sm text-slate-600 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Volver al sitio público
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer del login */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-xs">
            © 2024 MANTA - Alianza Carrocera de Boyacá S.A.S.
          </p>
        </div>
      </div>
    </div>
  );
}