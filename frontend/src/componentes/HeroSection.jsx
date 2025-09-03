import { Anchor, Users, Calendar, Star } from "lucide-react";
import Button from "./ui/Button";
import SectionTitle from "./ui/SectionTitle";

function MetricCard({ icon: Icon, value, label, color }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center w-44 transition-transform hover:scale-105">
      <div className={`p-4 rounded-xl mb-3 ${color} flex items-center justify-center`}>
        <Icon size={28} />
      </div>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm text-blue-100">{label}</span>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-950 via-blue-950 to-blue-800 text-white py-16 px-4 text-center relative">
      <SectionTitle className="text-white">
        Embarcaciones <span className="text-blue-300">Manta</span>
      </SectionTitle>


      {/* Línea decorativa */}
      <div className="w-20 h-1 bg-blue-400 mx-auto my-4 rounded-full"></div>

      {/* Botones */}
      <div className="flex justify-center gap-4 mb-12">
        <a href="/embarcaciones">
          <Button 
            variant="primary" 
            className="px-6 py-3 text-lg rounded-full border border-white/50 hover:scale-105 transition-transform"
          >
            Ver Catálogo →
          </Button>
        </a>

        <a href="/contacto">
          <Button 
            variant="secondary" 
            className="px-6 py-3 text-lg rounded-full border border-white/50 hover:scale-105 transition-transform"
          >
            Contactar
          </Button>
        </a>
      </div>


      {/* Métricas */}
      <div className="flex justify-center gap-8 mt-8 flex-wrap">
        <MetricCard icon={Anchor} value="500+" label="Embarcaciones" color="bg-blue-500" />
        <MetricCard icon={Users} value="450+" label="Propietarios" color="bg-blue-400" />
        <MetricCard icon={Calendar} value="20+" label="Años" color="bg-purple-500" />
        <MetricCard icon={Star} value="4.9" label="Rating" color="bg-yellow-500" />
      </div>
    </section>
  );
}