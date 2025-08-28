import { Award } from "lucide-react";

export default function RegistroDiseno() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl shadow-2xl max-w-xl w-full p-10 text-center relative">
          
          {/* Insignia */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
            <Award size={40} className="text-white" />
          </div>

          {/* Título principal */}
          <h3 className="mt-10 text-3xl font-extrabold text-gray-100">
            Registro de Diseño Industrial
          </h3>

          {/* Certificado */}
          <p className="text-lg font-semibold text-gray-900 mt-4">
            Certificado Número: 16742
          </p>

          {/* Info adicional */}
          <p className="text-gray-200 mt-2">
            <strong>Superintendencia de Industria y Comercio</strong>
          </p>
          <p className="text-gray-200">
            Vigente desde: <span className="font-medium">26 de diciembre de 2022</span>
          </p>
          <p className="text-gray-200 mb-6">
            Vigente hasta: <span className="font-medium">26 de diciembre de 2032</span>
          </p>

          {/* Titulares */}
          <div className="border-t border-gray-300 pt-6">
            <h4 className="text-xl font-semibold text-gray-100 mb-4">
              Titulares del Registro:
            </h4>
            <ul className="space-y-2">
              <li className="bg-gray-300 rounded-lg py-2 px-4">
                SERVICIO NACIONAL DE APRENDIZAJE (SENA)
              </li>
              <li className="bg-gray-300 rounded-lg py-2 px-4">
                ALIANZA CARROCERA DE BOYACÁ S.A.S.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
