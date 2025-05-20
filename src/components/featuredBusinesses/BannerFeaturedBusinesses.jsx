export default function BannerFeaturedBusinesses() {
  const negocios = [
    {
      id: 1,
      nombre: "Limpieza dental",
      categoria: "Odontologia",
      ranking: 5,
      location: "Clínica Dental Sonrisas",
    },
    {
      id: 2,
      nombre: "Consulta medica general",
      categoria: "Salud",
      ranking: 4.9,
      location: "Farmacias similares",
    },
    {
      id: 3,
      nombre: "Corte de cabello caballero",
      categoria: "Barberia",
      ranking: 4.9,
      location: "Barberia El Rey",
    },
    {
      id: 4,
      nombre: "Consulta de opstetricia",
      categoria: "Salud",
      ranking: 4.9,
      location: "Hospital de la Mujer",
    },
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
            <div className="bg-gradient-to-r from-secondary to-primary aspect-[4/3] flex items-center justify-center rounded-t-xl">
              <span className="text-gray-400 text-4xl">✨</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-600">
                {negocio.nombre}
              </h3>
              <p className="text-gray-500 font-medium">{negocio.location}</p>
              <div className="flex items-center mt-2">
                <svg
                  className="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <span className="text-gray-700 font-semibold">
                  {negocio.ranking}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
