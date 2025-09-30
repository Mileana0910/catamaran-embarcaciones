import { useState } from "react";
import { Link } from "react-router-dom";
import LogoManta from '../assets/images/logo-manta.jpg';
import LogoAlianza from '../assets/images/logo-alianza.jpg';

export default function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white py-2 px-6 flex items-center justify-between shadow sticky top-0 z-50">
      {/* Logos con ruta */}
      <div className="flex items-center gap-4 pl-20">
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img 
            src={LogoManta} 
            alt="Manta Logo" 
            className="w-10 h-10 cursor-pointer hover:opacity-80 transition"
          />
        </Link>
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img 
            src={LogoAlianza} 
            alt="Alianza Logo" 
            className="w-30 h-10 cursor-pointer hover:opacity-80 transition"
          />
        </Link>
      </div>
      <nav className="hidden md:flex gap-8 font-medium text-gray-700">
        <Link to="/" className="hover:underline">Inicio</Link>
        <Link to="/linea-eco" className="hover:underline">Línea ECO</Link>
        <Link to="/historia" className="hover:underline">Historia</Link>
        <Link to="/contacto" className="hover:underline">Contacto</Link>
      </nav>
      <a
        href="/login"
        className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition hidden md:block"
      >
        Iniciar Sesión
      </a>
      {/* Menú móvil */}
      <button
        className="md:hidden text-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menú"
      >
        ☰
      </button>
      {isOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-4 py-4 md:hidden z-50 shadow">
          <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>Inicio</Link>
          <Link to="/linea-eco" className="hover:underline" onClick={() => setIsOpen(false)}>Línea ECO</Link>
          <Link to="/historia" className="hover:underline" onClick={() => setIsOpen(false)}>Historia</Link>
          <Link to="/contacto" className="hover:underline" onClick={() => setIsOpen(false)}>Contacto</Link>
          <a
            href="/login"
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            Iniciar Sesión
          </a>
        </nav>
      )}
    </header>
  );
}