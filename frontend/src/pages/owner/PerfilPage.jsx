// src/pages/owner/PerfilPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";

export default function PerfilPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "owner") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <OwnerLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Mi Perfil</h1>
        <p>Página en construcción - Próximamente podrás editar tu perfil aquí.</p>
      </div>
    </OwnerLayout>
  );
}