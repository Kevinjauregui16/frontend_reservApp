import { useState } from "react";
import { useGetServicesQuery } from "../../services/services";
import { IoLocationOutline } from "react-icons/io5";
import { CgTime } from "react-icons/cg";
import { TbQuestionMark } from "react-icons/tb";
import Calendar from "react-calendar"; // Importar react-calendar
import "react-calendar/dist/Calendar.css"; // Importar estilos de react-calendar

export default function BannerServices() {
  const [selected, setSelected] = useState("Todos");
  const { data: services } = useGetServicesQuery();
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState(new Date()); // Estado para la fecha seleccionada
  const [availableTimes, setAvailableTimes] = useState([]); // Estado para los horarios disponibles

  // Obtener categorías únicas de los servicios
  const categories = [
    "Todos",
    ...(services
      ? [...new Set(services.map((service) => service.category))]
      : []),
  ];

  const categoryColors = {
    Barberia: "bg-blue-200 border-blue-300",
    Salud: "bg-green-200 border-green-300",
    Psicologia: "bg-yellow-100 border-yellow-300",
    Belleza: "bg-pink-200 border-pink-300",
    Default: "bg-gray-200 border-gray-300",
  };

  // Filtrar servicios según la categoría seleccionada
  const filteredServices =
    selected === "Todos"
      ? services?.slice(0, 3)
      : services
          ?.filter((service) => service.category === selected)
          .slice(0, 3);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedService(null);
    setAvailableTimes([]); // Limpiar horarios disponibles al cerrar el modal
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);

    // Simular horarios disponibles para la fecha seleccionada
    const times = [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
    ];
    setAvailableTimes(times);
  };

  return (
    <div className="my-10 max-w-screen-xl mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl text-primary font-semibold">
          Nuestros servicios
        </h2>
        <div className="bg-gray-50 mt-8 text-sm text-gray-500 font-semibold rounded-lg max-md:grid grid-cols-3">
          {categories.slice(0, 3).map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              className={`py-2 px-6 rounded-lg ${
                selected === category ? "bg-secondary text-white" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 px-4">
        {filteredServices?.map((service) => (
          <div
            key={service.id}
            className={`flex flex-col h-98 rounded-lg shadow-lg border ${
              categoryColors[service.category] || categoryColors.Default
            } bg-opacity-70`}
          >
            <div className="w-full h-1/3 flex items-center justify-center mt-4">
              <img
                src="/Barber.jpeg"
                alt={service.name}
                className="w-[90%] h-full object-cover rounded-2xl"
              />
            </div>
            <div className="w-[90%] h-2/3 mt-4 mx-auto flex flex-col">
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold text-gray-800">
                  {service.name}
                </h3>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p className="text-sm font-medium text-gray-900">
                    {service.ranking}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-500 mt-2 flex items-center gap-1">
                  <IoLocationOutline />
                  {service.location}
                </p>
                <div className="flex justify-between">
                  <p className="text-gray-500 flex items-center gap-1">
                    <TbQuestionMark />
                    {service.description}
                  </p>
                  <p className="text-gray-500 flex items-center gap-1 text-xs">
                    <CgTime />
                    {service.duration}min
                  </p>
                </div>
              </div>
              <div className="flex gap-2 text-purple-700 text-xs font-semibold mt-4">
                <p className="bg-purple-400 border border-purple-700 bg-opacity-20 rounded-xl px-2 py-2">
                  Reserva: ${service.price}
                </p>
              </div>
              <button
                className="bg-gradient-to-r from-secondary to-primary hover:scale-105 transition-all mt-6 rounded-xl py-2 text-white"
                onClick={() => handleServiceClick(service)}
              >
                Reservar ahora
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="border border-secondary text-secondary py-2 px-4 rounded-lg hover:bg-purple-100 hover:text-black text-sm transition-all"
          onClick={() => console.log("Ver más servicios")}
        >
          Ver todos los servicios
        </button>
      </div>

      {/* Modal */}
      {openModal && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-xl">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Reservar Servicio
                </h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-red-400 text-sm w-8 h-8 inline-flex justify-center items-center"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Cerrar modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 space-y-4 flex flex-col h-full">
                {selectedService && (
                  <div className="w-full flex justify-evenly bg-gray-100 shadow-lg rounded-xl py-4">
                    <p className="font-bold text-md text-gray-900">
                      {selectedService.description}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-500 flex items-center gap-1">
                      <IoLocationOutline />
                      {selectedService.location}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-500 flex items-center gap-1">
                      <CgTime /> {selectedService.duration} minutos
                    </p>
                    <p className="bg-purple-400 border border-purple-700 bg-opacity-20 rounded-xl px-2 py-1 text-sm">
                      ${selectedService.price}
                    </p>
                  </div>
                )}
                {/* Calendario */}
                <div className="">
                  {/* <div className="w-1/2 ">
                    <Calendar onChange={setDate} value={date} />
                  </div>
                  <div className="w-1/2 bg-blue-400"> hola mundo</div> */}
                  <div className="flex flex-col justify-center">
                    <div className="m-auto">
                      <Calendar onChange={handleDateChange} value={date} />
                    </div>
                    <div className="flex flex-col justify-center items-center p-2 rounded-xl">
                      <h4 className="text-sm font-semibold text-gray-800">
                        Horarios disponibles:
                      </h4>
                      <ul className="grid grid-cols-4 gap-2 mt-2">
                        {availableTimes.length > 0 ? (
                          availableTimes.map((time, index) => (
                            <li
                              key={index}
                              className="text-gray-700 text-sm bg-gray-100 py-1 px-2 rounded-xl shadow-lg"
                            >
                              {time}
                            </li>
                          ))
                        ) : (
                          <li className="col-span-4 flex justify-center items-center text-gray-500">
                            Selecciona una fecha.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div className="flex items-center justify-center pb-4">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-secondary to-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={closeModal}
                >
                  Confirmar Reserva
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ml-3 text-sm font-medium text-red-400 rounded-lg bg-gray-100"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
