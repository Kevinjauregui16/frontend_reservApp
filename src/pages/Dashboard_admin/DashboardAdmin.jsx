// Puedes reemplazar estos datos por datos reales del backend
const stats = [
  { label: 'Reservaciones totales', value: 120 },
  { label: 'Activas', value: 45 },
  { label: 'Canceladas', value: 10 },
  { label: 'Usuarios registrados', value: 80 },
  { label: 'Servicios', value: 6 },
];

export default function DashboardAdmin() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard Administrador</h1>
      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">{stat.value}</span>
            <span className="text-gray-600 text-sm mt-2 text-center">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Gráfica de ejemplo (placeholder) */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Reservaciones por semana</h2>
        <div className="w-full h-48 flex items-center justify-center text-gray-400">
          {/* Aquí puedes integrar una gráfica real con Chart.js, Recharts, etc. */}
          <span>Gráfica de ejemplo</span>
        </div>
      </div>

      {/* Últimas reservaciones (placeholder) */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Últimas reservaciones</h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-2 flex justify-between">
            <span>Juan Pérez</span>
            <span className="text-gray-500">07/09/2025</span>
            <span className="text-blue-600">Activa</span>
          </li>
          <li className="py-2 flex justify-between">
            <span>María López</span>
            <span className="text-gray-500">06/09/2025</span>
            <span className="text-red-500">Cancelada</span>
          </li>
          <li className="py-2 flex justify-between">
            <span>Carlos Ruiz</span>
            <span className="text-gray-500">05/09/2025</span>
            <span className="text-blue-600">Activa</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
