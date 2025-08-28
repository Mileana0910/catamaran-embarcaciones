import { Phone, Mail, MapPin, Clock } from "lucide-react";

const CardInfo = () => {
  const infoCards = [
    {
      icon: <Phone className="w-6 h-6 text-blue-500" />,
      title: "Teléfono",
      content: "+57 (8) 123-4567",
      subContent: "Línea directa de ventas",
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-500" />,
      title: "Email",
      content: "ventas@alianzacarrocera.com",
      subContent: "Respuesta en 24 horas",
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-500" />,
      title: "Ubicación",
      content: "Boyacá, Colombia",
      subContent: "Planta de producción principal",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Horarios",
      content: "Lun - Vie: 8:00 AM - 6:00 PM\nSábados: 8:00 AM - 2:00 PM",
      subContent: "Domingos: Cerrado",
    },
  ];

  return (
    <div className="grid gap-4">
      {infoCards.map((card, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all"
        >
          <div className="p-2 bg-blue-100 rounded-full">{card.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{card.title}</h3>
            <p className="text-gray-700">{card.content}</p>
            {card.subContent && (
              <p className="text-sm text-gray-500">{card.subContent}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardInfo;
