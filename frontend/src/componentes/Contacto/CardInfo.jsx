import { Phone, Mail, MapPin, Clock } from "lucide-react";

const CardInfo = () => {
  const infoCards = [
    {
      icon: <Phone className="w-6 h-6 text-blue-500" />,
      title: "Teléfono",
      content: "+57 313 872 1284\n\n",
      subContent: "Línea directa de ventas",
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-500" />,
      title: "Email",
      content: "alianzacarroceradeboyaca@hotmail.com",
      subContent: "Respuesta en 24 horas",
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-500" />,
      title: "Ubicación",
      content: "Duitama-Boyacá, Colombia",
      subContent: "Calle 16 # 14-41 Of 805, Centro Empresarial Palma Real",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Horarios",
      content: "Lun - Vie: 8:00 AM - 12:00 PM\n& 2:00 PM - 5:00 PM",
      subContent: "Sabados y Domingos: Cerrado",
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
