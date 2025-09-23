// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PublicHeader from "./componentes/PublicHeader";
import Footer from "./componentes/Footer";
import ContactoPage from "./pages/ContactoPage";
import HomePage from "./pages/HomePage";
import HistoriaPage from "./pages/HistoriaPage";
import LineaEcoPage from "./pages/LineaEcoPage";
import LoginPage from "./pages/LoginPage";

// Componente para proteger rutas de admin
const ProtectedAdminRoute = ({ children }) => {
  const userType = localStorage.getItem("userType");
  return userType === "admin" ? children : <Navigate to="/login" />;
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
        {/* CAMBIA ESTA RUTA: de /modelo-eco a /linea-eco */}
        <Route path="/linea-eco" element={
          <>
            <PublicHeader />
            <LineaEcoPage />
            <Footer />
          </>
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