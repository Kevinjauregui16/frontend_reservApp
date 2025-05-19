import { useEffect, useState } from "react";
import {
  useGetReservationsByUserQuery,
  useReservationDeleteMutation,
} from "../../services/reservations";
import { useGetUserIdQuery } from "../../services/users";
import { IoLocationOutline } from "react-icons/io5";
import { CgTime } from "react-icons/cg";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";

const categoryColors = {
  Barberia: "bg-blue-200 border-blue-300",
  Salud: "bg-green-200 border-green-300",
  Psicologia: "bg-yellow-100 border-yellow-300",
  Belleza: "bg-pink-200 border-pink-300",
  Default: "bg-gray-200 border-gray-300",
};

export default function ListReservations({ user }) {
  const [category, setCategory] = useState("Todos");
  const { data: user_id } = useGetUserIdQuery(user?.id);
  const userId = user_id?.id;
  const { data, isLoading, refetch } = useGetReservationsByUserQuery(userId);
  const reservations = data?.reservations;

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [deleteReservation] = useReservationDeleteMutation();

  // Obtener categorías únicas de las reservaciones
  const categories = [
    "Todos",
    ...(reservations
      ? [
          ...new Set(
            reservations.map((r) => r.service?.category).filter(Boolean)
          ),
        ]
      : []),
  ];

  // Filtrar reservaciones por categoría
  const filteredReservations =
    category === "Todos"
      ? reservations
      : reservations?.filter((r) => r.service?.category === category);

  const handleDeleteReservation = async (reservationId) => {
    try {
      await deleteReservation(reservationId).unwrap();
      refetch(); // Refresca la lista después de eliminar
      toast.success("Reservación cancelada con éxito");
    } catch (error) {
      toast.error("Error al cancelar la reservación");
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
          Mis Reservaciones
        </h2>
        <div className="md:w-1/4 flex gap-2 justify-end">
          <div className="bg-gradient-to-r from-secondary to-primary rounded-lg">
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
      {filteredReservations && filteredReservations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredReservations.map((reservation) => (
            <div
              key={reservation.id}
              className={`flex flex-col h-98 rounded-lg shadow-lg border ${
                categoryColors[reservation.service?.category] ||
                categoryColors.Default
              } bg-opacity-70`}
            >
              <div className="w-full h-1/3 flex items-center justify-center mt-4">
                <img
                  src={`/${reservation.service?.category?.toLowerCase()}.png`}
                  alt={reservation.service?.name}
                  className="w-[90%] h-full object-cover rounded-2xl"
                />
              </div>
              <div className="w-[90%] h-2/3 mt-4 mx-auto flex flex-col">
                <div className="flex justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {reservation.service?.name || "Servicio"}
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-500 mt-2 flex items-center gap-1">
                    <IoLocationOutline />
                    {reservation.service?.location}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-gray-500 flex items-center gap-1 text-xs">
                      <CgTime />
                      {reservation.start_time} - {reservation.end_time}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 text-purple-700 text-sm font-semibold mt-4">
                  <p className="bg-purple-400 border border-purple-700 bg-opacity-20 rounded-xl px-2 py-2">
                    Llega con ainticipación a tu reservación
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    className="bg-gradient-to-r from-secondary to-primary hover:scale-105 transition-all duration-300 rounded-xl py-2 px-4 text-white w-full"
                    onClick={() => {
                      handleDeleteReservation(reservation.id);
                    }}
                  >
                    Cancelar reservación
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay reservaciones.</p>
      )}
    </div>
  );
}
