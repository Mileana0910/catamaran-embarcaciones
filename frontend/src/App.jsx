// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PublicHeader from "./componentes/PublicHeader";
import Footer from "./componentes/Footer";
import ContactoPage from "./pages/ContactoPage";
import HomePage from "./pages/HomePage";
import HistoriaPage from "./pages/HistoriaPage";
import LineaEcoPage from "./pages/LineaEcoPage";
import LoginPage from "./pages/LoginPage";

// Importar páginas del admin
import AdminDashboardPage from "./pages/admin/DashboardPage";
import InventarioPage from "./pages/admin/InventarioPage";
import MantenimientoPage from "./pages/admin/MantenimientoPage";
import PropietariosPage from "./pages/admin/PropietariosPage";

// Importar páginas del propietario
import OwnerDashboardPage from "./pages/owner/DashboardPage";
import OwnerEmbarcacionesPage from "./pages/owner/EmbarcacionesPage";
import OwnerMantenimientosPage from "./pages/owner/MantenimientosPage";
import OwnerPerfilPage from "./pages/owner/PerfilPage";

// Componente para proteger rutas de admin
const ProtectedAdminRoute = ({ children }) => {
  const userType = localStorage.getItem("userType");
  return userType === "admin" ? children : <Navigate to="/login" />;
};

const ProtectedOwnerRoute = ({ children }) => {
  const userType = localStorage.getItem("userType");
  return userType === "owner" ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rutas públicas */}
        <Route path="/" element={
          <>
            <PublicHeader />
            <HomePage />
            <Footer />
          </>
        } />
        <Route path="/contacto" element={
          <>
            <PublicHeader />
            <ContactoPage />
            <Footer />
          </>
        } />
        <Route path="/historia" element={
          <>
            <PublicHeader />
            <HistoriaPage />
            <Footer />
          </>
        } />
        <Route path="/linea-eco" element={
          <>
            <PublicHeader />
            <LineaEcoPage />
            <Footer />
          </>
        } />
        
        {/* Rutas de administración */}
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <Navigate to="/admin/dashboard" replace />
          </ProtectedAdminRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedAdminRoute>
            <AdminDashboardPage />
          </ProtectedAdminRoute>
        } />
        <Route path="/admin/inventario" element={
          <ProtectedAdminRoute>
            <InventarioPage />
          </ProtectedAdminRoute>
        } />
        <Route path="/admin/propietarios" element={
          <ProtectedAdminRoute>
            <PropietariosPage />
          </ProtectedAdminRoute>
        } />
        <Route path="/admin/mantenimiento" element={
          <ProtectedAdminRoute>
            <MantenimientoPage />
          </ProtectedAdminRoute>
        } />
        
        {/* Rutas de propietarios - CORREGIDAS */}
        <Route path="/propietario" element={
          <ProtectedOwnerRoute>
            <Navigate to="/propietario/dashboard" replace />
          </ProtectedOwnerRoute>
        } />
        <Route path="/propietario/dashboard" element={
          <ProtectedOwnerRoute>
            <OwnerDashboardPage />
          </ProtectedOwnerRoute>
        } />
        <Route path="/propietario/embarcaciones" element={
          <ProtectedOwnerRoute>
            <OwnerEmbarcacionesPage />
          </ProtectedOwnerRoute>
        } />
        <Route path="/propietario/mantenimientos" element={
          <ProtectedOwnerRoute>
            <OwnerMantenimientosPage />
          </ProtectedOwnerRoute>
        } />
        <Route path="/propietario/perfil" element={
          <ProtectedOwnerRoute>
            <OwnerPerfilPage />
          </ProtectedOwnerRoute>
        } />
        
        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={
          <>
            <PublicHeader />
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600">Página no encontrada</p>
              </div>
            </div>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;