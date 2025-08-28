import { Calendar, MapPin } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { Link } from "react-router-dom";

export default function BoatCard({ boat }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={boat.image || "/placeholder.svg"}
          alt={boat.name}
          className="w-full h-48 object-cover"
        />
        <Badge
          className={`absolute top-2 right-2 ${
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
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{boat.name}</h3>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{boat.year} • {boat.type}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {boat.location}
            </p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          {boat.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
              {feature}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-semibold text-blue-600">{boat.price}</span>
          <Link to={`/embarcaciones/${boat.id}`}>
            <Button size="sm">Ver Detalles</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}