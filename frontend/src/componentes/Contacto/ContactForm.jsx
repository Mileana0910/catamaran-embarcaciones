import { useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    hasBoat: "",
    location: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_txombf9",
        "template_0we96y8",
        formData,
        "mNP1YmGSIaFrecsO7"
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "¡Mensaje enviado!",
          text: "Nos pondremos en contacto contigo lo antes posible.",
          confirmButtonColor: "#000",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          hasBoat: "",
          location: "",
          company: "",
          message: "",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al enviar el mensaje: " + err.text,
          confirmButtonColor: "#000",
        });
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Formulario de Contacto
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre Completo *"
          value={formData.name}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono *"
          value={formData.phone}
          onChange={handleChange}
          className="border rounded-lg p-2 w-full"
          required
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico *"
        value={formData.email}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full"
        required
      />

      <div className="space-y-2">
        <label className="text-gray-700 text-sm">
          ¿Tiene embarcación actualmente? *
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="hasBoat"
              value="Si"
              checked={formData.hasBoat === "Si"}
              onChange={handleChange}
              required
            />
            Sí
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="hasBoat"
              value="No"
              checked={formData.hasBoat === "No"}
              onChange={handleChange}
              required
            />
            No
          </label>
        </div>
      </div>

      <select
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full"
      >
        <option value="">Sitio de Posible Operación</option>
        <option value="Caribe">Caribe</option>
        <option value="Pacífico">Pacífico</option>
        <option value="Otro">Otro</option>
      </select>

      <input
        type="text"
        name="company"
        placeholder="Empresa donde estaría afiliada (opcional)"
        value={formData.company}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full"
      />

      <textarea
        name="message"
        placeholder="Mensaje adicional..."
        value={formData.message}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full"
        rows="4"
      ></textarea>

      <button
        type="submit"
        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all w-full"
      >
        Enviar Mensaje
      </button>
    </form>
  );
};

export default ContactForm;
