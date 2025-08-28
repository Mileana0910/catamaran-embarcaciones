import CardInfo from "../componentes/Contacto/CardInfo";
import ContactForm from "../componentes/Contacto/ContactForm";

const ContactoPage = () => {
  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <CardInfo />
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactoPage;
