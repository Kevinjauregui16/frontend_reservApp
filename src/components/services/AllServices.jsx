import { useEffect, useState } from "react";
import {
  useGetServicesQuery,
  useGetServicesSchedulesQuery,
  useGetServicesByFilterQuery,
} from "../../services/services";
import { useGetUserIdQuery } from "../../services/users";
import {
  useCreateReservationMutation,
  useGetReservationsByServiceQuery,
} from "../../services/reservations";
import { IoLocationOutline } from "react-icons/io5";
import { CgTime } from "react-icons/cg";
import { TbQuestionMark } from "react-icons/tb";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SignInButton, useUser } from "@clerk/clerk-react";
import Loader from "../ui/Loader";
import { IoSearchOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function AllServices() {
  const locationRouter = useLocation();
  const params = new URLSearchParams(locationRouter.search);
  const filterName = params.get("name") || "";
  const filterLocation = params.get("location") || "";

  const [showAll, setShowAll] = useState(false);

  const { data: allServices, isLoading: isLoadingAll } = useGetServicesQuery(
    undefined,
    { skip: !showAll }
  );
  const { data: filteredServicesApi, isLoading: isLoadingFiltered } =
    useGetServicesByFilterQuery(
      { name: filterName, location: filterLocation },
      { skip: showAll || (!filterName && !filterLocation) }
    );
  const { data: defaultServices, isLoading: isLoadingDefault } =
    useGetServicesQuery(undefined, {
      skip: showAll || !!(filterName || filterLocation),
    });

  // Decide cuál usar
  let services = [];
  let isLoading = false;

  if (showAll) {
    services = allServices;
    isLoading = isLoadingAll;
  } else if (filterName || filterLocation) {
    services = filteredServicesApi;
    isLoading = isLoadingFiltered;
  } else {
    services = defaultServices;
    isLoading = isLoadingDefault;
  }

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  const { data: reservations, refetch } = useGetReservationsByServiceQuery(
    selectedService?.id,
    {
      skip: !selectedService,
    }
  );

  useEffect(() => {
    if (selectedService) {
      refetch();
    }
  }, [selectedService, refetch]);

  const { isSignedIn, user } = useUser();
  const [createReservation] = useCreateReservationMutation();

  const clerkId = user?.id;

  const { data } = useGetUserIdQuery(clerkId, {
    skip: !clerkId,
  });

  const userId = data?.id;

  // Obtener categorías únicas
  const categories = [
    "Todos",
    ...(services ? [...new Set(services.map((s) => s.category))] : []),
  ];

  // Filtrar servicios por búsqueda y categoría
  const filteredServices = services
    ? services.filter((service) => {
        const matchesCategory =
          category === "Todos" || service.category === category;
        const matchesSearch =
          service.name.toLowerCase().includes(search.toLowerCase()) ||
          service.description.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      })
    : [];

  // Obtener horarios del servicio seleccionado
  const { data: schedules } = useGetServicesSchedulesQuery(
    selectedService?.id,
    {
      skip: !selectedService,
    }
  );

  const categoryColors = {
    Barberia: "bg-blue-200 border-blue-300",
    Salud: "bg-green-200 border-green-300",
    Psicologia: "bg-yellow-100 border-yellow-300",
    Belleza: "bg-pink-200 border-pink-300",
    Default: "bg-gray-200 border-gray-300",
  };

  const diasSemana = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];

  const generarHorarios = (start, end, intervaloMin = 60) => {
    const horarios = [];
    let [h, m, s] = start.split(":").map(Number);
    let [eh, em, es] = end.split(":").map(Number);

    while (h < eh || (h === eh && m < em)) {
      const hora = `${h.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")}`;
      // Formato AM/PM
      const ampm = h < 12 ? "AM" : h === 12 ? (m === 0 ? "PM" : "PM") : "PM";
      let displayHour = h % 12 === 0 ? 12 : h % 12;
      horarios.push(
        `${displayHour.toString().padStart(2, "0")}:${m
          .toString()
          .padStart(2, "0")} ${ampm}`
      );
      m += intervaloMin;
      if (m >= 60) {
        h += Math.floor(m / 60);
        m = m % 60;
      }
    }
    return horarios;
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);

    if (!schedules) {
      setAvailableTimes([]);
      return;
    }

    const dia = diasSemana[selectedDate.getDay()];
    const horarioDia = schedules.find(
      (s) => s.day_of_week.toLowerCase() === dia
    );

    if (horarioDia) {
      let times = generarHorarios(
        horarioDia.start_time,
        horarioDia.end_time,
        60
      );

      // Mapear horarios con estado ocupado o no
      const timesWithStatus = times.map((time) => {
        const start = getFechaHora(selectedDate, time);
        const end = sumarMinutos(start, selectedService.duration);

        const ocupado = reservations
          ? reservations.some((r) => {
              const reservedDate = r.start_time.split(" ")[0];
              const selectedDateStr = start.split(" ")[0];
              if (reservedDate !== selectedDateStr) return false;
              return r.start_time < end && r.end_time > start;
            })
          : false;

        return { time, ocupado };
      });

      setAvailableTimes(timesWithStatus);
    } else {
      setAvailableTimes([]);
    }
  };

  const getFechaHora = (date, time) => {
    const [hourMin, ampm] = time.split(" ");
    let [hour, min] = hourMin.split(":").map(Number);
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    const hourStr = hour.toString().padStart(2, "0");
    const minStr = min.toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hourStr}:${minStr}:00`;
  };

  const fechaHora = (time) => getFechaHora(date, time);

  const sumarMinutos = (fechaHora, minutos) => {
    const fecha = new Date(fechaHora.replace(" ", "T"));
    fecha.setMinutes(fecha.getMinutes() + minutos);
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const day = fecha.getDate().toString().padStart(2, "0");
    const hourStr = fecha.getHours().toString().padStart(2, "0");
    const minStr = fecha.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hourStr}:${minStr}:00`;
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setOpenModal(true);
    setDate(new Date());
    setSelectedTime(null);
    setAvailableTimes([]);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedService(null);
    setAvailableTimes([]);
    setSelectedTime(null);
  };

  const handleReservation = async () => {
    if (!selectedTime || !selectedService) return;
    const startTime = selectedTime;
    const duration = selectedService.duration;
    const endTime = sumarMinutos(startTime, duration);

    try {
      await createReservation({
        service_id: selectedService.id,
        user_id: userId,
        start_time: startTime,
        end_time: endTime,
      }).unwrap();
      refetch();
      toast.success("Reserva creada con éxito");
      closeModal();
    } catch (error) {
      const backendMsg = error?.data?.message;
      if (backendMsg) {
        toast.error(backendMsg);
      } else {
        toast.error("Error al crear la reserva");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto py-10 px-4 min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-2 justify-between mb-12">
        <h2 className="text-3xl font-bold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
          Nuestros servicios
        </h2>
        <div className="md:w-1/2 flex gap-2 justify-end">
          <div className="flex items-center border rounded-xl px-2 max-md:w-2/3">
            <IoSearchOutline className="text-gray-500 md:mr-3 text-xl" />
            <input
              type="search"
              name=""
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="¿Qué servicio buscas?"
              className="flex-1 outline-none border-none placeholder:text-gray-500"
            />
          </div>
          <div className="bg-gradient-to-r from-secondary to-primary rounded-lg max-md:w-1/3">
            <select
              className="bg-transparent text-white border-none rounded-lg w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option className="text-gray-500" key={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh]">
          <p className="text-lg text-gray-500 mb-4">
            No se encontraron servicios que cumplan con los filtros.
          </p>
          <button
            className="bg-gradient-to-r from-secondary to-primary text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300"
            onClick={() => setShowAll(true)}
          >
            Ver todos los servicios
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`flex flex-col h-98 rounded-lg shadow-lg border ${
                categoryColors[service.category] || categoryColors.Default
              } bg-opacity-70`}
            >
              <div className="w-full h-1/3 flex items-center justify-center mt-4">
                <img
                  src={`/${service.category.toLowerCase()}.png`}
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
                <div className="mt-4">
                  {isSignedIn ? (
                    <button
                      className="bg-gradient-to-r from-secondary to-primary hover:scale-105 transition-all duration-300 rounded-xl py-2 px-4 text-white w-full"
                      onClick={() => handleServiceClick(service)}
                    >
                      Reservar ahora
                    </button>
                  ) : (
                    <SignInButton mode="modal">
                      <button className="bg-gradient-to-r from-secondary to-primary hover:scale-105 transition-all duration-300 rounded-xl py-2 px-4 text-white w-full">
                        Reservar ahora
                      </button>
                    </SignInButton>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de reserva */}
      {openModal && selectedService && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-xl">
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
              <div className="p-4 space-y-4 flex flex-col h-full">
                <div className="w-full flex flex-col md:flex-row justify-evenly max-md:items-center bg-gray-100 shadow-lg rounded-xl py-4">
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
                <div>
                  <div className="flex flex-col justify-center">
                    <div className="md:m-auto">
                      <Calendar onChange={handleDateChange} value={date} />
                    </div>
                    <div className="flex flex-col justify-center items-center p-2 rounded-xl">
                      <h4 className="text-sm font-semibold text-gray-800">
                        Horarios disponibles:
                      </h4>
                      <ul className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                        {availableTimes.length > 0 ? (
                          availableTimes.map(({ time, ocupado }, index) => (
                            <li
                              key={index}
                              className={`text-gray-700 text-sm py-1 px-2 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${
                                ocupado
                                  ? "bg-red-300 text-white cursor-not-allowed"
                                  : selectedTime === fechaHora(time)
                                  ? "bg-secondary text-white scale-105"
                                  : "bg-gray-100 hover:bg-secondary hover:text-white"
                              }`}
                              onClick={() => {
                                if (!ocupado) setSelectedTime(fechaHora(time));
                              }}
                            >
                              {time}
                            </li>
                          ))
                        ) : (
                          <li className="col-span-4 flex justify-center items-center text-gray-500">
                            {date
                              ? "Sin disponibilidad para esta fecha"
                              : "Selecciona una fecha para ver horarios"}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center pb-4">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-secondary to-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleReservation}
                  disabled={!selectedTime}
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
