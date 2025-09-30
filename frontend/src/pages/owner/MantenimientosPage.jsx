// src/pages/owner/MantenimientosPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OwnerLayout from "../../layouts/OwnerLayout";

export default function MantenimientosPage() {
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
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Mis Mantenimientos</h1>
        <p>Página en construcción - Próximamente podrás gestionar tus mantenimientos aquí.</p>
      </div>
    </OwnerLayout>
  );
}