import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicHeader from "./componentes/PublicHeader";
import Footer from "./componentes/Footer";
import ContactoPage from "./pages/ContactoPage";
import HomePage from "./pages/HomePage";
import HistoriaPage from "./pages/HistoriaPage";
import EmbarcacionesPage from "./pages/EmbarcacionesPage";
import BoatDetailPage from "./componentes/embarcaciones/BoatDetailPage";
import LineaEcoPage from "./pages/LineaEcoPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={
          <>
            <PublicHeader />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/historia" element={<HistoriaPage />} />
              <Route path="/embarcaciones" element={<EmbarcacionesPage />} />
              <Route path="/embarcaciones/:id" element={<BoatDetailPage />} />
              <Route path="/linea-eco" element={<LineaEcoPage />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;