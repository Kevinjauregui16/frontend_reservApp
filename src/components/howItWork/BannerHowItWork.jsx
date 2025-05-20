import { FaSearch, FaCalendarAlt, FaClock } from "react-icons/fa";

export default function BannerHowItWork() {
  const steps = [
    {
      icon: <FaSearch size={24} />,
      title: "Busca",
      description: "Encuentra el servicio que necesitas en tu zona.",
      bg: "from-purple-500 to-blue-500",
    },
    {
      icon: <FaCalendarAlt size={24} />,
      title: "Reserva",
      description: "Selecciona fecha y hora que mejor te convenga.",
      bg: "from-teal-400 to-cyan-400",
    },
    {
      icon: <FaClock size={24} />,
      title: "Disfruta",
      description: "Acude a tu cita y disfruta del servicio.",
      bg: "from-blue-500 to-teal-400",
    },
  ];

  return (
    <div className="w-full h-full bg-gray-100 py-10">
      <div className="max-w-screen-xl flex flex-col items-center mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary mb-12">Cómo funciona</h2>
        <div className="flex flex-col md:flex-row justify-center gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full md:w-1/3 max-md:px-4 mx-auto"
            >
              <div
                className={`bg-gradient-to-r ${step.bg} text-white p-5 rounded-full mb-4`}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-600">
                {step.title}
              </h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
