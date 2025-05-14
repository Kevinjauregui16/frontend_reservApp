import { useGetServicesQuery } from "../services/services";
import { useReserveServiceMutation } from "../services/reservations";

const ServicesList = () => {
  const { data, isLoading, error } = useGetServicesQuery();
  const [reserveService] = useReserveServiceMutation();

  const handleReserve = (serviceId) => {
    reserveService({ service_id: serviceId, date: "2025-05-10" });
  };

  if (isLoading) return <p>Cargando servicios...</p>;
  if (error) return <p>Ocurrió un error al cargar</p>;

  return (
    <div className="mt-6 space-y-4">
      {data?.map((service) => (
        <div
          key={service.id}
          className="p-4 border rounded shadow-sm flex justify-between items-center"
        >
          <span className="font-medium">{service.name}</span>
          <button
            onClick={() => handleReserve(service.id)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Reservar
          </button>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;
