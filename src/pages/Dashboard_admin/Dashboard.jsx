import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetDashboardSuperAdminQuery } from "../../services/dashboardSuperAdmin";
import {
  HiOutlineBuildingStorefront,
  HiOutlineUserGroup,
  HiOutlineXCircle,
  HiOutlineClipboard,
  HiOutlineCurrencyDollar,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import ButtonFast from "../../components/buttons/ButtonFast";
import Footer from "../../components/footer/Footer";
import CreateCategoryModal from "./Categories/CreateCategoryModal";
import CreateStoreModal from "./Stores/CreateStoreModal";
import CreateClientModal from "./Clients/CreateClientModal";
import CreatePlanModal from "./Plans/CreatePlanModal";

export default function DashboardAdmin() {
  const { data, isLoading, refetch } = useGetDashboardSuperAdminQuery();
  const navigate = useNavigate();

  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const stores_count = data?.stores_count || 0;
  const users_count = data?.users_count || 0;
  const clients_count = data?.clients_count || 0;
  const plans_count = data?.plans_count || 0;
  const user_role = data?.user_role;
  const user_name = data?.user_name;

  useEffect(() => {
    refetch();
  }, [stores_count, users_count, clients_count, plans_count]);

  const handleCategorySuccess = () => {
    refetch();
  };

  const handleStoreSuccess = () => {
    refetch();
  };

  const handleClientSuccess = () => {
    refetch();
  };

  const handlePlanSuccess = () => {
    refetch();
  };

  const stats = [
    {
      label: "Tiendas registradas",
      value: stores_count,
      icon: <HiOutlineBuildingStorefront className="w-8 h-8 text-blue-500" />,
      color: "blue",
      bgClass: "border-blue-200 bg-blue-100",
      textClass: "text-blue-500",
    },
    {
      label: "Clientes registrados",
      value: clients_count,
      icon: <HiOutlineUserGroup className="w-8 h-8 text-yellow-500" />,
      color: "yellow",
      bgClass: "border-yellow-200 bg-yellow-100",
      textClass: "text-yellow-500",
    },
    {
      label: "Usuarios registrados",
      value: users_count,
      icon: <HiOutlineUserGroup className="w-8 h-8 text-green-500" />,
      color: "green",
      bgClass: "border-green-200 bg-green-100",
      textClass: "text-green-500",
    },
    {
      label: "Planes",
      value: plans_count,
      icon: <HiOutlineCalendarDays className="w-8 h-8 text-pink-500" />,
      color: "pink",
      bgClass: "border-pink-200 bg-pink-100",
      textClass: "text-pink-500",
    },
    {
      label: "Inactivas",
      value: 2,
      icon: <HiOutlineXCircle className="w-8 h-8 text-red-500" />,
      color: "red",
      bgClass: "border-red-200 bg-red-100",
      textClass: "text-red-500",
    },
    {
      label: "Reservaciones",
      value: 9,
      icon: <HiOutlineClipboard className="w-8 h-8 text-purple-500" />,
      color: "purple",
      bgClass: "border-purple-200 bg-purple-100",
      textClass: "text-purple-500",
    },
  ];

  const quickActions = [
    {
      icon: <HiOutlineBuildingStorefront className="w-8 h-8" />,
      text: "Crear Tienda",
      color: "blue",
      bgClass: "bg-blue-100 hover:bg-blue-200",
      textClass: "text-blue-700",
      borderClass: "border-blue-300",
      action: () => setIsStoreModalOpen(true),
    },
    {
      icon: <HiOutlineUserGroup className="w-8 h-8" />,
      text: "Registrar Cliente",
      color: "green",
      bgClass: "bg-green-100 hover:bg-green-200",
      textClass: "text-green-700",
      borderClass: "border-green-300",
      action: () => setIsClientModalOpen(true),
    },
    {
      icon: <HiOutlineClipboard className="w-8 h-8" />,
      text: "Nueva Categoría",
      color: "yellow",
      bgClass: "bg-yellow-100 hover:bg-yellow-200",
      textClass: "text-yellow-700",
      borderClass: "border-yellow-300",
      action: () => setIsCategoryModalOpen(true),
    },
    {
      icon: <HiOutlineCurrencyDollar className="w-8 h-8" />,
      text: "Nuevo Plan",
      color: "purple",
      bgClass: "bg-purple-100 hover:bg-purple-200",
      textClass: "text-purple-700",
      borderClass: "border-purple-300",
      action: () => setIsPlanModalOpen(true),
    },
  ];

  return (
    <div className="min-h-screen bg-white p-0 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 border-b border-blue-100 pb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
              ✨ReservaPro
            </span>
            {!isLoading && (
              <span className="ml-2 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wide shadow-sm">
                {user_role}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full p-2">
              <HiOutlineUserGroup className="w-10 h-10" />
            </div>
            <div className="text-right">
              <p className="text-lg text-gray-500 font-medium leading-tight">
                Hola,
              </p>
              {!isLoading && (
                <p className="text-2xl font-bold text-blue-700 leading-tight">
                  {user_name}
                </p>
              )}
              <span className="text-xs text-gray-400">
                ¡Bienvenido de nuevo!
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bgClass} rounded-2xl shadow-md p-2 flex flex-col items-center`}
            >
              <div className="mb-2">{stat.icon}</div>
              <span className="text-4xl font-bold text-gray-600">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  stat.value
                )}
              </span>
              <span
                className={`${stat.textClass} text-base mt-2 text-center font-medium`}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          <div className="bg-white rounded-2xl shadow-md p-8 w-1/2">
            <h2 className="text-xl font-bold text-gray-400 mb-6">
              Acciones rápidas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <ButtonFast
                  key={index}
                  icon={action.icon}
                  text={action.text}
                  bgClass={action.bgClass}
                  textClass={action.textClass}
                  borderClass={action.borderClass}
                  onClick={action.action}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 w-1/2">
            {/* Graficas */}
          </div>
        </div>
      </div>
      <Footer data={data} />

      {/* Modals */}
      <CreateCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSuccess={handleCategorySuccess}
      />
      <CreateStoreModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        onSuccess={handleStoreSuccess}
      />
      <CreateClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onSuccess={handleClientSuccess}
      />
      <CreatePlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        onSuccess={handlePlanSuccess}
      />
    </div>
  );
}
