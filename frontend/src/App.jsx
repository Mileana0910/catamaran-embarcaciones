import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicHeader from "./componentes/PublicHeader";
import Footer from "./componentes/Footer";
import ContactoPage from "./pages/ContactoPage";
import HomePage from "./pages/HomePage";
import HistoriaPage from "./pages/HistoriaPage";
import EmbarcacionesPage from "./pages/EmbarcacionesPage";
import BoatDetailPage from "./componentes/embarcaciones/BoatDetailPage";

function App() {
  return (
    <Router>
      <PublicHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/historia" element={<HistoriaPage />} />
        <Route path="/embarcaciones" element={<EmbarcacionesPage />} />
        <Route path="/embarcaciones/:id" element={<BoatDetailPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
