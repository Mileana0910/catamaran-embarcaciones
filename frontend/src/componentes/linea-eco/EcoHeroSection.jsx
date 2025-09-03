import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function EcoHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 py-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Link to="/" className="flex items-center text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver al inicio
          </Link>
        </div>

        <div className="text-center mb-12">
          <span className="bg-emerald-500/20 text-emerald-100 border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-4 inline-block">
            🌱 Innovación Sostenible
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Línea{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">ECO</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Revolucionamos la navegación con embarcaciones 100% sostenibles. Energía solar, propulsión eléctrica y
            tecnología de vanguardia para un futuro más verde en el agua.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-3">
              <span className="text-2xl">🌿</span>
            </div>
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-emerald-200 text-sm">Cero Emisiones</div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-3">
              <span className="text-2xl">☀️</span>
            </div>
            <div className="text-2xl font-bold text-white">5kW</div>
            <div className="text-emerald-200 text-sm">Energía Solar</div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-3">
              <span className="text-2xl">🔋</span>
            </div>
            <div className="text-2xl font-bold text-white">20h</div>
            <div className="text-emerald-200 text-sm">Autonomía</div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-3">
              <span className="text-2xl">♻️</span>
            </div>
            <div className="text-2xl font-bold text-white">85%</div>
            <div className="text-emerald-200 text-sm">Reciclable</div>
          </div>
        </div>
      </div>
    </section>
  );
}