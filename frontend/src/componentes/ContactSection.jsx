import { Link } from "react-router-dom";
import Button from "./ui/Button";
import SectionTitle from "./ui/SectionTitle";

export default function ContactSection() {
  return (
    <section className="bg-[var(--color-primary)] text-white py-16 px-4 text-center">
      <SectionTitle>¿Listo para navegar?</SectionTitle>
      <p className="mb-8">
        Únete a nuestra comunidad de propietarios y descubre la experiencia Manta
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/embarcaciones">
          <Button variant="secondary">
            Explorar Catálogo
          </Button>
        </Link>
      </div>
    </section>
  );
}
