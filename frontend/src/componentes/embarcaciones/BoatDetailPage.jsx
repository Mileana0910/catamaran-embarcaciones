import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { ArrowLeft, Calendar, MapPin, Phone, Mail } from "lucide-react";

const boatDetails = {
  1: {
    name: "Manta Explorer 2024",
    type: "Deportiva",
    category: "TURISMO",
    year: 2024,
    price: "Consultar precio",
    status: "Disponible",
    location: "Boyacá",
    images: [
      "/images/explorer-1.jpg",
      "/images/explorer-2.jpg",
      "/images/explorer-3.jpg",
      "/images/explorer-4.jpg",
    ],
    description:
      "La Manta Explorer 2024 es nuestra embarcación deportiva más avanzada, diseñada para ofrecer la máxima performance y comodidad en el agua. Perfecta para deportes acuáticos y paseos familiares.",
    specifications: {
      Eslora: "7.5 metros",
      Manga: "2.3 metros",
      Calado: "0.8 metros",
      Peso: "1,200 kg",
      Capacidad: "8 personas",
      Motor: "250 HP Mercury",
      Combustible: "200 litros",
      "Velocidad máxima": "45 nudos",
      Material: "Fibra de vidrio",
    },
    features: [
      "Sistema de navegación GPS integrado",
      "Equipo de sonido Bluetooth",
      "Luces LED submarinas",
      "Toldo retráctil",
      "Nevera portátil incluida",
      "Kit de seguridad completo",
      "Escalera de baño",
      "Ancla con cadena",
    ],
    equipment: [
      "Chalecos salvavidas (8 unidades)",
      "Extintor de incendios",
      "Bengalas de emergencia",
      "Botiquín de primeros auxilios",
      "Radio VHF",
      "Brújula magnética",
      "Reflector radar",
      "Linterna impermeable",
    ],
  },
  // ... agregar más embarcaciones según sea necesario
};

export default function BoatDetailPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const boat = boatDetails[id];

  if (!boat) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Embarcación no encontrada</h1>
          <Link to="/embarcaciones">
            <Button>Volver al catálogo</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="py-4 border-b">
        <div className="container mx-auto px-4">
          <Link to="/embarcaciones" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al catálogo
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={boat.images[selectedImage] || "/placeholder.svg"}
                  alt={boat.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <Badge
                  className={`absolute top-4 right-4 ${
                    boat.status === "Disponible"
                      ? "bg-green-500"
                      : boat.status === "Reservada"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  } text-white`}
                >
                  {boat.status}
                </Badge>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {boat.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-lg overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-blue-600" : ""
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${boat.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-slate-900">{boat.name}</h1>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{boat.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{boat.location}</span>
                  </div>
                  <Badge variant="outline">{boat.type}</Badge>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {boat.category}
                  </Badge>
                </div>
                <p className="text-gray-700 leading-relaxed">{boat.description}</p>
              </div>

              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-blue-600">{boat.price}</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>+57 (8) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>ventas@alianzacarrocera.com</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to="/contacto" className="flex-1">
                        <Button className="w-full">Solicitar Información</Button>
                      </Link>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Llamar Ahora
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="mt-12">
            <div className="flex border-b mb-6">
              <button className="px-6 py-3 border-b-2 border-blue-600 text-blue-600 font-semibold">
                Especificaciones
              </button>
              <button className="px-6 py-3 text-gray-600 hover:text-blue-600">
                Características
              </button>
              <button className="px-6 py-3 text-gray-600 hover:text-blue-600">
                Equipamiento
              </button>
            </div>

            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Especificaciones Técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(boat.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}