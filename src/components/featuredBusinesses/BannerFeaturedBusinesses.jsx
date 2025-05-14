export default function BannerFeaturedBusinesses() {
  const negocios = [
    { id: 1, nombre: "Negocio Destacado 1" },
    { id: 2, nombre: "Negocio Destacado 2" },
    { id: 3, nombre: "Negocio Destacado 3" },
    { id: 4, nombre: "Negocio Destacado 4" },
  ];

  return (
    <div className="my-10 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold text-primary mb-10 text-center">
        Servicios destacados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 mx-auto">
        {negocios.map((negocio) => (
          <div
            key={negocio.id}
            className="bg-white rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            <div className="bg-gray-200 aspect-video flex items-center justify-center rounded-t-xl">
              <span className="text-gray-400 text-4xl">📷</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-400">
                {negocio.nombre}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
