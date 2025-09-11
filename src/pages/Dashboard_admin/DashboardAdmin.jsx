import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Tiendas registradas", value: 120 },
  { label: "Activas", value: 45 },
  { label: "Inactivas", value: 10 },
  { label: "Usuarios registrados", value: 80 },
  { label: "Reservaciones", value: 6 },
];

export default function DashboardAdmin() {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard Super Administrador</h1>
      {/* Tarjetas resumen */}

      <button
        onClick={() => navigate("/dashboard-admin/create-store")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Crear Tienda
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
          >
            <span className="text-3xl font-bold text-blue-600">
              {stat.value}
            </span>
            <span className="text-gray-600 text-sm mt-2 text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
