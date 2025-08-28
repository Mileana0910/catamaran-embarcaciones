import Button from "./ui/Button";
import SectionTitle from "./ui/SectionTitle";
import Card from "./ui/Card";
import lineaEco from '../assets/images/lineaEco.jpg';

export default function EcoSection() {
  return (
    <section className="py-16 px-4 bg-green-50 flex flex-col md:flex-row items-center justify-center gap-12">
      <div className="max-w-lg">
        <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold mb-2 inline-block">
          🌱 Innovación Sostenible
        </span>
        <SectionTitle>
          Nueva Línea <span className="text-green-600">ECO</span>
        </SectionTitle>
        <p className="mb-6 text-gray-700">
          Presentamos nuestras embarcaciones con energía renovable: paneles solares integrados, motores híbridos y sistemas de autogeneración para una navegación 100% sostenible.
        </p>
        <ul className="mb-6 space-y-2">
          <li className="flex items-center gap-2"><span>🔋</span> Paneles Solares - Energía limpia</li>
          <li className="flex items-center gap-2"><span>🌱</span> Cero Emisiones - Eco-friendly</li>
          <li className="flex items-center gap-2"><span>⚡</span> Autogeneradores - Autonomía extendida</li>
          <li className="flex items-center gap-2"><span>♻️</span> Materiales - Reciclables</li>
        </ul>
        <Button variant="primary">Conocer Línea ECO</Button>
      </div>
      <div className="max-w-md w-full">
        <Card>
          <img
            src={lineaEco}
            alt="Embarcación ECO"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </Card>
      </div>
    </section>
  );
}