import HeroHistoria from "../componentes/historia/HeroHistoria";
import TimelineHistoria from "../componentes/historia/TimelineHistoria";
import LogrosHistoria from "../componentes/historia/LogrosHistoria";
import RegistroDiseno from "../componentes/historia/RegistroDiseno";

export default function HistoriaPage() {
  return (
    <>
      <main>
        <HeroHistoria />
        <TimelineHistoria />
        <RegistroDiseno />
        <LogrosHistoria />
      </main>
    </>
  );
}