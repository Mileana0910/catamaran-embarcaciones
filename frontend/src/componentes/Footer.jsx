import { MapPin, Phone, Mail } from "lucide-react";
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

      <div className="relative container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Información de la empresa */}
          <div className="flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex flex-col items-start space-y-4">
                {/* Logo MANTA - Tamaño original */}
                <div className="flex items-center bg-white/5 p-3 rounded-lg w-full">
                  <div className="flex justify-center flex-shrink-0" style={{ width: '60px' }}>
                    <img
                      src={logoManta}
                      alt="Logo MANTA"
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <h3 className="text-sm font-medium">Manta Fluvial</h3>
                    <p className="text-xs text-slate-400">Embarcaciones Fluviales</p>
                  </div>
                </div>
                
                {/* Logo Alianza - Tamaño original */}
                <div className="flex items-center bg-white/5 p-3 rounded-lg w-full">
                  <div className="flex justify-center flex-shrink-0" style={{ width: '60px' }}>
                    <img
                      src={logoAlianza}
                      alt="Logo Alianza"
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <p className="text-xs text-slate-400">Desarrollado por</p>
                    <p className="text-sm font-medium">Alianza Carrocera de Boyacá S.A.S.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contacto - Movido a la derecha */}
          <div className="flex flex-col justify-center md:ml-4 lg:ml-8">
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-slate-300">
                <div className="p-2 bg-slate-800 rounded-lg mt-1 flex-shrink-0">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-white">313 872 1284</p>
                  <p className="text-xs text-slate-400">Línea directa</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-slate-300">
                <div className="p-2 bg-slate-800 rounded-lg mt-1 flex-shrink-0">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-white">alianzacarroceradeboyaca@hotmail.com</p>
                  <p className="text-xs text-slate-400">Respuesta en 24h</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-slate-300">
                <div className="p-2 bg-slate-800 rounded-lg mt-1 flex-shrink-0">
                  <MapPin className="h-4 w-4 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-white">Calle 16 # 14-41 Of 805</p>
                  <p className="text-xs text-slate-400">Duitama-Boyacá, Centro Empresarial Palma Real</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Colaboradores - Versión más compacta */}
          <div className="flex flex-col justify-center">
            <h3 className="font-semibold text-lg mb-3">Colaboradores</h3>
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <div className="flex flex-col items-center space-y-1">
                <img
                  src={logoSena}
                  alt="Logo SENA"
                  className="h-8 w-auto"
                />
                <div className="text-center">
                  <p className="text-xs font-medium">Servicio Nacional de Aprendizaje</p>
                  <p className="text-xs text-slate-400 mt-1">Sistema TECNOPARQUE</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección inferior */}
        <div className="border-t border-slate-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm">
                &copy; MANTA - Alianza Carrocera de Boyacá S.A.S.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
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