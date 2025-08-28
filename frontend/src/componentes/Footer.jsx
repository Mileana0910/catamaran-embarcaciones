import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import logoSena from '../assets/images/logo-sena.jpg';
import logoManta from '../assets/images/logo-manta.jpg';
import logoAlianza from '../assets/images/logo-alianza.jpg';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Información de la empresa */}
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={logoManta}
                  alt="Logo MANTA"
                  className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  width={80}
                  height={80}
                />
                <div>
                  <span className="text-sm text-slate-300 font-medium">MANTA</span>
                  <p className="text-xs text-slate-400 -mt-1">Embarcaciones Fluviales</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 pl-2">
                <img
                  src={logoAlianza}
                  alt="Logo Alianza"
                  className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  width={130}
                  height={35}
                />
                <div>
                  <p className="text-xs text-slate-400">Desarrollado por</p>
                  <p className="text-sm text-slate-300 font-medium">Alianza Carrocera de Boyacá S.A.S.</p>
                </div>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Plataforma digital para la gestión integral de embarcaciones MANTA. Más de 15 años de experiencia en la
              industria naval colombiana, combinando innovación tecnológica con tradición artesanal.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Navegación</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="/" className="text-slate-300 hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/embarcaciones" className="text-slate-300 hover:text-white transition-colors">
                  Embarcaciones
                </a>
              </li>
              <li>
                <a href="/historia" className="text-slate-300 hover:text-white transition-colors">
                  Historia
                </a>
              </li>
              <li>
                <a href="/linea-eco" className="text-slate-300 hover:text-white transition-colors">
                  Línea ECO
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-slate-300 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/login" className="text-slate-300 hover:text-white transition-colors">
                  Iniciar Sesión
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3 text-slate-300">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">+57 (8) 123-4567</p>
                  <p className="text-xs text-slate-400">Línea directa</p>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-slate-300">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">info@alianzacarrocera.com</p>
                  <p className="text-xs text-slate-400">Respuesta en 24h</p>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-slate-300">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <MapPin className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Boyacá, Colombia</p>
                  <p className="text-xs text-slate-400">Planta principal</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Colaboradores */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="text-center mb-6">
            <h4 className="text-slate-400 text-sm font-medium mb-4">En colaboración con:</h4>
            <div className="flex justify-center items-center">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <img
                  src={logoSena}
                  alt="Logo SENA"
                  className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  width={80}
                  height={40}
                />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">Servicio Nacional de Aprendizaje</p>
            <p className="text-xs text-slate-400 mt-2">
              Proyecto desarrollado con el apoyo del SENA - Sistema de Investigación, Desarrollo Tecnológico e
              Innovación SENNOVA
            </p>
          </div>
        </div>

        {/* Sección inferior */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm">
                &copy; 2024 MANTA - Alianza Carrocera de Boyacá S.A.S. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}