export default function BannerReadyToBook() {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 py-16 text-center text-white mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        ¿Listo para reservar?
      </h2>
      <p className="text-lg md:text-xl mb-8">
        Encuentra los mejores servicios cerca de ti y reserva en segundos.
      </p>
      <button className="bg-white text-purple-600 font-medium px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300">
        Comenzar ahora
      </button>
    </div>
  );
}
