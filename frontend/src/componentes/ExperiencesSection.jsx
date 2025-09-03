import Card from "./ui/Card";
import SectionTitle from "./ui/SectionTitle";
import Experiencia from "../assets/images/Experiencia.jpg";
const experiences = [
  {
    name: "Carlos Rodríguez",
    type: "Manta Family",
    time: "3h",
    location: "Lago Calima",
    image: Experiencia,
    likes: 156,
    comments: 32,
    description: "Familia reunida en nuestra Manta Family 🧑‍🤝‍🧑⛵",
  },
  {
    name: "Diego López",
    type: "Manta Explorer 2024",
    time: "6h",
    location: "Cartagena",
    image: Experiencia,
    likes: 298,
    comments: 67,
    description: "Relajación total con vista al paraíso 🌴🌞",
  },
  {
    name: "Ana Martínez",
    type: "Manta Fishing Pro",
    time: "8h",
    location: "Santa Marta",
    image: Experiencia,
    likes: 174,
    comments: 28,
    description: "Aventuras familiares que nunca olvidaremos 🚤⛵",
  },
];

export default function ExperiencesSection() {
  return (
    <section className="py-12 px-4 bg-[#f6f8fa]">
      <SectionTitle>Experiencias reales</SectionTitle>
      <p className="text-center text-gray-600 mb-8">Lo que dicen nuestros propietarios</p>
      <div className="flex flex-wrap justify-center gap-8">
        {experiences.map((exp, idx) => (
          <Card key={idx} className="w-80">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {exp.name[0]}
              </div>
              <div>
                <div className="font-semibold">{exp.name}</div>
                <div className="text-xs text-gray-500">{exp.type}</div>
              </div>
              <div className="ml-auto text-xs text-gray-400">{exp.time}</div>
            </div>
            <img src={exp.image} alt={exp.location} className="rounded-lg mb-2 w-full h-40 object-cover" />
            <div className="text-xs text-blue-600 mb-2">📍 {exp.location}</div>
            <div className="text-sm mb-2">{exp.description}</div>
            <div className="flex gap-4 text-gray-500 text-xs">
              <span>❤️ {exp.likes}</span>
              <span>💬 {exp.comments}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}