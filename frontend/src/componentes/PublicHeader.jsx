import { useState } from "react";
import LogoManta from '../assets/images/logo-manta.jpg';
import LogoAlianza from '../assets/images/logo-alianza.jpg';
export default function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white py-2 px-6 flex items-center justify-between shadow sticky top-0 z-50">
      <div className="flex items-center gap-4 pl-20">
        <img src={LogoManta} alt="Manta Logo" className="w-10 h-10" />
        <img src={LogoAlianza} alt="Alianza Logo" className="w-30 h-10" />
      </div>
      <nav className="hidden md:flex gap-8 font-medium text-gray-700">
        <a href="/" className="hover:underline">Inicio</a>
        <a href="/embarcaciones" className="hover:underline">Embarcaciones</a>
        <a href="/historia" className="hover:underline">Historia</a>
        <a href="/linea-eco" className="hover:underline">Línea ECO</a>
        <a href="/contacto" className="hover:underline">Contacto</a>
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
          <a href="/" className="hover:underline" onClick={() => setIsOpen(false)}>Inicio</a>
          <a href="/embarcaciones" className="hover:underline" onClick={() => setIsOpen(false)}>Embarcaciones</a>
          <a href="/historia" className="hover:underline" onClick={() => setIsOpen(false)}>Historia</a>
          <a href="/linea-eco" className="hover:underline" onClick={() => setIsOpen(false)}>Línea ECO</a>
          <a href="/contacto" className="hover:underline" onClick={() => setIsOpen(false)}>Contacto</a>
          <a href="/login" className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition" onClick={() => setIsOpen(false)}>
            Iniciar Sesión
          </a>
        </nav>
      )}
    </header>
  );
}