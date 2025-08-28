import { Award } from "lucide-react";

export default function CertificacionHistoria() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <Award className="h-16 w-16 text-yellow-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Registro de Diseño Industrial</h2>
          <div className="text-blue-100 space-y-2 mb-6">
            <p className="text-xl font-semibold">Certificado Número: 16742</p>
            <p>Superintendencia de Industria y Comercio</p>
            <p>Vigente desde: 26 de diciembre de 2022</p>
            <p>Vigente hasta: 26 de diciembre de 2032</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white font-medium">Titulares del Registro:</p>
            <p className="text-blue-100">SERVICIO NACIONAL DE APRENDIZAJE SENA</p>
            <p className="text-blue-100">ALIANZA CARROCERA DE BOYACÁ S.A.S.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
